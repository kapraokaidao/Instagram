import { Body, Controller, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { User } from "src/decorators/user.decorator";
import { FileUploadDto } from "src/model/image.model";
import { UpdateCaptionDto } from "src/model/post.model";
import { UserDto } from "src/model/user.model";
import { S3Service } from "src/s3/s3.service";
import { PostService } from "./post.service";

@ApiTags("Post")
@ApiBearerAuth()
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService, private readonly s3Service: S3Service) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: FileUploadDto })
  @UseInterceptors(FileInterceptor("image"))
  async createPost(@User() user: UserDto, @UploadedFile() image) {
    return this.postService.createPost(user._id, image);
  }

  @Put(":id")
  async updateCaption(
    @Param("id") postId: string,
    @User() user: UserDto,
    @Body() body: UpdateCaptionDto
  ): Promise<boolean> {
    return this.postService.updateCaption(postId, user._id, body);
  }
}
