import { Router } from "express";
import reviewsController from "../controllers/reviews";

const router = Router();

router
  .route("/")
  .get(reviewsController.getAll)
  .post(reviewsController.addReview);

export default router;
