import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CharactersService } from '@data/characters/characters.service';
import { Characters } from '@data/schema/characters';
import { Observable } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public charactersData = [];
  public pages = [];
  public charactersGrouped;

  public currentPage = '';

  public filteredCharacters: Observable<any>;
  public characterControl = new FormControl();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.manageNameControl();
    this.activatedRoute.data.subscribe(data => {
      this.charactersData = data.characters.data;
      this.charactersGrouped = data.characters.grouped;
      this.pages = Object.keys(this.charactersGrouped);
    });
  }

  /**
   * accessCharacterDetails
   */
  public accessCharacterDetails(id: number) {
    this.router.navigate(['../personagem', id], {relativeTo: this.activatedRoute})
  }

  public manageNameControl(param = 'pagination1') {
    this.currentPage = param;
    this.filteredCharacters = this.characterControl.valueChanges
      .pipe(
        startWith(''),
        map(option => option ? this.charactersNameFilter(option) : this.charactersGrouped[param].slice())
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
