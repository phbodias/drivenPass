export interface IAnnotationData {
  id: number;
  text: string;
  label: string;
  userId: number;
  createdAt: Date;
}

export type TAnnotationData = Omit<IAnnotationData, "id" | "userId" |"createdAt">;
