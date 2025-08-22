"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_fastify = __toESM(require("fastify"), 1);
var app = (0, import_fastify.default)();
var app_default = app;

// src/env/index.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_zod = require("zod");
import_dotenv.default.config();
var envSchema = import_zod.z.object({
  PORT: import_zod.z.string().default("3333"),
  NODE_ENV: import_zod.z.enum(["development", "test", "production"]).default("development")
});
var env = envSchema.safeParse(process.env);
if (!env.success) {
  console.error("Invalid environment variables:", env.error.format());
  process.exit(1);
}
console.log("Environment variables loaded successfully");
var env_default = env.data;

// src/server.ts
app_default.get("/", (request, reply) => {
  return reply.send("Hello World");
});
app_default.listen({
  port: Number(env_default.PORT),
  host: "0.0.0.0"
}).then(() => {
  console.log("\u{1F60A} HTTP server running on http://localhost:3333");
});
