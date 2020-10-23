import { Body, Controller, Param, Post, Put, UploadedFile, UseInterceptors, Get, Query } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { User } from "src/decorators/user.decorator";
import { FileUploadDto } from "src/model/image.model";
import { PostModel, UpdateCaptionDto } from "src/model/post.model";
import { UserDto } from "src/model/user.model";
import { S3Service } from "src/s3/s3.service";
import { paginate } from "src/utils/pagination.utils";
import { PostService } from "./post.service";
import { Page } from "../utils/pagination.utils"

@ApiTags("Post")
@ApiBearerAuth()
@Controller("post")
export class PostController {
  private pageSize = 20;

  constructor(private readonly postService: PostService, private readonly s3Service: S3Service) {}

  @Get()
  async getPosts(@Query('page') page: string): Promise<Page<PostModel>> {
    const posts = await this.postService.findAll();
    if (page) {
      return paginate(posts, parseInt(page), this.pageSize)
    }
    return paginate(posts, 1, posts.length);
  }

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
