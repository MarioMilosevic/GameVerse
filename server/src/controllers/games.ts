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
          reviews: {
            select: {
              rating: true,
            },
          },
        },
      });

      if (!games) {
        errorFactory.badRequest(res);
        return;
      }

      const gamesWithAvgRating = await Promise.all(
        games.map(async (game) => {
          const ratingAggregation = await prisma.review.aggregate({
            where: { gameId: game.id },
            _avg: {
              rating: true,
            },
          });

          const avgRating = ratingAggregation._avg.rating?.toFixed(2) || 0;

          return {
            ...game,
            rating: avgRating,
          };
        })
      );

      sucessFactory.ok(res, gamesWithAvgRating);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getSingleGame(req: Request, res: Response) {
    try {
      const singleGame = await prisma.game.findUnique({
        where: { id: Number(req.params.id) },
        include: {
          reviews: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              rating: true,
              user: {
                select: {
                  createdDate: true,
                  id: true,
                  fullName: true,
                  image: true,
                },
              },
            },
          },
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

      const rating = await prisma.game.aggregate({
        _avg: {
          rating: true,
        },
      });

      const totalRatings = singleGame.reviews.length;
      const totalRatingValue = singleGame.reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRatingValue / totalRatings;
      singleGame.rating = averageRating;
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
