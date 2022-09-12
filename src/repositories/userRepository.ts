import prisma from "../database/database";
import { IUserData, TUserData } from "../types/userTypes";

export async function insert(userData: TUserData) {
  await prisma.users.create({
    data: {
      email: userData.email,
      password: userData.password,
    },
  });
}

export async function findByEmail(email: string): Promise<IUserData> {
  const user = await prisma.users.findFirst({ where: { email } });
  return user as IUserData;
}

export async function findById(id: number): Promise<IUserData> {
  const user = await prisma.users.findUnique({ where: { id } });
  return user as IUserData;
}

