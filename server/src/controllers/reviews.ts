import { Request, Response, NextFunction } from "express";
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
  getReviewId(req: Request, res: Response, next: NextFunction) {
    console.log("uslo u getReviewId", req.params);
    const { reviewId } = req.params;
    console.log("proslo odje", reviewId);
    const reviewIdNumber = Number(reviewId)
    console.log('ovo je revju number', reviewIdNumber)
    req.reviewId = reviewIdNumber;
    console.log(
      "proslo odje i ovo je request payload revju ID",
      req.reviewId
    );
    next();
  },

  // async checkExistingUser(req: Request, res: Response, next: NextFunction) {
  //   try {

  //      const existingUser = await prisma.user.findUnique({
  //        where: { id: userId },
  //        select: {
  //          fullName: true,
  //          createdDate: true,
  //          image: true,
  //          id: true,
  //        },
  //      });
  //   } catch (error) {}
  // },

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

  async editReview(req: Request, res: Response) {
    try {
      console.log(
        "uslo u edit review i ovo bi trebao biti reviewId",
        req.reviewId
      );
      // const { reviewId } = req.params;
      // const {
      //   updatedReview: { content, rating },
      // } = req.body;

      // console.log("uslo u edit reviju imam id",req.requestPayload.reviewId)

      // const numberReviewId = Number(reviewId);

      // if (!req.requestPayload.reviewId) {
      //   errorFactory.badRequest(res);
      //   return;
      // }

      // const existingReview = await prisma.review.findUnique({
      //   where: { id: req.requestPayload.reviewId },
      //   select: {
      //     gameId: true,
      //   },
      // });

      // if (!existingReview) {
      //   errorFactory.notFound(res, "Review not found");
      //   return;
      // }

      // const editedReview = await prisma.review.update({
      //   where: { id: req.requestPayload.reviewId },
      //   data: { content, rating },
      // });

      // const ratingAggregation = await prisma.review.aggregate({
      //   where: { gameId: Number(existingReview.gameId) },
      //   _avg: {
      //     rating: true,
      //   },
      // });

      // const avgRating = ratingAggregation._avg.rating?.toFixed(1) || 0;

      // const data = {
      //   editedReview,
      //   avgRating,
      // };

      // sucessFactory.ok(res, data);
      sucessFactory.ok(res, req.reviewId);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
