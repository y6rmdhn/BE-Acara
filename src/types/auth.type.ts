type TRegister = {
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
};

type TLogin = {
  identifier: string;
  password: string;
};

interface IUser {
  fullname: string;
  username: string;
  password: string;
  email: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
}

export { TRegister, IUser, TLogin };
