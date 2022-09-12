import prisma from "../database/database";
import { IAnnotationData, TAnnotationData } from "../types/annotationsTypes";

export async function insert (newAnnotation:TAnnotationData, userId: number){
    await prisma.annotations.create({data:{...newAnnotation, userId}})
}

export async function deleteOne (id:number) {
    await prisma.annotations.delete({where:{id}})
}

export async function findById(id: number): Promise<IAnnotationData> {
    const annotation = await prisma.annotations.findUnique({
      where: { id },
      select: {
        id: true,
        text: true,
        label: true,
        userId: true,
        createdAt: true,
      },
    });
    return annotation as IAnnotationData;
  }
  
  export async function findByUserId(userId: number): Promise<IAnnotationData[]> {
    const annotations = await prisma.annotations.findMany({
      where: { userId },
      select: {
        id: true,
        text: true,
        label: true,
        userId: true,
        createdAt: true,
      },
    });
    return annotations;
  }
  
  export async function findByTitleAndUserId(
    userId: number,
    label: string
  ): Promise<IAnnotationData> {
    const annotation = await prisma.annotations.findFirst({
      where: {
        AND: [{ label }, { userId }],
      },
    });
    return annotation as IAnnotationData;
  }
  