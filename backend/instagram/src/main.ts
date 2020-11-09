import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { Express } from "express";
import { ExpressAdapter } from "@nestjs/platform-express";
import { INestApplication } from "@nestjs/common";
import { eventContext } from "aws-serverless-express/middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Instagram")
    .setVersion("0.1")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}

// bootstrap();

export async function createApp(expressApp: Express): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.enableCors();
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  app.use(eventContext());

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Instagram")
    .setVersion("0.1")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  return app;
}
