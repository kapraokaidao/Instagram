import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { PostService } from "src/post/post.service";
import { PostModule } from "src/post/post.module";
import { PostRepository } from "src/post/post.repository";

@Module({
  imports: [PostModule],
  providers: [
    UserService,
    UserRepository,
    { provide: "tableName", useValue: "ig-user" },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
