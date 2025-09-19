import { Request, Response } from "express";
import { TRegister } from "../types/auth.type";
import schema from "../schemas/auth.shema";
import UserModel from "../models/user.model";

export default {
  async register(req: Request, res: Response) {
    console.log("REQ BODY:", req.body);

    try {
      const { fullname, username, password, confirmPassword, email } =
        req.body as unknown as TRegister;

      await schema.registrasiValidateSchema.validate({
        fullname,
        username,
        password,
        confirmPassword,
        email,
      });

      const result = await UserModel.create({
        fullname,
        username,
        email,
        password,
      });

      res.status(200).json({
        message: "Register success!",
        data: result,
      });
    } catch (error) {
      const err = error as unknown as Error;

      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
};
