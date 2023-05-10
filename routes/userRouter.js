import {Router} from "express";
import {register, login, auth} from "../controllers/userController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = new Router();

router.post('/register', register)
router.post('/login', login)
router.get('/auth', authMiddleware, auth)

export default router;