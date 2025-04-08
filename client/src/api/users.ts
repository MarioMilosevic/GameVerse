import {
  AccountSettingsType,
  LoginCredentialsType,
  SignUpCredentialsType,
  UserType,
} from "src/utils/types";
import { baseUrl } from "src/utils/constants";
import { Router } from "vue-router";
import { showToast } from "src/utils/toast";

const fetchAuth = async <T>(endpoint: string, data: T) => {
  try {
    const response = await fetch(`${baseUrl}/users/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const createUser = (newUser: SignUpCredentialsType) =>
  fetchAuth("sign-up", newUser);

export const loginUser = (user: LoginCredentialsType) =>
  fetchAuth("login", user);

export const signOut = (router: Router, user: UserType) => {
  router.push("/login");
  localStorage.removeItem("gameVerse-token");
  const firstName = user.fullName.split(" ")[0];
  setTimeout(() => {
    showToast(`${firstName} signed out`);
  }, 500);
  if (user.role === "GUEST" && user.id) {
    try {
      // da se izbrise guest user iz baze
    } catch (error) {
      console.error(error);
    }
  }
};

export const getUserData = async (token: string) => {
  try {
    const response = await fetch(`${baseUrl}/users/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getUserReviews = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/users/reviews/${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const editUserProfile = async (
  id: number,
  data: AccountSettingsType
) => {
  try {
    const response = await fetch(`${baseUrl}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
