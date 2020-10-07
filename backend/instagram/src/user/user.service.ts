import { Injectable } from "@nestjs/common";
import { User, UserDto } from "../model/user.model";
import { UserRepository } from "./user.repository";
import { hashSync } from "bcryptjs";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  async findByUsername(username: string): Promise<UserDto> {
    return this.userRepository.findByUsername(username);
  }

  async getUserWithPassword(username: string): Promise<User> {
    return this.userRepository.getUserWithPassword(username);
  }

  async create({ password, ...userDto }: User): Promise<User> {
    password = hashSync(password, 12);
    return this.userRepository.put({ ...userDto, password });
  }
}
