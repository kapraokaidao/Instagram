import { forwardRef, Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { CommentRepository } from "./comment.repository";
import { PostModule } from "src/post/post.module";

@Module({
  imports: [forwardRef(() => PostModule)],
  controllers: [CommentController],
  providers: [
    CommentRepository,
    CommentService,
    { provide: "tableName", useValue: "ig-comment" },
  ],
  exports: [CommentService],
})
export class CommentModule {}
