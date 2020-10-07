import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "../decorators/user.decorator";
import { UserDto } from "../model/user.model";

@ApiBearerAuth()
@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  me(@User() user: UserDto) {
    return user;
  }
}
