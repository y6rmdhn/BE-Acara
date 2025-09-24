import mongoose from "mongoose";
import { IUser } from "../types/auth.type";
import { encrypt } from "../utils/encryption";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUser>(
  {
    fullname: { type: Schema.Types.String, required: true },
    username: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    password: { type: Schema.Types.String, required: true },
    role: {
      type: Schema.Types.String,
      enum: ["user", "admin"],
      default: "user",
    },
    profilePicture: { type: Schema.Types.String, default: "user.jpg" },
    isActive: { type: Schema.Types.Boolean, default: false },
    activationCode: { type: Schema.Types.String },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;

  user.password = encrypt(user.password);

  next();
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
