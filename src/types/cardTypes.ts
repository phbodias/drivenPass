export type CardTypes = "credit" | "debit" | "both";

export interface ICardData {
  id: number;
  number: string;
  cardholderName: string;
  cvv: string;
  expiration: string;
  password: string;
  isVirtual: boolean;
  type: CardTypes;
  label: string;
  userId: number;
  createdAt: Date;
}

export type TCreateCardData = Omit<ICardData, "id" | "createdAt">;
