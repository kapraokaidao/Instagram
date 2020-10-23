import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
  private readonly s3;

  constructor(private configService: ConfigService) {
    const options: ServiceConfigurationOptions = {
      region: this.configService.get<string>("s3.region"),
      endpoint: this.configService.get<string>("s3.endpoint"),
      accessKeyId: this.configService.get<string>("s3.accessKeyId"),
      secretAccessKey: this.configService.get<string>("s3.secretAccessKey"),
    };
    AWS.config.update(options);
    this.s3 = new AWS.S3();
    console.log(this.s3);
  }

  async uploadImage(file, name) {
    const params = {
      Bucket: "ig-image",
      Key: name,
      Body: file.buffer,
    };
    const { Location } = await this.s3.upload(params).promise();
    return Location;
  }
}
