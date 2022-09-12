import { Request, Response } from "express";
import { IWifiData, TCreateWifiData } from "../types/wifiTypes";
import * as wifiServices from "../services/wifiServices";

export async function createWifi(req: Request, res: Response) {
  const wifiData: TCreateWifiData = req.body;
  const userId: number = res.locals.userId;
  await wifiServices.createWifi(wifiData, userId);
  return res.sendStatus(201);
}

export async function getWifiById(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const wifiId = Number(req.params.id);
  const wifi: IWifiData = await wifiServices.wifiById(wifiId, userId);
  return res.status(200).send(wifi);
}

export async function getUserWifis(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const wifis: IWifiData[] = await wifiServices.userWifis(userId);
  return res.status(200).send(wifis);
}

export async function deleteWifi(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const id = Number(req.params.id);
  await wifiServices.deletewifi(id, userId);
  return res.sendStatus(204);
}
