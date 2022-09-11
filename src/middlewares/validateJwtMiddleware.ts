import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

export async function validateJWT() {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];

    if (!token) throw { code: "Unauthorized", message: "Token inválido" };

    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? "";

    jwt.verify(token, SECRET, (err, decoded: any) => {
      if (err) throw { code: "Unauthorized", message: "Token inválido" };
      
      res.locals.userId = decoded.id;

      next();
    });
  };
}
