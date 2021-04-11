import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { CharactersService } from '@data/characters/characters.service';
import { Characters } from '@data/schema/characters';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<Characters> {
  constructor(private charactersService: CharactersService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.charactersService
      .getAll()
      .pipe(catchError(() => this.router.navigateByUrl('/')));
  }
}
