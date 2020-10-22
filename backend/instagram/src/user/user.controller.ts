import { Body, Controller, Get, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "../decorators/user.decorator";
import { UpdateBioDto, UserDto } from "../model/user.model";

@ApiBearerAuth()
@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  me(@User() user: UserDto) {
    return this.userService.findById(user._id);
  }

  @Put("me")
  updateUser(@User() user: UserDto, @Body() bio: UpdateBioDto): Promise<boolean> {
    return this.userService.updateBio(user._id, bio);
  }
}
