import { Request, Response } from "express";
import sucessFactory from "../services/responses/sucessFactory";
import errorFactory from "../services/responses/errorFactory";
import prisma from "../../prisma/prismaClient";

export default {
 async getUsers(req: Request, res: Response) {
    try {
      const allUsers = await prisma.user.findMany()
      if (!allUsers) {
        errorFactory.badRequest(res)
        return
      }
      sucessFactory.ok(res, allUsers);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
 
};
