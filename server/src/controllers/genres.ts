import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import sucessFactory from "../services/responses/sucessFactory";
import errorFactory from "../services/responses/errorFactory";

export default {
  async getAll(req: Request, res: Response) {
    try {
      const all = await prisma.genre.findMany();
      if (!all) {
        errorFactory.badRequest(res);
        return;
      }
      sucessFactory.ok(res, all);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async createGenre(req: Request, res: Response) {
    try {
      console.log('tek treba da se napravi')
    } catch (error) {
      errorFactory.internalError(res)
    }
  }
};
