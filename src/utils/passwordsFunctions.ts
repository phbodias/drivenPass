import bcrypt from "bcrypt";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

export async function encryptPassword(password: string): Promise<string> {
  const saltRound = Number(process.env.ENCRYPT_SALTS) || 20;
  const salt = await bcrypt.genSalt(saltRound);
  const crypt = await bcrypt.hash(password, salt);

  return crypt;
}

export async function comparePasswords(
  password: string,
  crypPassword: string
): Promise<boolean> {
  const passwordsMatch = await bcrypt.compare(password, crypPassword);
  if (!passwordsMatch) return false;
  return true;
}

export function encryptString(password: string): string {
  const cryptrKey: string = process.env.CRYPTR_PASSWORD ?? "";
  const cryptr = new Cryptr(cryptrKey);
  return cryptr.encrypt(password);
}

export function decrypt(password: string): string {
  const cryptrKey: string = process.env.CRYPTR_PASSWORD ?? "";
  const cryptr = new Cryptr(cryptrKey);
  return cryptr.decrypt(password);
}
