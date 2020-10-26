import { Body, Controller, Get, Patch, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "../decorators/user.decorator";
import { S3Service } from "src/s3/s3.service";
import { PostService } from "src/post/post.service";
import { UserDto } from "src/model/user.model";

@ApiBearerAuth()
@ApiTags("Comment")
@Controller("comment")
export class CommentController {
  constructor(private readonly postService: PostService, private readonly s3Service: S3Service) {}
}
