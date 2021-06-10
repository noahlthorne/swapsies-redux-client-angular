import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../../../models/Game.model';
import { GameService } from '../../../services/game/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  private gamesSub: Subscription;
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getGames();
    this.gamesSub = this.gameService
      .getGameUpdateListener()
      .subscribe((games: Game[]) => {
        this.games = games;
      });
  }

  ngOnDestroy() {
    this.gamesSub.unsubscribe();
  }
}