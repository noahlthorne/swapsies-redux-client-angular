import { Game } from './Game.model';
import { User } from './User.model';

export interface Listing {
  _id: string;
  user: User;
  game: string;
  image: any;
  condition: string;
  status?: string;
}
