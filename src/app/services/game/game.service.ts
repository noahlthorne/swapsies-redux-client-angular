import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game, SortOption } from '../../models/Game.model';
import { ListingShow } from 'src/app/models/Listing.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private games: Game[] = [];
  private gamesUpdated = new Subject<{ games: Game[]; gamesCount: number }>();
  private gamesUrl: string = 'http://localhost:5000/api/games';

  constructor(private http: HttpClient) {}

  getGames = (
    gamesPerPage: number,
    currentPage: number,
    selectedConsole: string,
    sortBy: SortOption
  ) => {
    const queryParams = `?gameconsole=${selectedConsole}&sortby=${sortBy.value}&orderby=${sortBy.order}&pagesize=${gamesPerPage}&currentpage=${currentPage}`;
    return this.http
      .get<{ games: any; maxGames: number }>(this.gamesUrl + queryParams)
      .pipe(
        map((gameData) => {
          return {
            games: gameData.games.map((game: any) => {
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
    return this.http.get<any>(`${this.gamesUrl}/${gameId}`).pipe(
      map((gameData) => {
        return {
          id: gameData._id,
          title: gameData.title,
          gameConsole: gameData.gameConsole,
          genres: gameData.genres,
          description: gameData.description,
          coverImage: gameData.coverImage,
          rating: gameData.rating,
          releaseDate: new Date(gameData.releaseDate),
        };
      })
    );
  };

  getGameListings = (gameId: string | null): Observable<ListingShow> => {
    return this.http.get<ListingShow>(`${this.gamesUrl}/${gameId}`);
  };
}
