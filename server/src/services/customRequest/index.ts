import { Request } from "express";

export interface CustomRequest extends Request {
  requestPayload: {
    id: number;
    body: any;
    data?: any;
  };
}
