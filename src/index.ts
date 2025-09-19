import express from "express";
import dotenv from "dotenv";
import router from "./routes/api.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
