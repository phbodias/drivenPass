export interface IWifiData {
  id: number;
  name: string;
  password: string;
  label: string;
  userId: number;
  createdAt: Date;
}


export type TCreateWifiData = Omit<IWifiData,'id' | 'createdAt'>