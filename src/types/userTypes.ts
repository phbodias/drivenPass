export interface IUserData {
    id:number;
    email:string;
    password:string;
    createdAt:Date;
}

export type TCreateUserData = Omit<IUserData, "id, createdAt">;