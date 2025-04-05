import { Router } from "express";
import reviewsController from "../controllers/reviews";

const router = Router();

router
  .route("/")
  .get(reviewsController.getAll)
  .post(reviewsController.addReview);

router
  .route("/:reviewId")
  .patch(reviewsController.editReview)
  .delete(reviewsController.deleteReview);

export default router;
