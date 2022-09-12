import prisma from "../database/database";
import { ICardData, TCreateCardData } from "../types/cardTypes";

export async function insert(newCard: TCreateCardData, userId: number) {
  await prisma.cards.create({ data: { ...newCard, userId } });
}

export async function deleteOne(id: number) {
  await prisma.cards.delete({ where: { id } });
}

export async function findById(id: number): Promise<ICardData> {
  const card = await prisma.cards.findUnique({
    where: { id },
    select: {
      id: true,
      number: true,
      cardholderName: true,
      cvv: true,
      expiration: true,
      password: true,
      isVirtual: true,
      type: true,
      label: true,
      userId: true,
      createdAt: true,
    },
  });
  return card as ICardData;
}

export async function findByUserId(userId: number): Promise<ICardData[]> {
  const cards = await prisma.cards.findMany({
    where: { userId },
    select: {
        id: true,
        number: true,
        cardholderName: true,
        cvv: true,
        expiration: true,
        password: true,
        isVirtual: true,
        type: true,
        label: true,
        userId: true,
        createdAt: true,
      },
  });
  return cards;
}

export async function findByTitleAndUserId(
  userId: number,
  label: string
): Promise<ICardData> {
  const card = await prisma.cards.findFirst({
    where: {
      AND: [{ label }, { userId }],
    },
  });
  return card as ICardData;
}
