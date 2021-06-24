import { User } from './User.model';

export interface Listing {
  id: string;
  user: User;
  game: string;
  image: any;
  condition: string;
  status?: string;
}
