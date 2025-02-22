import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import sucessFactory from "../services/responses/sucessFactory";
import errorFactory from "../services/responses/errorFactory";

export default {
 async getUsers(req: Request, res: Response) {
    try {
      const allUsers = await prisma.user.findMany()
      if (!allUsers) {
        console.log('uslo odje')
        errorFactory.badRequest(res)
        return
      }
      sucessFactory.ok(res, allUsers);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async proba(req: Request, res: Response) {
    try {
      console.log(req.body);

      const user = await prisma.user.create({
        data: req.body,
      });
      if (!user) {
        errorFactory.badRequest(res);
        return
      }

      sucessFactory.created(res, user);
    } catch (error) {
      console.log("uslo u catch");
      errorFactory.internalError(res);
    }
  },
};
