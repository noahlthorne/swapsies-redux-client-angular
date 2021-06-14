import { Game } from './Game.model';
export interface ListingShow {
  id: string;
  user: any;
  game: Game;
  image: string;
  condition: string;
  status?: string;
}

export interface ListingSave {
  id: string;
  user: string;
  game: string;
  image: string;
  condition: string;
  status?: string;
}
