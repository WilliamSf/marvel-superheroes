import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: ContentLayoutComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'home'
      },
      {
        path: '',
        loadChildren: () => import('@modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'personagem',
        loadChildren: () => import('@modules/character/character.module').then(m => m.CharacterModule)
      },
      {
        path: '**',
        component: PageNotFoundComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
