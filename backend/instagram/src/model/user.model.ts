import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  _id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  bio?: string;
}

export class User extends UserDto {
  @ApiProperty()
  password?: string;
}

export class UpdateBioDto {
  @ApiProperty()
  bio: string;
}
