import { Body, Controller, Get, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "../decorators/user.decorator";
import { UpdateBioDto, UserDto } from "../model/user.model";
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
  updateUser(@User() user: UserDto, @Body() bio: UpdateBioDto): Promise<boolean> {
    return this.userService.updateBio(user._id, bio);
  }

  @Post("me/image")
  @UseInterceptors(FileInterceptor("file"))
  async uploadImage(@User() user: UserDto, @UploadedFile() file) {
    const path = `user_${user._id}/profile/profile_image.jpg`;
    const imageUrl = await this.s3Service.uploadImage(file, path);
    return this.userService.updateImageUrl(user._id, imageUrl);
  }
}
