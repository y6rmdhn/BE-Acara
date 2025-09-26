import swaggerAutogen from "swagger-autogen";

const docs = {
  info: {
    version: "v0.0.1",
    title: "Acara API",
    description: "Dokumentasi API ACARA",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local API",
    },
    {
      url: "https://be-acara-lilac.vercel.app/",
      description: "Deployment API",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "Firaaa11",
        password: "password123",
      },
    },
  },
};

const outputFile = "./src/docs/swagger-output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, docs);
