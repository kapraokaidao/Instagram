import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { S3Service } from "src/s3/s3.service";
import { CommentModel } from "src/model/comment.model";
import { CommentService } from "./comment.service";
import { pid } from "process";
import { PostService } from "src/post/post.service";
import { User } from "src/decorators/user.decorator";
import { UserDto } from "src/model/user.model";

@ApiBearerAuth()
@ApiTags("Comment")
@Controller("comment")
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService,
    private readonly s3Service: S3Service
  ) {}

  // @Get(':pid')
  // async getCommentByPost(@Param("pid") postId : string )

  @Post()
  async createComment(@Body() commentDto: CommentModel, @User() user: UserDto ): Promise<CommentModel> {
    if (commentDto._pid && commentDto.message) {
      if (await this.postService.exists(commentDto._pid)) {
        return this.commentService.createComment(commentDto._pid, user._id, commentDto.message);
      } else {
        throw new BadRequestException("Post Not Found, create comment failure");
      }
    }
  }
  @Delete(":cid")
  async deleteComment(@Param("cid") commentId: string) {
    return this.commentService.deleteComment(commentId);
  }
  @Patch(":cid")
  async updateComment(@Param("cid") commentId: string, @Body() commentDto: CommentModel): Promise<CommentModel> {
    return this.commentService.updateMessage(commentId, commentDto.message);
  }
}
