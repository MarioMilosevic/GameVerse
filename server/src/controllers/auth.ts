import { Request, Response } from "express"
import errorFactory from "../services/responses/errorFactory"
import sucessFactory from "../services/responses/sucessFactory";
import prisma from "../../prisma/prismaClient";
import validator from 'validator';
import jwt from 'jsonwebtoken';
import config from '../config'

// const signToken = (id: number) =>
//   jwt.sign({ id }, config.secrets.jwt, {
//     expiresIn: config.secrets.expiresIn,
//   });


export default {
  async signUp(req: Request, res: Response) {
        try {
        
            const {fullName, email, password, passwordConfirm, role, image} = req.body
            console.log(fullName, email, password, passwordConfirm, role, image)
    //   const user = await prisma.user.create({
    //     data: req.body,
    //   });
    //   if (!user) {
    //     errorFactory.badRequest(res);
    //     return;
    //   }
      sucessFactory.created(res, 'proslo');
    //   sucessFactory.created(res, user);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};