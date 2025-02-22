import { Router } from "express";
import usersController from "../controllers/users"


const router = Router()

router.get('/', usersController.getUsers)
router.post('/sign-up', usersController.proba)


export default router