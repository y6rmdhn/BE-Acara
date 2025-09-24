import dotenv from "dotenv";
dotenv.config();

export const DATABASE_URL: string = process.env.DB_URI || "";
export const SECRET: string = process.env.SECRET || "";
