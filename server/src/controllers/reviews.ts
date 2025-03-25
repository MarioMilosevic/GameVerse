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


      const review = {
        id: newReview.id,
        content: newReview.content,
        createdAt:newReview.createdAt,
        rating: newReview.rating,
        user: {
          id: existingUser.id,
          fullName: existingUser.fullName,
          createdDate: existingUser.createdDate,
          image: existingUser.image,
        },
      };

      sucessFactory.created(res, review);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async deleteReview(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await prisma.review.delete({
        where: { id },
      });
      sucessFactory.noContent(res);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
