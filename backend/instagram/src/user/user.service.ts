import { Injectable } from "@nestjs/common";
import { UpdateBioDto, UserModel, UserDto } from "../model/user.model";
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

  async findMultiple(ids: string[]): Promise<UserDto[]> {
    const users = await Promise.all(
      ids.map(async id => {
        try {
          const user = await this.findById(id);
          return user;
        } catch (e) {
          return null;
        }
      })
    );
    return users.filter(user => user !== null);
  }

  async getUserWithPassword(username: string): Promise<UserModel> {
    return this.userRepository.getUserWithPassword(username);
  }

  async create({ password, ...userDto }: UserModel): Promise<UserDto> {
    password = hashSync(password, 12);
    const newUser = await this.userRepository.put({ ...userDto, password });
    return this.toUserDto(newUser);
  }

  async updateBio(userId: string, bio: UpdateBioDto): Promise<void> {
    this.userRepository.update(userId, bio);
  }

  async updateImageUrl(userId: string, imageUrl: string): Promise<void> {
    this.userRepository.update(userId, { imageUrl });
  }

  toUserDto(user: UserModel) {
    return {
      _id: user._id,
      username: user.username,
      bio: user.bio,
      imageUrl: user.imageUrl,
    };
  }
}
