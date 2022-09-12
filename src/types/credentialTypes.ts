export interface ICredentialData {
  id: number;
  url: string;
  username: string;
  password: string;
  label: string;
  userId: number;
  createdAt: Date;
}

export type TCredentialData = Omit<ICredentialData,'id' | 'userID' | 'createdAt'>
