import { LoginCredentialsType, SignUpCredentialsType } from "src/utils/types";
import { baseUrl } from "src/utils/constants";


const fetchAuth = async <T>(endpoint: string, data: T) => {
  try {
    const response = await fetch(`${baseUrl}/users/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type':"application/json"
      },
      body:JSON.stringify(data)
    })
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export const createUser = (newUser: SignUpCredentialsType) => fetchAuth('sign-up', newUser)

export const loginUser = (user:LoginCredentialsType) => fetchAuth('login', user)

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