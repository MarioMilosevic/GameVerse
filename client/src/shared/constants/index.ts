import { UserType } from "@/utils/types";

export const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const gameVerseToken = "gameVerse-token";

export const contentTypeJson = { "Content-Type": "application/json" };
export const httpMethods = {
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export const userRoles = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export const profileImg = "https://social-network-js.vercel.app/img/profile5.png";

export const passwordMessage = {
  message: "Password must be at least 8 characters",
};

export const loginInputs = [
  {
    name: "email",
    placeholder: "you@example.com",
    type: "email",
    label: "Email Address",
  },
  {
    name: "password",
    placeholder: "••••••••",
    type: "password",
    label: "Password",
  },
];

export const signUpInputs = [
  {
    name: "fullName",
    placeholder: "John Doe",
    type: "text",
    label: "Full Name",
  },
  {
    name: "email",
    placeholder: "you@example.com",
    type: "email",
    label: "Email Address",
  },
  {
    name: "password",
    placeholder: "••••••••",
    type: "password",
    label: "Password",
  },
  {
    name: "passwordConfirm",
    placeholder: "••••••••",
    type: "password",
    label: "Confirm Password",
  },
];

export const accountInputs = [
  {
    name: "fullName",
    placeholder: "John Doe",
    type: "text",
    label: "Change Your Name",
  },
  {
    name: "email",
    placeholder: "you@example.com",
    type: "email",
    label: "Email Address",
  },
];
export const userInputs = [
  {
    name: "fullName",
    placeholder: "John Doe",
    type: "text",
    label: "User name",
  },
  {
    name: "email",
    placeholder: "you@example.com",
    type: "email",
    label: "Email Address",
  },
];

export const emptyStarsArray = new Array(10).fill("empty");

export const storageThemeName = "gameVerse-theme";

export const dashboardOptions = [userRoles.ADMIN, userRoles.USER];

export const sortUserOptins = ["A-Z", "Z-A", "Newest", "Oldest"];

export const usersPerPage = 10;

export const emptyAccountSettings = {
  fullName: "",
  email: "",
};

export const emptyUser: UserType = {
  id: 0,
  role: userRoles.USER,
  email: "",
  fullName: "",
  image: "",
  createdDate: "",
  active: false,
};

export const guestMessage = "You must be logged in";
