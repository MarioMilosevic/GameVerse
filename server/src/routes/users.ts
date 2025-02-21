import { Router } from "express";
import controller from "../controllers/users"


const router = Router()

router.get('/', controller.getUsers)

export default router