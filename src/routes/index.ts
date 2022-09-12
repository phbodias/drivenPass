import { Router } from "express";
import annotationRoute from "./annotationRoute";
import authRoute from "./authRoute";
import cardRoute from "./cardRoute";
import credentialRoute from "./credentialsRoute";
import wifiRoute from "./wifiRoute";

const router = Router();

router.use(authRoute);
router.use(credentialRoute);
router.use(annotationRoute);
router.use(cardRoute);
router.use(wifiRoute);

export default router;
