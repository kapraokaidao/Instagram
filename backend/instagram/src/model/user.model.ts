import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  _id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  displayName?: string;
}

export class User extends UserDto {
  @ApiProperty()
  password: string;
}
