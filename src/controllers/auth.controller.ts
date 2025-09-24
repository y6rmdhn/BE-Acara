import { Request, Response } from "express";
import { TLogin, TRegister } from "../types/auth.type";
import schema from "../schemas/auth.shema";
import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";

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

  async login(req: Request, res: Response) {
    console.log(req.body);
    try {
      const { identifier, password } = req.body as unknown as TLogin;

      // validasi identifier
      const userByIdentifier = await UserModel.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });

      if (!userByIdentifier) {
        return res.status(403).json({
          message: "User not found",
          data: null,
        });
      }

      // validasi password
      const validasiPassword: boolean =
        encrypt(password) === userByIdentifier.password;

      if (!validasiPassword) {
        return res.status(403).json({
          message: "User not found",
          data: null,
        });
      }

      res.status(200).json({
        message: "Login success!",
        data: userByIdentifier,
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
