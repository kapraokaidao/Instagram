import { ApiProperty } from "@nestjs/swagger";

export class PostModel {
  _id: string; // post id

  _uid: string; // user id , owner of post

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

export class PostDto {
  @ApiProperty()
  postId : string
}

export class OtherPostDto {
  @ApiProperty()
  limit: number
}