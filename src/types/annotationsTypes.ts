export interface IAnnotationData {
  id: number;
  text: string;
  label: string;
  userId: number;
  createdAt: Date;
}

export type TCreateAnnotationData = Omit<IAnnotationData, "id" | "createdAt">;
