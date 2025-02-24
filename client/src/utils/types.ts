export type GameType = {
  consoles: ConsoleType[];
  description: string;
  genres: GenreType[];
  id: number;
  name: string;
  price: string;
  releaseYear: string;
  start: string[];
  thumbnail: string;
  trailer: string;
  writers: string[];
};

export type ConsoleType = {
  console: {
    image: string;
  };
};

export type GenreType = {
  genre: {
    name: string;
  };
};
