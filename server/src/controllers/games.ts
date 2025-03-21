import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import sucessFactory from "../services/responses/sucessFactory";
import errorFactory from "../services/responses/errorFactory";

export default {
  async getAll(req: Request, res: Response) {
    try {
      const games = await prisma.game.findMany({
        include: {
          consoles: {
            select: {
              console: {
                select: {
                  image: true,
                  id: true,
                },
              },
            },
          },
          genres: {
            select: {
              genre: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!games) {
        errorFactory.badRequest(res);
        return;
      }
      sucessFactory.ok(res, games);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getSingleGame(req: Request, res: Response) {
    try {
      const singleGame = await prisma.game.findUnique({
        where: { id: Number(req.params.id) },
        include: {
          consoles: {
            select: {
              console: {
                select: {
                  image: true,
                },
              },
            },
          },
          genres: {
            select: {
              genre: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      if (!singleGame) {
        errorFactory.notFound(res);
        return;
      }
      sucessFactory.ok(res, singleGame);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async createGame(req: Request, res: Response) {
    try {
      const {
        name,
        releaseYear,
        description,
        writers,
        stars,
        price,
        gameplayHours,
        trailer,
        thumbnail,
        consoles,
        genres,
      } = req.body;

      const newGame = await prisma.game.create({
        data: {
          name,
          releaseYear,
          description,
          writers,
          stars,
          price,
          gameplayHours,
          trailer,
          thumbnail,
          consoles: {
            create: consoles.map((consoleId: number) => ({
              console: { connect: { id: consoleId } },
            })),
          },
          genres: {
            create: genres.map((genreId: number) => ({
              genre: { connect: { id: genreId } },
            })),
          },
        },
      });

      if (!newGame) {
        errorFactory.badRequest(res);
        return;
      }

      sucessFactory.created(res, newGame);
    } catch (error) {
      console.error(error);
      errorFactory.internalError(res);
    }
  },
  async deleteGame(req: Request, res: Response) {
    try {
      const deleted = await prisma.game.delete({
        where: { id: Number(req.params.id) },
      });
      if (!deleted) {
        errorFactory.notFound(res);
        return;
      }
      sucessFactory.noContent(res);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async editGame(req: Request, res: Response) {
    try {
      const { thumbnail } = req.body;
      const updatedGame = await prisma.game.update({
        where: { id: Number(req.params.id) },
        data: {
          thumbnail,
        },
      });
      sucessFactory.ok(res, updatedGame);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
