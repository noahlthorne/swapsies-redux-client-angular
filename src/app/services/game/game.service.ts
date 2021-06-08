import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from '../../models/Game.model';
import { Listing } from 'src/app/models/Listing.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  games: Game[] = [];
  gamesUrl: string = 'http://localhost:5000/api/games';
  constructor(private http: HttpClient) {}

  getGames = (): Observable<Game[]> => {
    return this.http.get<Game[]>(this.gamesUrl);
  };

  getGame = (gameId: string | null): Observable<Game> => {
    return this.http.get<Game>(`${this.gamesUrl}/${gameId}`);
  };

  getGameListings = (gameId: string | null): Observable<Listing> => {
    return this.http.get<Listing>(`${this.gamesUrl}/${gameId}`);
  };
}
