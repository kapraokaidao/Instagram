import { ForbiddenException, Injectable } from "@nestjs/common";
import { PostModel, UpdateCaptionDto } from "src/model/post.model";
import { S3Service } from "src/s3/s3.service";
import { CommentRepository } from "./comment.repository";
import { UserDto, UserModel } from "../model/user.model";
import { CommentModel } from "src/model/comment.model";
import { User } from "src/decorators/user.decorator";
import { UserService } from "src/user/user.service";

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository, private readonly s3Service: S3Service, private readonly userService: UserService) {}

  async findComment(postId: string): Promise<CommentModel[]> {
    let comments: CommentModel[] = await this.commentRepository.findCommentByPost(postId);
    comments = await Promise.all ( comments.map( async (comment: CommentModel) => {
      const user : UserModel = await this.userService.findById(comment.userId)
      comment["user"] = user
      return comment
    }) )
    return comments.sort((a, b) => b.updatedDate - a.updatedDate);

  }

  async deleteComment(commentId: string) {
    return this.commentRepository.deleteComment(commentId);
  }

  async deleteCommentByPostId(postId: any) {
    const cms: CommentModel[] = await this.findComment(postId);
    const cids = cms.map((cm: CommentModel) => cm._id);
    return this.commentRepository.deleteCommentByPostId(postId, cids);
  }

  async createComment(postId: string, userId: string, msg: string): Promise<CommentModel> {
    return this.commentRepository.createComment(postId, userId, msg);
  }

  async updateMessage(commentId: string, msg: string): Promise<CommentModel> {
    this.commentRepository.updateComment(commentId, msg);
    return this.commentRepository.findCommentById(commentId);
  }
}
