import schema from "../schemas/auth.shema.js";
import UserModel from "../models/user.model.js";
import { encrypt } from "../utils/encryption.js";
import { generatetoken } from "../utils/jwt.js";
import type { Request, Response } from "express";
import type { TLogin, TRegister } from "../types/auth.type.js";
import type { IReqUser } from "../middleware/auth.middleware.js";

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

      const token = generatetoken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      res.status(200).json({
        message: "Login success!",
        data: token,
      });
    } catch (error) {
      const err = error as unknown as Error;

      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  async me(req: IReqUser, res: Response) {
    try {
      const user = req.user;

      const result = await UserModel.findById(user?.id);

      res.status(200).json({
        message: "Get user success!",
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
