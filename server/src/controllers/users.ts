import { NextFunction, Request, Response } from "express";
import sucessFactory from "../services/responses/sucessFactory";
import errorFactory from "../services/responses/errorFactory";
import prisma from "../../prisma/prismaClient";
import jwt, { decode } from "jsonwebtoken";
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
        });
        if (!user) {
          errorFactory.notFound(res);
          return;
        }
        sucessFactory.ok(res, user);
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
      sucessFactory.ok(res, allUsers);
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

      sucessFactory.ok(res, user);
    } catch (error) {
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

      sucessFactory.noContent(res);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
