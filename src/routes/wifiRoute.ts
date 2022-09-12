import { Router } from "express";
import {
  createWifi,
  deleteWifi,
  getUserWifis,
  getWifiById,
} from "../controllers/wifiController";
import { validateJWT } from "../middlewares/tokenMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import wifiSchema from "../schemas/wifiSchema";

const wifiRoute = Router();

wifiRoute.post(
  "/wifi",
  validateJWT,
  validateSchemaMiddleware(wifiSchema),
  createWifi
);
wifiRoute.get("/wifis", validateJWT, getUserWifis);
wifiRoute.get("/wifi/:id", validateJWT, getWifiById);
wifiRoute.delete("/wifi/:id", validateJWT, deleteWifi);

export default wifiRoute;
