export interface IUserData {
    id:number;
    email:string;
    password:string;
    createdAt:Date;
}

export type TUserData = Omit<IUserData, "id, createdAt">;