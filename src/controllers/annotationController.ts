import { Request, Response } from "express";
import { IAnnotationData, TAnnotationData } from "../types/annotationsTypes";
import * as annotationServices from "../services/annotationsServices";

export async function createAnnotation(req: Request, res: Response) {
  const annotationBody: TAnnotationData = req.body;
  const userId : number = res.locals.userId;
  await annotationServices.createAnnotation(annotationBody, userId);
  return res.sendStatus(201);
}

export async function getAnnotationBYId(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const annotationId = Number(req.params.id);
  const credential: IAnnotationData = await annotationServices.annotationById(
    annotationId,
    userId
  );
  return res.status(200).send(credential);
}

export async function getUserAnnotations(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const annotations : IAnnotationData[] = await annotationServices.userAnnotations(userId);
  return res.status(200).send(annotations);
}

export async function deleteAnnotation(req: Request, res: Response){
    const userId: number = res.locals.userId;
    const id = Number(req.params.id);
    await annotationServices.deleteAnnotation(id, userId);
    return res.sendStatus(204);
}
