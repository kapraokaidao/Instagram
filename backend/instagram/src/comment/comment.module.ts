import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { PostService } from "../post/post.service";

@Module({
  controllers: [CommentController],
  providers: [
  ],
})
export class PostModule {}
