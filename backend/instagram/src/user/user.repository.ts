import { DynamoRepository } from "../dynamo/dynamo.repository";
import { UserModel, UserDto } from "../model/user.model";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserRepository extends DynamoRepository<UserModel> {
  constructor(
    configService: ConfigService,
    @Inject("tableName") tableName: string
  ) {
    super(configService, tableName);
  }

  async findByUsername(username: string): Promise<UserDto> {
    const result = await this.getUserWithPassword(username);
    if (!result) {
      return null;
    }
    const { password, ...user } = result;
    return user;
  }

  async getUserWithPassword(username: string): Promise<UserModel> {
    return this.findOneBySingleField("username", username);
  }
}
