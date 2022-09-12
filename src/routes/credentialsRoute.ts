import { Router } from "express";
import { createCredential, deleteCredential, getCredentialBYId, getUserCredentials } from "../controllers/credentialControllers";
import { validateJWT } from "../middlewares/tokenMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import credentialSchema from "../schemas/credentialSchema";

const credentialRoute = Router();

credentialRoute.post(
  "/credential",
  validateJWT,
  validateSchemaMiddleware(credentialSchema),
  createCredential
);
credentialRoute.get("/credentials", validateJWT, getUserCredentials);
credentialRoute.get("/credential/:id", validateJWT, getCredentialBYId);
credentialRoute.delete("/deletecredential/:id", validateJWT, deleteCredential);

export default credentialRoute;