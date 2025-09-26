import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { SECRET } from "./env.js";
import type { IUser } from "../types/auth.type.js";

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
