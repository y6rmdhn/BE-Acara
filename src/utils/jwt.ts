import { Types } from "mongoose";
import { IUser } from "../types/auth.type";
import jwt from "jsonwebtoken";
import { SECRET } from "./env";

export interface IUserToken
  extends Omit<
    IUser,
    | "password"
    | "activationCode"
    | "isActive"
    | "email"
    | "fullname"
    | "profilePicture"
    | "username"
  > {
  id?: Types.ObjectId;
}

export const generatetoken = (user: IUserToken): string => {
  const token = jwt.sign(user, SECRET, { expiresIn: "1h" });

  return token;
};

export const getUserData = (token: string) => {
  const user = jwt.verify(token, SECRET) as IUserToken;

  return user;
};
