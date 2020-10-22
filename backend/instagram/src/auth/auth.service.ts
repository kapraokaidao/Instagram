import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { User, UserDto } from "../model/user.model";
import { compareSync } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { AuthCredentialsDto } from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser({ username, password }: AuthCredentialsDto): Promise<UserDto> {
    const user: User = await this.userService.getUserWithPassword(username);
    if (user && compareSync(password, user.password)) {
      const { password, ...userDto } = user;
      return userDto;
    }
    return null;
  }

  async login(credential: AuthCredentialsDto): Promise<{ access_token: string }> {
    const user: UserDto = await this.validateUser(credential);
    if (!user) {
      throw new UnauthorizedException("Wrong username or password");
    }
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async register(user: User): Promise<{ access_token: string }> {
    const existedUser = await this.userService.findByUsername(user.username);
    if (existedUser) {
      throw new BadRequestException("Username already existed");
    }
    await this.userService.create(user);
    return this.login({ username: user.username, password: user.password });
  }
}
