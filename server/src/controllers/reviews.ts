import { Request, Response, NextFunction } from "express";
import prisma from "../../prisma/prismaClient";
import sucessFactory from "../services/responses/sucessFactory";
import errorFactory from "../services/responses/errorFactory";
import { getAverageRating, getExistingReview } from "../utils/helpers";

export default {
  async getAll(req: Request, res: Response) {
    try {
      const allReviews = await prisma.review.findMany();
      sucessFactory.ok(res, allReviews);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  getReviewId(req: Request, res: Response, next: NextFunction) {
    const { reviewId } = req.params;
    const reviewIdNumber = Number(reviewId);
    req.id = reviewIdNumber;
    next();
  },

  async addReview(req: Request, res: Response) {
    try {
      const { userId, gameId, rating, content } = req.body;

      if (!userId || !gameId || !rating || !content) {
        errorFactory.badRequest(res);
        return;
      }

      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          fullName: true,
          createdDate: true,
          image: true,
          id: true,
        },
      });

      if (!existingUser?.id) {
        errorFactory.notAuthorized(res);
        return;
      }

      const existingReview = await getExistingReview(gameId, userId);

      if (existingReview) {
        errorFactory.badRequest(res, "You have already reviewed this game");
        return;
      }

      const newReview = await prisma.review.create({
        data: {
          userId,
          gameId,
          rating,
          content,
        },
      });

      const avgRating = await getAverageRating(gameId);

      const review = {
        id: newReview.id,
        content: newReview.content,
        createdAt: newReview.createdAt,
        rating: newReview.rating,
        gameId: newReview.gameId,
        user: {
          id: existingUser.id,
          fullName: existingUser.fullName,
          createdDate: existingUser.createdDate,
          image: existingUser.image,
        },
      };

      const data = {
        review,
        avgRating,
      };

      sucessFactory.created(res, data);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async deleteReview(req: Request, res: Response) {
    try {
      const existingReview = await getExistingReview(req.id);

      if (!existingReview?.gameId) {
        errorFactory.notFound(res, "Review not found");
        return;
      }

      await prisma.review.delete({
        where: { id: req.id },
      });

      const avgRating = await getAverageRating(existingReview.gameId);

      sucessFactory.ok(res, {
        avgRating,
      });
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async editReview(req: Request, res: Response) {
    try {
      const {
        updatedReview: { content, rating },
      } = req.body;

      if (!req.id) {
        errorFactory.badRequest(res);
        return;
      }

      const existingReview = await getExistingReview(req.id);

      if (!existingReview?.gameId) {
        errorFactory.notFound(res, "Review not found");
        return;
      }

      const editedReview = await prisma.review.update({
        where: { id: req.id },
        data: { content, rating },
      });

      const avgRating = await getAverageRating(existingReview.gameId);

      const data = {
        editedReview,
        avgRating,
      };

      sucessFactory.ok(res, data);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
