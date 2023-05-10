import {Router} from "express";
import {create, getAll} from "../controllers/brandController.js";

const router = new Router();

router.post('/', create)
router.get('/', getAll)

export default router;