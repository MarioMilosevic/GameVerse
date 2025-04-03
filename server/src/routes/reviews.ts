import { Router } from "express";
import reviewsController from "../controllers/reviews";

const router = Router();

router
  .route("/")
  .get(reviewsController.getAll)
  .post(reviewsController.addReview);

router
  .route("/:reviewId/:gameId")
  .delete(reviewsController.deleteReview)
  .patch(reviewsController.editReview);

export default router;
