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
          releaseYear: parseInt(releaseYear),
          description,
          writers,
          stars,
          price: parseFloat(price),
          gameplayHours: parseFloat(gameplayHours),
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
      console.log(req.params);
      const mario = Number(req.params.id);
      console.log(mario);
      const game = await prisma.game.findUnique({ where: { id: 1 } });
      console.log(game);
      const deleted = await prisma.game.delete({
        where: { id: 1 },
      });
      console.log("proslo odje");
      console.log(deleted);
      sucessFactory.noContent(res);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
