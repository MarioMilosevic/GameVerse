import { Router } from "express";
import genresController from "../controllers/genres"


const router = Router();

router.get("/", genresController.getAll).post("/", genresController.createGenre);


export default router;