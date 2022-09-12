import prisma from "../database/database";
import { IWifiData, TCreateWifiData } from "../types/wifiTypes";

export async function insert(newCard: TCreateWifiData, userId: number) {
  await prisma.wifis.create({ data: { ...newCard, userId } });
}

export async function deleteOne(id: number) {
  await prisma.wifis.delete({ where: { id } });
}

export async function findById(id: number): Promise<IWifiData> {
  const wifi = await prisma.wifis.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      password: true,
      label: true,
      userId: true,
      createdAt: true,
    },
  });
  return wifi as IWifiData;
}

export async function findByUserId(userId: number): Promise<IWifiData[]> {
  const wifis = await prisma.wifis.findMany({
    where: { userId },
    select: {
        id: true,
        name: true,
        password: true,
        label: true,
        userId: true,
        createdAt: true,
      },
  });
  return wifis;
}

