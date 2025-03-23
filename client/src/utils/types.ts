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
  photos: string[];
  thumbnail: string;
  trailer: string;
  writers: string[];
};

export type UserType = {
  id?: number;
  role: "USER" | "ADMIN" | "GUEST";
  email: string;
  fullName: string;
  image: string;
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

export type LoginCredentialsType = {
  email: string;
  password: string;
};

export type SignUpCredentialsType = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type GameReviewType = {
  rating: number | null;
  content:string
}