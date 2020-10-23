import { ApiProperty } from "@nestjs/swagger";

export class PostModel {
  _id: string; // post id

  _uid: string; // user id , owner of post

  caption: string;

  imageUrl: string;

  likes: number;

  likedBy: string[]; // arr of user id who liked post
}

export class UpdateCaptionDto {
  @ApiProperty()
  caption: string;
}
