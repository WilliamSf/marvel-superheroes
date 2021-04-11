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
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<Characters> {

  constructor(
    private charactersService: CharactersService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.charactersService
      .getAll()
      .pipe(
        map(data => {
          const grouped = data.data.results.reduce((acc, elem, index) => {
            const rowNum = Math.floor(index/5) + 1
            acc[`pagination${rowNum}`] = acc[`pagination${rowNum}`] || []
            acc[`pagination${rowNum}`].push(elem)
            return acc
          }, {});
          return {
            grouped,
            data: data.data.results
          }
        }),
        catchError(() => this.router.navigateByUrl('/'))
      );
  }
}
