import { Game } from './Game.model';
export interface Listing {
  id: string;
  user: any;
  game: Game;
  condition: string;
  status?: string;
}
