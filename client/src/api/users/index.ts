import { AccountSettingsType, LoginCredentialsType, SignUpCredentialsType, UserType } from "@/utils/types";
import { gameVerseToken, baseUrl, contentTypeJson, httpMethods } from "@/shared/constants";

import { showToast } from "@/utils/toast";

const fetchAuth = async <T>(endpoint: string, data: T) => {
  try {
    const response = await fetch(`${baseUrl}/users/${endpoint}`, {
      method: httpMethods.POST,
      headers: contentTypeJson,
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const createUser = (newUser: SignUpCredentialsType) => fetchAuth("sign-up", newUser);

export const loginUser = (user: LoginCredentialsType) => fetchAuth("login", user);

export const signOut = (user: UserType, message?: string) => {
  localStorage.removeItem(gameVerseToken);
  const firstName = user.fullName.split(" ")[0];
  setTimeout(() => {
    if (!message) {
      showToast(`${firstName} signed out`);
    } else {
      showToast(message);
    }
  }, 500);
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

export const editUserNameAndEmail = async (id: number, data: AccountSettingsType) => {
  try {
    const response = await fetch(`${baseUrl}/users/${id}`, {
      method: httpMethods.PATCH,
      headers: contentTypeJson,
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (page: number, sort: string, search: string) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      sort,
      search,
    });
    const response = await fetch(`${baseUrl}/users?${params.toString()}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const editUserProfile = async (editedUser: UserType) => {
  try {
    const response = await fetch(`${baseUrl}/users/dashboard/${editedUser.id}`, {
      method: httpMethods.PATCH,
      headers: contentTypeJson,
      body: JSON.stringify(editedUser),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/users/dashboard/${id}`, {
      method: httpMethods.DELETE,
      headers: contentTypeJson,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const disableUserAccount = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/users/disable/${id}`, {
      method: httpMethods.PATCH,
      headers: contentTypeJson,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateUserImage = async (id: number, file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(`${baseUrl}/users/image/${id}`, {
      method: httpMethods.PATCH,
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
