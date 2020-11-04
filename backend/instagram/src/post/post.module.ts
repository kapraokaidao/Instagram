import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PostRepository } from "./post.repository";
import { CommentModule } from "src/comment/comment.module";

@Module({
  imports: [CommentModule],
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository,
    { provide: "tableName", useValue: "ig-post" },
  ],
  exports: [PostService],
})
export class PostModule {}
