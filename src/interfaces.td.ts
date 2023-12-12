import { JwtPayload } from "jsonwebtoken";
export interface userInterface {
  id?: number;
  username: string;
  email: string;
  password: string;
}
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export interface tokenInterface {
  id: number;
}

export interface resultInterface {
  access_token?: string;
  refreshToken?: string;
}

export interface NewAddress{
    userID?: number;
    address?: string;
    state?: string;
    pin_code?: number;
    phone_no?: string;
  }
