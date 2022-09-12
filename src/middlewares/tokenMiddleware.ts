import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUserData } from "../types/userTypes";

dotenv.config();

export function createToken(user: IUserData) {
  const secret: string = process.env.TOKEN_SECRET_KEY ?? "";
  const token : string = jwt.sign({ id: user.id }, secret, {
    expiresIn: "1h",
  });
  return token;
}

export async function validateJWT() {
  return (req: Request, res: Response, next: NextFunction) => {
    const token : string = req.headers["authorization"] ?? '';

    if (!token) throw { code: "Unauthorized", message: "Token inválido" };

    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? "";

    jwt.verify(token, SECRET, (err, decoded: any) => {
      if (err) throw { code: "Unauthorized", message: "Token inválido" };

      res.locals.userId = decoded.id;

      next();
    });
  };
}