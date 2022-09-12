import * as wifisRepository from "../repositories/wifisRepository";
import { IWifiData, TCreateWifiData } from "../types/wifiTypes";
import { decrypt, encryptString } from "../utils/passwordsFunctions";

export async function createWifi(wifiData: TCreateWifiData, userId: number) {
  wifiData.password = encryptString(wifiData.password);
  await wifisRepository.insert(wifiData, userId);
}

export async function userWifis(
  userId: number
): Promise<IWifiData[]> {
  const wifis: IWifiData[] =
    await wifisRepository.findByUserId(userId);
  return wifis.map((wifi) => {
    wifi.password = decrypt(wifi.password);
    return wifi;
  });
}

export async function wifiById(
  id: number,
  userId: number
): Promise<IWifiData> {
  const wifi: IWifiData = await wifisRepository.findById(id);
  if (!wifi)
    throw { code: "NotFound", message: "wifi does not exist" };
  const ownerId = wifi.userId;
  if (userId !== ownerId)
    throw { code: "Unauthorized", message: "Unauthorized" };
  wifi.password = decrypt(wifi.password);
  return wifi;
}

export async function deletewifi(id: number, userId: number){
    const wifi = await wifiById(id, userId);
    await wifisRepository.deleteOne(id);
}