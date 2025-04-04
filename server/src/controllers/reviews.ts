import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import sucessFactory from "../services/responses/sucessFactory";
import errorFactory from "../services/responses/errorFactory";

export default {
  async getAll(req: Request, res: Response) {
    try {
      const allReviews = await prisma.review.findMany();
      sucessFactory.ok(res, allReviews);
    } catch (error) {
      errorFactory.internalError(res);
    }
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

      const existingReview = await prisma.review.findUnique({
        where: {
          userId_gameId: { userId, gameId },
        },
      });

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

      const ratingAggregation = await prisma.review.aggregate({
        where: { gameId },
        _avg: {
          rating: true,
        },
      });

      const avgRating = ratingAggregation._avg.rating?.toFixed(1) || 0;

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
      const { reviewId } = req.params;
      const numberReviewId = Number(reviewId);
      console.log("Before deletion, reviewId:", numberReviewId);

      // First, find the review to get its gameId
      const existingReview = await prisma.review.findUnique({
        where: { id: numberReviewId },
        select: { gameId: true },
      });

      if (!existingReview?.gameId) {
        errorFactory.notFound(res, "Review not found");
        return;
      }

      await prisma.review.delete({
        where: { id: numberReviewId },
      });

      const ratingAggregation = await prisma.review.aggregate({
        where: { gameId: existingReview.gameId },
        _avg: { rating: true },
      });

      const avgRating = ratingAggregation._avg.rating?.toFixed(1) || 0;

      sucessFactory.ok(res, {
        avgRating,
      });
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async mario(req: Request, res: Response) {
    try {
      const { reviewId } = req.params;
      const numberReviewId = Number(reviewId);

      const existingReview = await prisma.review.findUnique({
        where: { id: 83 },
        //  select: {
        //    gameId: true,
        //  },
      });

      if (!existingReview) {
        errorFactory.notFound(res, "Review not found");
        return;
      }

      sucessFactory.ok(res, existingReview);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async editReview(req: Request, res: Response) {
    try {
      const { reviewId } = req.params;
      const {
        updatedReview: { content, rating },
      } = req.body;

      const numberReviewId = Number(reviewId);

      if (!reviewId) {
        errorFactory.badRequest(res);
        return;
      }

      const existingReview = await prisma.review.findUnique({
        where: { id: numberReviewId },
        select: {
          gameId: true,
        },
      });

      if (!existingReview) {
        errorFactory.notFound(res, "Review not found");
        return;
      }

      const editedReview = await prisma.review.update({
        where: { id: numberReviewId },
        data: { content, rating },
      });

      const ratingAggregation = await prisma.review.aggregate({
        where: { gameId: Number(existingReview.gameId) },
        _avg: {
          rating: true,
        },
      });

      const avgRating = ratingAggregation._avg.rating?.toFixed(1) || 0;

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
