import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Characters } from '@data/schema/characters';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${environment.API}characters?orderBy=name&apikey=ed5accb8c7697714ac1dbf1c7584c3c0`);
  }

  getSingle(id: number): Observable<any> {
    return this.http.get(`${environment.API}characters/${id}?apikey=ed5accb8c7697714ac1dbf1c7584c3c0`);
  }
}
