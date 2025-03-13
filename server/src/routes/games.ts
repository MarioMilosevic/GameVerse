import { Router } from "express";
import gamesController from "../controllers/games";

const router = Router();

router.route("/").get(gamesController.getAll).post(gamesController.createGame);
router
  .route("/:id")
  .get(gamesController.getSingleGame)
  .delete(gamesController.deleteGame)
  // .patch(gamesController.editGame)
  // @ts-ignore
  .patch(gamesController.addPhoto)

export default router;
