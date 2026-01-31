import { GameReviewType, ReviewType } from "@/utils/types";
import { baseUrl } from "@/shared/constants";

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

export const deleteReview = async (reviewId: number) => {
  try {
    const response = await fetch(`${baseUrl}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const editReview = async (reviewId: number, updatedReview: GameReviewType) => {
  try {
    const response = await fetch(`${baseUrl}/reviews/${reviewId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updatedReview }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
