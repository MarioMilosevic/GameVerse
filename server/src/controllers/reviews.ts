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
      console.log('uslo u add review')
      // const { userId, gameId, rating, content } = req.body;

      // if (!userId || !gameId || !rating || !content) {
      //   errorFactory.badRequest(res);
      //   return;
      // }

      // const existingReview = await prisma.review.findUnique({
      //   where: {
      //     userId_gameId: { userId, gameId },
      //   },
      // });

      // if (existingReview) {
      //   errorFactory.badRequest(res, "You have already reviewed this game");
      //   return;
      // }

      // const review = await prisma.review.create({
      //   data: {
      //     userId,
      //     gameId,
      //     rating,
      //     content,
      //   },
      // });
      sucessFactory.created(res, 'uslo add review');
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
