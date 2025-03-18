import { LoginCredentialsType, SignUpCredentialsType } from "src/utils/types";
import { baseUrl } from "src/utils/constants";

export const createUser = async (newUser: SignUpCredentialsType) => {
  try {
    const response = await fetch(`${baseUrl}/users/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (user: LoginCredentialsType) => {
  try {
    const response = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
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