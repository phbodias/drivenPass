import prisma from "../database/database";
import { IAnnotationData, TCreateAnnotationData } from "../types/annotationsTypes";

export async function insert (newAnnotation:TCreateAnnotationData){
    await prisma.annotations.create({data:{...newAnnotation}})
}

export async function deleteOne (id:number) {
    await prisma.annotations.delete({where:{id}})
}