import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game, SortOption } from '../../models/Game.model';
import { Listing } from 'src/app/models/Listing.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const SERVER_URL = environment.apiUrl + '/games';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private games: Game[] = [];
  private gamesUpdated = new Subject<{ games: Game[]; gamesCount: number }>();
  constructor(private http: HttpClient) {}

  getGames = (
    gamesPerPage: number,
    currentPage: number,
    selectedConsole: string,
    sortBy: SortOption
  ) => {
    const queryParams = `?gameconsole=${selectedConsole}&sortby=${sortBy.value}&orderby=${sortBy.order}&pagesize=${gamesPerPage}&currentpage=${currentPage}`;
    return this.http
      .get<{ games: any; maxGames: number }>(SERVER_URL + queryParams)
      .pipe(
        map((gameData) => {
          return {
            games: gameData.games.map((game: any) => {
              return {
                id: game._id,
                releaseDate: new Date(game.releaseDate),
                ...game,
              };
            }),
            maxGames: gameData.maxGames,
          };
        })
      )
      .subscribe((transformedGames) => {
        this.games = transformedGames.games;
        this.gamesUpdated.next({
          games: [...this.games],
          gamesCount: transformedGames.maxGames,
        });
      });
  };

  getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  getGame = (gameId: string) => {
    return this.http.get<any>(`${SERVER_URL}/${gameId}`).pipe(
      map((gameData) => {
        return {
          ...gameData.game,
          releaseDate: new Date(gameData.game.releaseDate),
        };
      })
    );
  };

  getGameListings = (gameId: string | null): Observable<Listing> => {
    return this.http.get<Listing>(`${SERVER_URL}/${gameId}`);
  };
}
