import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/Game.model';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-game-show',
  templateUrl: './game-show.component.html',
  styleUrls: ['./game-show.component.scss'],
})
export class GameShowComponent implements OnInit, OnDestroy {
  game: Game;
  private gameSub: Subscription;
  private gameId: string | null;

  constructor(private gameService: GameService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.gameId = paramMap.get('gameId');
    });
    this.gameSub = this.gameService.getGame(this.gameId).subscribe((game) => {
      this.game = game;
    });
  }

  ngOnDestroy() {
    this.gameSub.unsubscribe();
  }
}
