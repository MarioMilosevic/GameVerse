import { UserType } from "src/utils/types";
import { baseUrl } from "src/utils/constants";

export const createUser = async (newUser: UserType) => {
  try {
    const response = await fetch(`${baseUrl}/users/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
      return await response.json()
  } catch (error) {
    console.error(error);
  }
};
