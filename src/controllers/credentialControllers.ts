import { Request, Response } from "express";
import { ICredentialData, TCredentialData } from "../types/credentialTypes";
import * as credentialServices from "../services/credentialsServices";

export async function createCredential(req: Request, res: Response) {
  const credentialBody: TCredentialData = req.body;
  const userId : number = res.locals.userId;
  await credentialServices.createCredential(credentialBody, userId);
  return res.sendStatus(201);
}

export async function getCredentialBYId(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const credentialId = Number(req.params.id);
  const credential: ICredentialData = await credentialServices.credentialById(
    credentialId,
    userId
  );
  return res.status(200).send(credential);
}

export async function getUserCredentials(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const credentials : ICredentialData[] = await credentialServices.userCredentials(userId);
  return res.status(200).send(credentials);
}

export async function deleteCredential(req: Request, res: Response){
    const userId: number = res.locals.userId;
    const id = Number(req.params.id);
    await credentialServices.deleteCredential(id, userId);
    return res.sendStatus(204);
}
