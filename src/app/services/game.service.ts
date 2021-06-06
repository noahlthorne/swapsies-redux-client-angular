import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  getGames = () => {
    return [
      {
        title: 'Dark Souls',
        gameConsole: 'Switch',
        description: 'Good game',
        genres: ['scary', 'action'],
        coverImage: 'blahsdlab.jpg',
        rating: 92,
        releaseDate: new Date('2014-03-29'),
      },
    ];
  };
}
