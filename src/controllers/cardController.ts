import { Request, Response } from "express";
import { ICardData, TCreateCardData } from "../types/cardTypes";
import * as cardsServices from "../services/cardsServices";

export async function createCard(req: Request, res: Response) {
  const cardData: TCreateCardData = req.body;
  const userId : number = res.locals.userId;
  await cardsServices.createCard(cardData, userId);
  return res.sendStatus(201);
}

export async function getCardById(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const cardId = Number(req.params.id);
  const card: ICardData = await cardsServices.cardById(
    cardId,
    userId
  );
  return res.status(200).send(card);
}

export async function getUsercards(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const cards : ICardData[] = await cardsServices.userCards(userId);
  return res.status(200).send(cards);
}

export async function deletecard(req: Request, res: Response){
    const userId: number = res.locals.userId;
    const id = Number(req.params.id);
    await cardsServices.deletecard(id, userId);
    return res.sendStatus(204);
}
