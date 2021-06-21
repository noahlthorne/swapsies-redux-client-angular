import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { Game, SortOption } from '../../../models/Game.model';
import { GameService } from '../../../services/game/game.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit, OnDestroy, AfterViewInit {
  games: Game[] = [];
  sortBy: SortOption = {
    field: 'Title',
    value: 'title',
    order: 'asc',
  };
  sortOptions: SortOption[] = [
    {
      field: 'Title',
      value: 'title',
      order: 'asc',
    },
    {
      field: 'Rating',
      value: 'rating',
      order: 'desc',
    },
    {
      field: 'Release date',
      value: 'releaseDate',
      order: 'desc',
    },
  ];
  isLoading: boolean = false;
  gameConsoles: Array<string> = [
    'PC (Microsoft Windows)',
    'PlayStation 4',
    'Xbox One',
    'Mac',
    'Nintendo Switch',
    'PlayStation 5',
    'Google Stadia',
  ];
  selectedConsole: string = 'PC (Microsoft Windows)';
  totalGames: number = 0;
  gamesPerPage: number = 10;
  currentPage: number = 1;
  pageSizeOptions: Array<number> = [10, 25, 50];

  private gamesSub: Subscription;
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.gameService.getGames(
      this.gamesPerPage,
      this.currentPage,
      this.selectedConsole,
      this.sortBy
    );
    this.gamesSub = this.gameService
      .getGameUpdateListener()
      .subscribe((gameData: { games: Game[]; gamesCount: number }) => {
        this.isLoading = false;
        this.games = gameData.games;
        this.totalGames = gameData.gamesCount;
      });
  }

  ngAfterViewInit() {
    const matTabs = document.querySelector('#tab-group');
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 120 && matTabs) {
        matTabs.classList.add('mat-tabs-opaque');
      } else if (window.scrollY <= 120 && matTabs) {
        matTabs.classList.remove('mat-tabs-opaque');
      }
    });
  }

  ngOnDestroy() {
    this.gamesSub.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    const { pageSize, pageIndex } = pageData;
    this.currentPage = pageIndex + 1;
    this.gamesPerPage = pageSize;
    this.gameService.getGames(
      this.gamesPerPage,
      this.currentPage,
      this.selectedConsole,
      this.sortBy
    );
  }

  onConsoleSelect(tabChangeEvent: MatTabChangeEvent) {
    this.isLoading = true;
    const gameConsole = tabChangeEvent.tab.textLabel;
    this.selectedConsole = gameConsole;
    this.gameService.getGames(
      this.gamesPerPage,
      this.currentPage,
      this.selectedConsole,
      this.sortBy
    );
  }

  sortByChange(sortBy: SortOption) {
    this.isLoading = true;
    this.sortBy = sortBy;
    this.gameService.getGames(
      this.gamesPerPage,
      this.currentPage,
      this.selectedConsole,
      this.sortBy
    );
  }
}
