export interface Game {
  id: string;
  title: string;
  gameConsole: string;
  genres?: string[];
  description?: string;
  coverImage: string;
  rating: number;
  releaseDate: Date;
}

export interface SortOption {
  field: string;
  value: string;
  order: string;
}
