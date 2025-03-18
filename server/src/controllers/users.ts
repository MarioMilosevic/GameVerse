import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../services/customRequest";
import sucessFactory from "../services/responses/sucessFactory";
import errorFactory from "../services/responses/errorFactory";
import prisma from "../../prisma/prismaClient";
import jwt from "jsonwebtoken";
import config from "../config";

export default {
  
  async getUserFromToken(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return errorFactory.notAuthorized(res);
      }

      const token = authHeader.split(" ")[1];

      try {
        const decoded = jwt.verify(token, config.secrets.jwt) as { id: string };

        if (!decoded?.id) {
          return errorFactory.forbidden(res);
        }

        req.requestPayload.id = Number(decoded.id);
        next();
      } catch (err) {
        return errorFactory.notAuthorized(res);
      }
    } catch (error) {
      return errorFactory.internalError(res);
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
  async getUser(req: CustomRequest, res: Response) {
    try {
      const id = req.requestPayload.id;
      const user = await prisma.user.findUnique({
        where: { id },
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
      const id = Number(req.params.id);

      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        errorFactory.notFound(res, "User has not been found");
        return;
      }
      await prisma.user.delete({
        where: { id },
      });

      sucessFactory.noContent(res);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
