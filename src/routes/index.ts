import { Router } from "express";
import { initialController } from "../controllers/initialController";

const router = Router();

router.get('/initial', initialController);

export default router;
