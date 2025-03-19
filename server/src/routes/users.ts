import { Router } from "express";
import usersController from "../controllers/users";
import authController from "../controllers/auth";

const router = Router();

router.route("/").get(usersController.getUsers);

router.route("/user").get(usersController.getUserFromToken);

router
  .route("/:id")
  .delete(usersController.deleteUser)
  .get(usersController.getUser);

router.post("/sign-up", authController.signUp);
router.post("/login", authController.login);

export default router;
