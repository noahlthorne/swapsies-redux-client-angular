import { Component, OnInit, OnDestroy } from '@angular/core';
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
    this.gameSub = this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });
  }

  ngOnDestroy() {
    this.gameSub.unsubscribe();
  }
}
