import { GameReviewType, ReviewType } from "@/utils/types";
import { baseUrl, contentTypeJson, httpMethods } from "@/shared/constants";

export const createReview = async (review: ReviewType) => {
  try {
    const response = await fetch(`${baseUrl}/reviews`, {
      method: httpMethods.POST,
      headers: contentTypeJson,
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
      method: httpMethods.DELETE,
      headers: contentTypeJson,
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const editReview = async (reviewId: number, updatedReview: GameReviewType) => {
  try {
    const response = await fetch(`${baseUrl}/reviews/${reviewId}`, {
      method: httpMethods.PATCH,
      headers: contentTypeJson,
      body: JSON.stringify({ updatedReview }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
