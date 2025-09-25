import express from "express";
import dotenv from "dotenv";
import router from "./routes/api.js";
import bodyParser from "body-parser";
import db from "./utils/database.js";

async function init() {
  try {
    const result = await db();

    console.log(result);

    dotenv.config();

    const app = express();

    app.use(bodyParser.json());

    const PORT = process.env.PORT;

    app.get("/", (req, res) => {
      res.send("Welcome to BE-Acara API 🎉");
    });

    app.use("/api", router);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
