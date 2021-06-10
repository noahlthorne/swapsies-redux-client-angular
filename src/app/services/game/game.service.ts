import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from '../../models/Game.model';
import { Listing } from 'src/app/models/Listing.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private games: Game[] = [];
  private gamesUpdated = new Subject<Game[]>();
  private gamesUrl: string = 'http://localhost:5000/api/games';

  constructor(private http: HttpClient) {}

  getGames = () => {
    return this.http
      .get<{ games: any }>(this.gamesUrl)
      .pipe(
        map((gameData) => {
          return gameData.games.map((game: any) => {
            return {
              id: game._id,
              title: game.title,
              gameConsole: game.gameConsole,
              genres: game.genres,
              description: game.description,
              coverImage: game.coverImage,
              rating: game.rating,
              releaseDate: new Date(game.releaseDate),
            };
          });
        })
      )
      .subscribe((transformedGames) => {
        this.games = transformedGames;
        this.gamesUpdated.next([...this.games]);
      });
  };

  getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  getGame = (gameId: string) => {
    return this.http.get<Game>(`${this.gamesUrl}/${gameId}`);
  };

  getGameListings = (gameId: string | null): Observable<Listing> => {
    return this.http.get<Listing>(`${this.gamesUrl}/${gameId}`);
  };
}
