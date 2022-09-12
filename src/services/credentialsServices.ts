import * as credentialsRepository from "../repositories/credentialsRepository";
import { ICredentialData, TCredentialData } from "../types/credentialTypes";
import { decrypt, encryptString } from "../utils/passwordsFunctions";

async function verifyCredentialLabelAvailable(
  userId: number,
  label: string
): Promise<boolean> {
  const notAvailable: ICredentialData =
    await credentialsRepository.findByTitleAndUserId(userId, label);
  if (notAvailable) return false;
  return true;
}

export async function createCredential(credentialData: TCredentialData, userId: number) {
  const labelIsAvailable: boolean = await verifyCredentialLabelAvailable(
    userId,
    credentialData.label
  );
  if (!labelIsAvailable)
    throw { code: "Conflict", message: "Label already in use" };
  credentialData.password = encryptString(credentialData.password);
  await credentialsRepository.insert(credentialData, userId);
}

export async function userCredentials(
  userId: number
): Promise<ICredentialData[]> {
  const credentials: ICredentialData[] =
    await credentialsRepository.findByUserId(userId);
  return credentials.map((credential) => {
    credential.password = decrypt(credential.password);
    return credential;
  });
}

export async function credentialById(
  id: number,
  userId: number
): Promise<ICredentialData> {
  const credential: ICredentialData = await credentialsRepository.findById(id);
  if (!credential)
    throw { code: "NotFound", message: "Credential does not exist" };
  const ownerId = credential.userId;
  if (userId !== ownerId)
    throw { code: "Unauthorized", message: "Unauthorized" };
  credential.password = decrypt(credential.password);
  return credential;
}

export async function deleteCredential(id: number, userId: number){
    const credential = await credentialById(id, userId);
    await credentialsRepository.deleteOne(id);
}