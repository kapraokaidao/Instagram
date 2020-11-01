import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
  private s3;

  constructor(private configService: ConfigService) {}

  initS3() {
    const options: ServiceConfigurationOptions = {
      region: this.configService.get<string>("s3.region"),
      endpoint: this.configService.get<string>("s3.endpoint"),
      accessKeyId: this.configService.get<string>("s3.accessKeyId"),
      secretAccessKey: this.configService.get<string>("s3.secretAccessKey"),
    };
    AWS.config.update(options);
    this.s3 = new AWS.S3();
  }

  async uploadImage(file, path): Promise<string> {
    this.initS3();
    const params = {
      Bucket: "ig-image",
      Key: path,
      Body: file.buffer,
    };
    const { Location } = await this.s3.upload(params).promise();
    return Location;
  }

  async deleteImage(path) {
    this.initS3();
    const params = {
      Bucket: "ig-image",
      Key: path,
    };
    await this.s3.deleteObject(params).promise();
  }
}
