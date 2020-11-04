import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserModel } from "./user.model";

export class CommentModel {
  _id: string; // comment id

  @ApiProperty({ type: "string", default: "" })
  _pid: string; // user id , owner of comment

  // @ApiProperty({ type: "string", default: "" })
  userId: string;

  @ApiProperty({ type: "string", default: "" })
  message: string;
  // likedBy: string[]; // arr of user id who liked the comment

  createdDate: number;

  updatedDate: number;
}
