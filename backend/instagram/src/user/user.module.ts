import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { PostService } from "src/post/post.service";

@Module({
  providers: [
    UserService,
    UserRepository,
    PostService,
    { provide: "tableName", useValue: "ig-user" },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
