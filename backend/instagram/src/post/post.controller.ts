import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
  Patch,
  Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from "@nestjs/swagger";
import { User } from "src/decorators/user.decorator";
import { FileUploadDto } from "src/model/image.model";
import { PostModel, UpdateCaptionDto } from "src/model/post.model";
import { UserDto } from "src/model/user.model";
import { S3Service } from "src/s3/s3.service";
import { paginate } from "src/utils/pagination.utils";
import { PostService } from "./post.service";
import { Page } from "../utils/pagination.utils";
import { CommentService } from "src/comment/comment.service";
import { CommentModel } from "src/model/comment.model";

@ApiTags("Post")
@ApiBearerAuth()
@Controller("post")
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly s3Service: S3Service
  ) {}

  @Get()
  @ApiQuery({ name: "page", schema: { type: "integer" }, required: false })
  @ApiQuery({ name: "pageSize", schema: { type: "integer" }, required: false })
  async getPosts(@Query("page") page: string, @Query("pageSize") pageSize: string): Promise<Page<PostModel>> {
    const posts = await this.postService.findAll();
    if (page) {
      const size = pageSize ? parseInt(pageSize) : 20;
      return paginate(posts, parseInt(page), size);
    }
    return paginate(posts, 1, posts.length);
  }

  @Get("me")
  async findOwnedPost(@User() user: UserDto): Promise<PostModel[]> {
    const posts: PostModel[] = await this.postService.findByUserId(user._id);
    return this.populatePosts(posts);
  }

  @Get("other")
  @ApiQuery({ name: "limit", schema: { type: "integer" }, required: true })
  async findOtherPost(@User() user: UserDto, @Query("limit") limit: string): Promise<PostModel[]> {
    let posts: PostModel[];
    if (limit) {
      posts = await this.postService.findOtherUserId(user._id, parseInt(limit));
    }
    posts = await this.postService.findOtherUserId(user._id, 1000);
    return this.populatePosts(posts);
  }

  async populatePosts(posts: PostModel[]): Promise<PostModel[]> {
    return Promise.all(
      posts.map(async (post: PostModel) => {
        let comments: CommentModel[] = await this.commentService.findComment(post._id);
        post["comments"] = comments;
        return post;
      })
    );
  }

  @Get("user/:uid")
  async findByUserId(@Param("uid") userId: string): Promise<PostModel[]> {
    return this.postService.findByUserId(userId);
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: FileUploadDto })
  @UseInterceptors(FileInterceptor("image"))
  async createPost(@User() user: UserDto, @UploadedFile() image) {
    return this.postService.createPost(user, image);
  }

  @Put(":id")
  async updateCaption(
    @Param("id") postId: string,
    @User() user: UserDto,
    @Body() body: UpdateCaptionDto
  ): Promise<void> {
    this.postService.updateCaption(postId, user._id, body);
  }

  @Delete(":pid")
  async deletePost(@Param("pid") pid: string, @User() user: UserDto) {
    await this.postService.deletePost(pid, user._id);
    await this.commentService.deleteCommentByPostId(pid);
    await this.s3Service.deleteImage(`user_${user._id}/posts/${pid}.jpg`);
  }

  @Post(":id/like")
  toggleLike(@User() user: UserDto, @Param("id") postId: string): Promise<number> {
    return this.postService.toggleLike(postId, user._id);
  }

  @Get(":pid/comment")
  async findComment(@Param("pid") postId: string): Promise<CommentModel[]> {
    return this.commentService.findComment(postId);
  }
}
