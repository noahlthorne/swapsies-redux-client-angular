import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/Game.model';
import { GameService } from 'src/app/services/game/game.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-game-show',
  templateUrl: './game-show.component.html',
  styleUrls: ['./game-show.component.scss'],
  animations: [
    trigger('popOverState', [
      transition(':enter', [
        style({ height: 0, opacity: 0, marginBottom: 0 }),
        animate(
          '0.6s ease-in',
          style({ height: '*', opacity: 1, marginBottom: 45 })
        ),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, marginBottom: 45 }),
        animate(
          '0.8s ease-out',
          style({ height: 0, opacity: 0, marginBottom: 0 })
        ),
      ]),
    ]),
  ],
})
export class GameShowComponent implements OnInit, OnDestroy {
  game: Game;
  display: boolean = false;
  isLoading: boolean = false;
  userIsAuthenticated: boolean = false;

  private gameSub: Subscription;
  private gameId: string;
  private authStatusSub: Subscription;

  constructor(
    private gameService: GameService,
    private userService: UserService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('gameId')) {
        this.gameId = paramMap.get('gameId')!;
        this.gameService.getGame(this.gameId).subscribe(
          (game) => {
            this.isLoading = false;
            this.game = game;
          },
          () => {
            this.isLoading = false;
          }
        );
      }
    });
    this.userIsAuthenticated = this.userService.getAuthStatus();

    this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    this.authStatusSub.unsubscribe();
  }

  toggle() {
    this.display = !this.display;
  }

  get stateName() {
    return this.display ? 'show' : 'hide';
  }
}
