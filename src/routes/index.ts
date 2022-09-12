import { Router } from "express";
import authRoute from "./authRoute";
import credentialRoute from "./credentialsRoute";

const router = Router();

router.use(authRoute);
router.use(credentialRoute);

export default router;
