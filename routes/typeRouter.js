import {Router} from "express";
import {create, getAll} from "../controllers/typeController.js";
import checkRole from "../middleware/checkRoleMiddleware.js";

const router = new Router();

router.post('/', checkRole('ADMIN'), create)
router.get('/', getAll)

export default router;