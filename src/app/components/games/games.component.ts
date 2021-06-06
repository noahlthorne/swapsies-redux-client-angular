import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/Game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  games: Game[];
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });
  }
}
