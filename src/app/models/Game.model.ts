export interface Game {
  _id: string;
  title: string;
  gameConsole: string;
  genres?: string[];
  description?: string;
  coverImage: string;
  rating: number;
  releaseDate: Date;
}
