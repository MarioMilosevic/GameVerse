import { Router } from "express";
import usersController from "../controllers/users";
import authController from "../controllers/auth";
import multer from 'multer';

const router = Router();
const upload = multer({storage:multer.memoryStorage()})

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

router
  .route("/disable/:id")
  .patch(usersController.getUserId, usersController.disableAccount);

router
  .route("/image/:id")
  .patch(usersController.getUserId, upload.single('image'), usersController.updateUserImage);

router.post("/sign-up", authController.signUp);
router.post("/login", authController.login);

export default router;
