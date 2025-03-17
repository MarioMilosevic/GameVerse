import { Router } from "express";
import usersController from "../controllers/users"
import authController from '../controllers/auth'

const router = Router()

router.get('/', usersController.getUsers)

router.post('/sign-up', authController.signUp)
router.post('/login', authController.login)


export default router