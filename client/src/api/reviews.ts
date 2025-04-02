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

export const deleteReview = async (reviewId: number, gameId: number) => {
  try {
    const response = await fetch(`${baseUrl}/reviews/${reviewId}/${gameId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewId, gameId }),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
