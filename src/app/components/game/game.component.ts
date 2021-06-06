import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../models/Game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() game: Game;
  constructor() {}

  ngOnInit(): void {}

  // Set Dynamic Classes
  setClasses() {}
}
