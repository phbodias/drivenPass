import { Router } from "express";
import { createAnnotation, deleteAnnotation, getAnnotationBYId, getUserAnnotations } from "../controllers/annotationController";
import { validateJWT } from "../middlewares/tokenMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import annotationSchema from "../schemas/annotationsSchema";

const annotationRoute = Router();

annotationRoute.post(
  "/annotation",
  validateJWT,
  validateSchemaMiddleware(annotationSchema),
  createAnnotation
);
annotationRoute.get("/annotations", validateJWT, getUserAnnotations);
annotationRoute.get("/annotation/:id", validateJWT, getAnnotationBYId);
annotationRoute.delete("/annotation/:id", validateJWT, deleteAnnotation);

export default annotationRoute;