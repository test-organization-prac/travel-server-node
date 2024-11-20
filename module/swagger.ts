let swaggerUi;
let specs;

if (process.env.ENABLE_SWAGGER === "true") {
  const swaggerJsdoc = require("swagger-jsdoc");
  swaggerUi = require("swagger-ui-express");

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Ripple Trip Test API",
        version: "1.0.0",
        description: "Ripple Trip test API with express",
      },
      servers: [
        {
          url: process.env.API_SERVER_URL || "http://localhost:8000",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {},
      },
    },
    apis: ["./router/*.ts"],
  };

  specs = swaggerJsdoc(options);
}

module.exports = {
  swaggerUi,
  specs,
};
