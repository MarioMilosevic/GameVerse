import { Router } from "express";
import gamesController from "../controllers/games";

const router = Router();

router.route('/').get(gamesController.getAll).post(gamesController.createGame);
router.route('/:id').delete(gamesController.deleteGame)


export default router;
