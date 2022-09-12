import prisma from "../database/database";
import { ICredentialData, TCredentialData } from "../types/credentialTypes";

export async function insert(newCredential: TCredentialData, userId:number) {
  await prisma.credentials.create({ data: { ...newCredential, userId } });
}

export async function deleteOne(id: number) {
  await prisma.credentials.delete({ where: { id } });
}

export async function findById(id: number): Promise<ICredentialData> {
  const credential = await prisma.credentials.findUnique({
    where: { id },
    select: {
      id: true,
      url: true,
      username: true,
      password: true,
      label: true,
      userId: true,
      createdAt: true,
    },
  });
  return credential as ICredentialData;
}

export async function findByUserId(userId: number): Promise<ICredentialData[]> {
  const credentials = await prisma.credentials.findMany({
    where: { userId },
    select: {
      id: true,
      url: true,
      username: true,
      password: true,
      label: true,
      userId: true,
      createdAt: true,
    },
  });
  return credentials;
}

export async function findByTitleAndUserId(
  userId: number,
  label: string
): Promise<ICredentialData> {
  const credential = await prisma.credentials.findFirst({
    where: {
      AND: [{ label }, { userId }],
    },
  });
  return credential as ICredentialData;
}
