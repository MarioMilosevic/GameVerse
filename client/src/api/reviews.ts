import { ReviewType } from "src/utils/types";
import { baseUrl } from "src/utils/constants";

export const createReview = async (review: ReviewType) => {
  try {
    const response = await fetch(`${baseUrl}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteReview = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}/reviews/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
