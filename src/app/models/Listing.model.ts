import { Game } from './Game.model';
import { User } from './User.model';

export interface Listing {
  id: string;
  user: User;
  game: Game;
  image: any;
  condition: string;
  status?: string;
}
