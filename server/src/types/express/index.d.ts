// server/src/types/express.d.ts
import { Request } from "express";

// declare module "express-serve-static-core" {
//   interface Request {
//     requestPayload: {
//       reviewId: number;
//       body: any;
//       data?: any;
//     };
//     existingUser: {
//       id: number;
//       createdDate: Date;
//       fullName: string;
//       image: string | null;
//     } | null;
//   }
// }

declare global {
  namespace Express {
    export interface Request {
      reviewId: number;
      avgRating:number
      // requestPayload: {
      //   reviewId: number;
      //   body: any;
      //   data?: any;
      // };
      // existingUser: {
      //   id: number;
      //   createdDate: Date;
      //   fullName: string;
      //   image: string | null;
      // } | null;
    }
  }
}
