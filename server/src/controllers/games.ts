import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import sucessFactory from "../services/responses/sucessFactory";
import errorFactory from "../services/responses/errorFactory";

export default {
  async getAll(req: Request, res: Response) {
    try {
      const games = await prisma.game.findMany();

      if (!games) {
        errorFactory.badRequest(res);
        return;
      }
      sucessFactory.ok(res, games);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async createGame(req: Request, res: Response) {
    try {
      console.log(req.body);
      const newGame = await prisma.game.create({
        data: req.body,
      });
      if (!newGame) {
        errorFactory.badRequest(res);
        return;
      }
      sucessFactory.created(res, newGame);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
