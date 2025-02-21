import { Request, Response } from "express";

export default {
  getUsers(req: Request, res: Response) {
    res.send({
      message: "radi",
    });
  },
};
