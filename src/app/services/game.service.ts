import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from '../models/Game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gamesUrl: string = 'http://localhost:5000/api/games';
  constructor(private http: HttpClient) {}

  getGames = (): Observable<Game[]> => {
    return this.http.get<Game[]>(this.gamesUrl);
  };
}
