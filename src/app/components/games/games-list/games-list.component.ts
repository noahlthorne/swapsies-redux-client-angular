import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Game } from '../../../models/Game.model';
import { GameService } from '../../../services/game/game.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  isLoading: boolean = false;
  totalGames: number = 20;
  gamesPerPage: number = 5;
  pageSizeOptions: Array<number> = [10, 25, 50];
  private gamesSub: Subscription;
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.gameService.getGames();
    this.gamesSub = this.gameService
      .getGameUpdateListener()
      .subscribe((games: Game[]) => {
        this.isLoading = false;
        this.games = games;
      });
  }

  ngOnDestroy() {
    this.gamesSub.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
  }
}
