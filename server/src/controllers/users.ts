import { NextFunction, Request, Response } from "express";
import successFactory from "../services/responses/successFactory";
import errorFactory from "../services/responses/errorFactory";
import { getAverageRating } from "../utils/helpers";
import prisma from "../../prisma/prismaClient";
import jwt from "jsonwebtoken";
import config from "../config";

export default {
  async getUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      req.id = id;
      next();
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async getUserFromToken(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        errorFactory.notAuthorized(res);
        return;
      }

      const token = authHeader.split(" ")[1];

      try {
        const decoded = jwt.verify(token, config.secrets.jwt) as { id: string };

        if (!decoded?.id) {
          errorFactory.forbidden(res);
          return;
        }
        const user = await prisma.user.findUnique({
          where: { id: Number(decoded.id) },
          select: {
            id: true,
            createdDate: true,
            email: true,
            fullName: true,
            image: true,
            role: true,
          },
        });
        if (!user) {
          errorFactory.notFound(res);
          return;
        }
        successFactory.ok(res, user);
      } catch (err) {
        errorFactory.notAuthorized(res);
        return;
      }
    } catch (error) {
      errorFactory.internalError(res);
      return;
    }
  },
  async getUsers(req: Request, res: Response) {
    try {
      const allUsers = await prisma.user.findMany();
      if (!allUsers) {
        errorFactory.badRequest(res);
        return;
      }
      successFactory.ok(res, allUsers);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.id },
        select: {
          id: true,
          role: true,
          email: true,
          fullName: true,
          image: true,
        },
      });

      if (!user) {
        errorFactory.notFound(res, "User not found");
        return;
      }

      successFactory.ok(res, user);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async getUserReviews(req: Request, res: Response) {
    try {
      const userWithReviews = await prisma.user.findUnique({
        where: { id: req.id },
        select: {
          reviews: {
            include: {
              game: {
                select: {
                  name: true,
                  thumbnail: true,
                },
              },
            },
          },
        },
      });

      if (!userWithReviews) {
        errorFactory.notFound(res, "User not found");
        return;
      }

      const reviewsWithAvgRating = await Promise.all(
        userWithReviews.reviews.map(async (review) => {
          const avgRating = await getAverageRating(review.gameId);
          return {
            ...review,
            game: {
              ...review.game,
              averageRating: avgRating,
            },
          };
        })
      );

      successFactory.ok(res, reviewsWithAvgRating);
    } catch (error) {
      console.error(error);
      errorFactory.internalError(res);
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.id },
      });
      if (!user) {
        errorFactory.notFound(res, "User has not been found");
        return;
      }
      await prisma.user.delete({
        where: { id: req.id },
      });

      successFactory.noContent(res);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async editUserProfile(req: Request, res: Response) {
    try {
      const { fullName, email } = req.body;
      console.log(fullName, email);

      if (!fullName || !email) {
        errorFactory.badRequest(res);
        return;
      }

      const updatedUser = await prisma.user.update({
        where: { id: req.id },
        data: {
          fullName,
          email,
        },
        select: {
          createdDate: true,
          email: true,
          fullName: true,
          id: true,
          image: true,
          role: true,
        },
      });
      successFactory.ok(res, updatedUser);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
