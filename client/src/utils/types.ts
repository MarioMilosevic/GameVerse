export type GameType = {
  id: number;
  consoles: ConsoleType[];
  description: string;
  genres: GenreType[];
  name: string;
  gameplayHours: string;
  price: string;
  releaseYear: string;
  stars: string[];
  photos: string[];
  thumbnail: string;
  trailer: string;
  writers: string[];
  reviews: ReviewType[]
};

export type ReviewType = {
  id?: number;
  createdAt?: string;
  // ovo iznad prisma napravi
  gameId?: number;
  // 
  content: string;
  rating: number | null;
  userId:number
  user:UserType
}

export type UserType = {
  id?: number;
  role: "USER" | "ADMIN" | "GUEST";
  email: string;
  fullName: string;
  image: string;
  createdDate:string
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