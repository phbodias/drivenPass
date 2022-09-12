import { Router } from "express";
import annotationRoute from "./annotationRoute";
import authRoute from "./authRoute";
import cardRoute from "./cardRoute";
import credentialRoute from "./credentialsRoute";

const router = Router();

router.use(authRoute);
router.use(credentialRoute);
router.use(annotationRoute);
router.use(cardRoute);

export default router;
