import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../../../models/Game.model';
import { GameService } from '../../../services/game/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games-container.component.html',
  styleUrls: ['./games-container.component.scss'],
})
export class GamesContainerComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  private gameSub: Subscription;
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getGames();
    this.gameSub = this.gameService
      .getGameUpdateListener()
      .subscribe((games: Game[]) => {
        this.games = games;
      });
  }

  ngOnDestroy() {
    this.gameSub.unsubscribe();
  }
}
