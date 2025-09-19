import express from "express";
import dotenv from "dotenv";
import router from "./routes/api.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT;

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
