import { Request, Response } from "express";

export async function initialController(req: Request, res: Response) {
  return res.sendStatus(200);
}
