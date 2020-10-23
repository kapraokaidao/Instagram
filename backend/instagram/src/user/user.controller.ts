import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "../decorators/user.decorator";
import { GetMultipleDto, UpdateBioDto, UserDto } from "../model/user.model";
import { FileUploadDto } from "../model/image.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { S3Service } from "src/s3/s3.service";

@ApiBearerAuth()
@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService, private readonly s3Service: S3Service) {}

  @Get("me")
  me(@User() user: UserDto) {
    return this.userService.findById(user._id);
  }

  @Put("me")
  async updateUser(@User() user: UserDto, @Body() bio: UpdateBioDto): Promise<void> {
    this.userService.updateBio(user._id, bio);
  }

  @Get(":id")
  async findById(@Param(":id") id: string): Promise<UserDto> {
    return this.userService.findById(id);
  }

  @Post("multiple")
  async findMultiple(@Body() body: GetMultipleDto): Promise<UserDto[]> {
    return this.userService.findMultiple(body.ids);
  }

  @Post("me/image")
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: FileUploadDto })
  @UseInterceptors(FileInterceptor("image"))
  async uploadImage(@User() user: UserDto, @UploadedFile() image) {
    const path = `user_${user._id}/profile/profile_image.jpg`;
    const imageUrl = await this.s3Service.uploadImage(image, path);
    return this.userService.updateImageUrl(user._id, imageUrl);
  }
}
