import prisma from "../database/database";
import { IWifiData, TCreateWifiData } from "../types/wifiTypes";

export async function insert (newCard:TCreateWifiData){
    await prisma.wifis.create({data:{...newCard}})
}

export async function deleteOne (id:number) {
    await prisma.wifis.delete({where:{id}})
}