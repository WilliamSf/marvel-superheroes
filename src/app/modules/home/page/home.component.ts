import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '@data/characters/characters.service';
import { Characters } from '@data/schema/characters';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { Observable } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public charactersData = [];

  public filteredCharacters: Observable<any>;
  public characterControl = new FormControl();

  constructor(
    private activatedRoute: ActivatedRoute,
    private paginationService: PaginationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.manageNameControl();
    this.activatedRoute.data.subscribe(data => {
      this.charactersData = data.characters.data.results;
    });
    console.log(this.paginationService.paginate(this.activatedRoute.snapshot.data.characters.data.results.length))
  }

  /**
   * accessCharacterDetails
   */
  public accessCharacterDetails(id: number) {
    this.router.navigate(['../personagem', id], {relativeTo: this.activatedRoute})
  }

  private manageNameControl() {
    this.filteredCharacters = this.characterControl.valueChanges
      .pipe(
        startWith(''),
        map(option => option ? this.charactersNameFilter(option) : this.charactersData.slice())
      );
  }

  private charactersNameFilter(value) {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.charactersData.filter((option) =>
        option.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').match(filterValue)).sort((a, b) => {
          if (a.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') <
            b.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) {
            return -1;
          } else if (a.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') >
            b.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')) {
            return 1;
          } else {
            return 0;
          }
        });
    } else {
      return [];
    }
  }

}
