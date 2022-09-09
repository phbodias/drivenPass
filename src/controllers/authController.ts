import { Request, Response } from "express";

export async function signUpController(req:Request, res: Response) {
    return res.sendStatus(201);
}

export async function signInController(req:Request, res: Response) {
    return res.sendStatus(200);
}