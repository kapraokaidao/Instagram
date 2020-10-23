import { Body, Controller, Get, Patch, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { S3Service } from "src/s3/s3.service";
import { PostService } from "src/post/post.service";

@ApiBearerAuth()
@ApiTags("Comment")
@Controller("comment")
export class CommentController {
  constructor(private readonly postService: PostService, private readonly s3Service: S3Service) {}
}
