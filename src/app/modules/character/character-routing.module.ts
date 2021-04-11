import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterComponent } from './page/character.component';
import { CharacterResolver } from './service/character-resolver.service';

const routes: Routes = [
  {
    path: ':id',
    component: CharacterComponent,
    resolve: {
      character: CharacterResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterRoutingModule { }
