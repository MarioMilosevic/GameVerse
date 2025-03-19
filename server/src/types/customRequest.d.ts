import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    requestPayload: {
      id: number;
      body: any;
      data?: any;
    };
  }
}
