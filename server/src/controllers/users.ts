import { NextFunction, Request, Response } from "express";
import sucessFactory from "../services/responses/sucessFactory";
import errorFactory from "../services/responses/errorFactory";
import prisma from "../../prisma/prismaClient";

export default {
  // async getUserFromToken(req: Request, res: Response, next: NextFunction) {
  //   try {
      
  //   } catch (error) {
  //     errorFactory.internalError(res)
  //   }
    
  // },
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
      const id = Number(req.params.id);

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
