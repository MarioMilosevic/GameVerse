import { Router } from "express";
import usersController from "../controllers/users";
import authController from "../controllers/auth";

const router = Router();

router.route("/").get(usersController.getUsers);

router.route("/user").get(usersController.getUserFromToken);

router
  .route("/:id")
  .get(usersController.getUserId, usersController.getUser)
  .patch(usersController.getUserId, usersController.editUserNameAndEmail);

router
  .route("/dashboard/:id")
  .patch(usersController.getUserId, usersController.editUserProfile)
  .delete(usersController.getUserId, usersController.deleteUser);

router
  .route("/reviews/:id")
  .get(usersController.getUserId, usersController.getUserReviews);

router.post("/sign-up", authController.signUp);
router.post("/login", authController.login);

export default router;
