import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";

@Module({
  providers: [
    UserService,
    UserRepository,
    { provide: "tableName", useValue: "ig-user" },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
