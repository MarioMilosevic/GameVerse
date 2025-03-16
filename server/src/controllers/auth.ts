import { Request, Response } from "express"
import errorFactory from "../services/responses/errorFactory"
import sucessFactory from "../services/responses/sucessFactory";
import prisma from "../../prisma/prismaClient";
import validator from 'validator';

export default {
  async signUp(req: Request, res: Response) {
    try {
      const user = await prisma.user.create({
        data: req.body,
      });
      if (!user) {
        errorFactory.badRequest(res);
        return;
      }
      sucessFactory.created(res, user);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};