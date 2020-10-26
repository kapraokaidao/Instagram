import { DynamoRepository } from "../dynamo/dynamo.repository";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PostModel } from "src/model/post.model";
import { S3Service } from "src/s3/s3.service";
import { UserDto } from "src/model/user.model";

@Injectable()
export class PostRepository extends DynamoRepository<PostModel> {
  constructor(
    configService: ConfigService,
    @Inject("tableName") tableName: string,
    private readonly s3Service: S3Service
  ) {
    super(configService, tableName);
  }

  async createPost(user: UserDto, image) {
    const now = new Date();
    const post: PostModel = {
      _id: "",
      _uid: user._id,
      owner: user,
      caption: "",
      imageUrl: "",
      likes: 0,
      likedBy: [],
      createdDate: now.getTime(),
      updatedDate: now.getTime(),
    };
    const newPost = await this.put(post);
    const postPath = `user_${user._id}/posts/${newPost._id}.jpg`;
    const postImgUrl = await this.s3Service.uploadImage(image, postPath);
    await this.update(newPost._id, { imageUrl: postImgUrl });
    return this.findById(newPost._id);
  }

  async findByuserId(userId: string): Promise<PostModel[]> {
    const params = {
      TableName: this.tableName,
      FilterExpression: "#uid = :uid",
      ExpressionAttributeNames: {
        "#uid": "_uid",
      },
      ExpressionAttributeValues: {
        ":uid": userId,
      },
    };
    const result = await this.documentClient.scan(params).promise();
    if (!result) return [];
    const { Items } = result;
    return Items;
  }

  async findOtheruserId(userId: string, limit: number): Promise<PostModel[]> {
    const params = {
      TableName: this.tableName,
      FilterExpression: "#uid <> :uid",
      ExpressionAttributeNames: {
        "#uid": "_uid",
      },
      ExpressionAttributeValues: {
        ":uid": userId,
      },
      Limit : limit,
    };
    const result = await this.documentClient.scan(params).promise();
    if (!result) return [];
    const { Items } = result;
    return Items;
  }
}
