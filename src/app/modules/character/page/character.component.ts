import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  public characterData;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.characterData = this.activatedRoute.snapshot.data.character.data.results[0];
  }

}
