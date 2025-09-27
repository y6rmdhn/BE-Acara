import { type Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger-output.json" with { type: "json" };
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function docs(app: Express) {

    console.log("Attempting to set up Swagger docs...");
  // Check if the swaggerOutput JSON was loaded.
  // If this logs 'undefined', the file path is wrong or the file is empty!
  console.log("Swagger JSON loaded:", swaggerOutput ? "Yes" : "No, it is undefined!");
  // --- END DEBUGGING ---

  const css = fs.readFileSync(
    path.resolve(
      __dirname,
      "../../node_modules/swagger-ui-dist/swagger-ui.css"
    ),
    "utf-8"
  );

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerOutput, {
      customCss: css,
    })
  );
}
