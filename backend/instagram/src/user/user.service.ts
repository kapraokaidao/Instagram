import { Injectable } from "@nestjs/common";
import { UpdateBioDto, User, UserDto } from "../model/user.model";
import { UserRepository } from "./user.repository";
import { hashSync } from "bcryptjs";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    return this.toUserDto(user);
  }

  async findByUsername(username: string): Promise<UserDto> {
    return this.userRepository.findByUsername(username);
  }

  async getUserWithPassword(username: string): Promise<User> {
    return this.userRepository.getUserWithPassword(username);
  }

  async create({ password, ...userDto }: User): Promise<boolean> {
    password = hashSync(password, 12);
    return this.userRepository.put({ ...userDto, password });
  }

  async updateBio(userId: string, bio: UpdateBioDto): Promise<boolean> {
    return this.userRepository.update(userId, bio);
  }

  toUserDto(user: User) {
    return {
      _id: user._id,
      username: user.username,
      bio: user.bio,
    };
  }
}
