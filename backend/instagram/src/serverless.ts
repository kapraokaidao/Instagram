import { Server } from "http";
import { Context } from "aws-lambda";
import { createServer, proxy, Response } from "aws-serverless-express";
import * as express from "express";
import { createApp } from "./main";

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
  const expressApp = express();

  const app = await createApp(expressApp);
  await app.init();

  return createServer(expressApp);
}

export async function handler(event: any, context: Context): Promise<Response> {
  if (event.path === "/api") {
    event.path = "/api/";
  }
  if (event.path.includes("swagger-ui") && event.path.substr(0, 4) !== "/api") {
    event.path = `/api${event.path}`;
  }
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return proxy(cachedServer, event, context, "PROMISE").promise;
}
