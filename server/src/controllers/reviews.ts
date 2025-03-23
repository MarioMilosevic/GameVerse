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
      sucessFactory.ok(res, "radi");
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
