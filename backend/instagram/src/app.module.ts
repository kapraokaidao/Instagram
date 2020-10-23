import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DynamoModule } from "./dynamo/dynamo.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { S3Module } from "./s3/s3.module";
import { PostModule } from "./post/post.module";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === "production",
      load: [configuration],
      isGlobal: true,
    }),
    DynamoModule,
    UserModule,
    AuthModule,
    S3Module,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
