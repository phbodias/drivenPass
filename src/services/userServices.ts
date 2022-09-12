import { createToken } from "../middlewares/tokenMiddleware";
import * as userRepository from "../repositories/userRepository";
import { IUserData, TUserData } from "../types/userTypes";
import { comparePasswords, encryptPassword } from "../utils/passwordsFunctions";

async function emailIsInUse(email: string): Promise<boolean> {
  const inUse = await userRepository.findByEmail(email);
  if (inUse) return true;
  return false;
}

export async function createUser(userData: TUserData) {
  
  const emailIsNotAvailable: boolean = await emailIsInUse(userData.email);
  if (emailIsNotAvailable)
    throw { code: "Conflict", message: "Email already in use" };
    
  userData.password = await encryptPassword(userData.password);

  await userRepository.insert(userData);
}

export async function verifyLogin(userData: TUserData): Promise<string> {
  const user: IUserData = await userRepository.findByEmail(userData.email);
  if (!user) throw { code: "NotFound", message: "You haven't an account" };
  const correctPass: boolean = await comparePasswords(
    userData.password,
    user.password
  );
  if (!correctPass)
    throw { code: "Unauthorized", message: "Incorrect email or password" };
  const token: string = createToken(user);
  return token;
}
