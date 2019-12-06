export enum ERole {"USER", "ADMIN"}
export interface User {
  _id:string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: ERole;
  date: Date;
  authToken?:string;
  expirationDate?:Date;
}
