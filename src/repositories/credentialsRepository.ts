import prisma from "../database/database";
import { ICredentialData, TCreateCredentialData } from "../types/credentialTypes";

export async function insert (newCredential:TCreateCredentialData){
    await prisma.credentials.create({data:{...newCredential}})
}

export async function deleteOne (id:number) {
    await prisma.credentials.delete({where:{id}})
}