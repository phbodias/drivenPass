import * as cardsRepository from "../repositories/cardsRepository";
import { ICardData, TCreateCardData } from "../types/cardTypes";
import { decrypt, encryptString } from "../utils/passwordsFunctions";

async function verifyCardLabelAvailable(
  userId: number,
  label: string
): Promise<boolean> {
  const notAvailable: ICardData =
    await cardsRepository.findByTitleAndUserId(userId, label);
  if (notAvailable) return false;
  return true;
}

export async function createCard(cardData: TCreateCardData, userId: number) {
  const labelIsAvailable: boolean = await verifyCardLabelAvailable(
    userId,
    cardData.label
  );
  if (!labelIsAvailable)
    throw { code: "Conflict", message: "Label already in use" };
  cardData.password = encryptString(cardData.password);
  cardData.cvv = encryptString(cardData.cvv);
  await cardsRepository.insert(cardData, userId);
}

export async function userCards(
  userId: number
): Promise<ICardData[]> {
  const cards: ICardData[] =
    await cardsRepository.findByUserId(userId);
  return cards.map((card) => {
    card.password = decrypt(card.password);
    card.cvv = decrypt(card.cvv);
    return card;
  });
}

export async function cardById(
  id: number,
  userId: number
): Promise<ICardData> {
  const card: ICardData = await cardsRepository.findById(id);
  if (!card)
    throw { code: "NotFound", message: "card does not exist" };
  const ownerId = card.userId;
  if (userId !== ownerId)
    throw { code: "Unauthorized", message: "Unauthorized" };
  card.password = decrypt(card.password);
  card.cvv = decrypt(card.cvv);
  return card;
}

export async function deletecard(id: number, userId: number){
    const card = await cardById(id, userId);
    await cardsRepository.deleteOne(id);
}