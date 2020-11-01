import { DynamoRepository } from "../dynamo/dynamo.repository";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PostModel } from "src/model/post.model";
import { S3Service } from "src/s3/s3.service";
import { UserDto } from "src/model/user.model";
import { CommentModel } from "src/model/comment.model";
import { table } from "console";

@Injectable()
export class CommentRepository extends DynamoRepository<CommentModel> {
  constructor(
    configService: ConfigService,
    @Inject("tableName") tableName: string,
    private readonly s3Service: S3Service
  ) {
    super(configService, tableName);
  }

  async createComment(
    postId: string,
    userId: string,
    message: string
  ): Promise<CommentModel> {
    const now = new Date();
    const comment: CommentModel = {
      _id: "",
      _pid: postId, // user id , owner of comment
      userId: userId,
      message: message,
      createdDate: now.getTime(),
      updatedDate: now.getTime(),
    };
    return this.put(comment);
  }

  async deleteComment(commentId: string) {
    // throw new Error("Delete Post Method not implemented.");
    this.delete(commentId);
  }

  async deleteCommentByPostId(pid: string, cids: string[]): Promise<void> {
    if (cids.length === 0) {
      return;
    }
    const params = {
      RequestItems: {
        /* required */
        [this.tableName]: cids.map(cid => ({
          DeleteRequest: { Key: { _id: cid } },
        })),
      },
    };
    await this.documentClient.batchWrite(params).promise();
  }

  async updateComment(commentId: string, msg: string) {
    const now = new Date();
    await this.update(commentId, { message: msg, updatedDate: now.getTime() });
  }

  async findCommentById(commentId: string) {
    return await this.findById(commentId);
  }

  async findCommentByPost(postId: string): Promise<CommentModel[]> {
    const params = {
      TableName: this.tableName,
      FilterExpression: "#pid = :pid",
      ExpressionAttributeNames: {
        "#pid": "_pid",
      },
      ExpressionAttributeValues: {
        ":pid": postId,
      },
    };
    const result = await this.documentClient.scan(params).promise();
    if (!result) return [];
    const { Items } = result;
    return Items;
  }
}
