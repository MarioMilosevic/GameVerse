export type GameType = {
  consoles: ConsoleType[];
  description: string;
  genres: GenreType[];
  id: number;
  name: string;
  gameplayHours: string;
  price: string;
  releaseYear: string;
  stars: string[];
  thumbnail: string;
  trailer: string;
  writers: string[];
};

export type ConsoleType = {
  console: {
    image: string;
    id: number;
  };
};

export type GenreType = {
  genre: {
    name: string;
  };
};
