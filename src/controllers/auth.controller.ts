import { Request, Response } from "express";
import { TRegister } from "../types/auth.type";

export default {
  register(req: Request, res: Response) {
    const { fullname, username, password, confirmPassword } =
      req.body as unknown as TRegister;
  },
};
