import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./user.model";

export class PostModel {
  _id: string; // post id
  _uid: string; // user id , owner of post
  owner: UserDto;
  caption: string; // changable
  imageUrl: string; // cannot be changed
  likes: number;
  likedBy: string[]; // arr of user id who liked the post
  createdDate: number;
  updatedDate: number;
}

export class UpdateCaptionDto {
  @ApiProperty()
  caption: string;
}
