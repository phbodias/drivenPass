import * as annotationsRepository from "../repositories/annotationsRepository";
import { IAnnotationData, TAnnotationData } from "../types/annotationsTypes";

async function verifyAnnotationLabelAvailable(
  userId: number,
  label: string
): Promise<boolean> {
  const notAvailable: IAnnotationData =
    await annotationsRepository.findByTitleAndUserId(userId, label);
  if (notAvailable) return false;
  return true;
}

export async function createAnnotation(
  annotationData: TAnnotationData,
  userId: number
) {
  const labelIsAvailable: boolean = await verifyAnnotationLabelAvailable(
    userId,
    annotationData.label
  );
  if (!labelIsAvailable)
    throw { code: "Conflict", message: "Label already in use" };
  await annotationsRepository.insert(annotationData, userId);
}

export async function userAnnotations(
  userId: number
): Promise<IAnnotationData[]> {
  const annotations: IAnnotationData[] = await annotationsRepository.findByUserId(userId);
  return annotations;
}

export async function annotationById(
  id: number,
  userId: number
): Promise<IAnnotationData> {
  const annotation: IAnnotationData = await annotationsRepository.findById(id);
  if (!annotation)
    throw { code: "NotFound", message: "annotation does not exist" };
  const ownerId = annotation.userId;
  if (userId !== ownerId)
    throw { code: "Unauthorized", message: "Unauthorized" };
  return annotation;
}

export async function deleteAnnotation(id: number, userId: number) {
  const credential = await annotationById(id, userId);
  await annotationsRepository.deleteOne(id);
}
