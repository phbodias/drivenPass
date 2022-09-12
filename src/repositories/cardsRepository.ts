import prisma from "../database/database";
import { ICardData, TCreateCardData } from "../types/cardTypes";

export async function insert (newCard:TCreateCardData){
    await prisma.cards.create({data:{...newCard}})
}

export async function deleteOne (id:number) {
    await prisma.cards.delete({where:{id}})
}