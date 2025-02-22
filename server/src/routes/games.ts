import { Router } from "express";
import gamesController from "../controllers/games";

const router = Router();

router.get("/", gamesController.getAll).post("/", gamesController.createGame);


export default router;
