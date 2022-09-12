import { Router } from "express";
import annotationRoute from "./annotationRoute";
import authRoute from "./authRoute";
import credentialRoute from "./credentialsRoute";

const router = Router();

router.use(authRoute);
router.use(credentialRoute);
router.use(annotationRoute)

export default router;
