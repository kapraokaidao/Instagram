import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { ConfigService } from "@nestjs/config";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";
import * as AWS from "aws-sdk";

@Injectable()
export class DynamoRepository<T> {
  protected readonly db;
  protected readonly documentClient;

  constructor(
    private configService: ConfigService,
    @Inject("tableName") protected readonly tableName: string
  ) {
    const options: ServiceConfigurationOptions = {
      region: this.configService.get<string>("dynamoDB.region"),
      endpoint: this.configService.get<string>("dynamoDB.endpoint"),
      accessKeyId: this.configService.get<string>("dynamoDB.accessKeyId"),
      secretAccessKey: this.configService.get<string>("dynamoDB.secretAccessKey"),
    };
    AWS.config.update(options);
    this.db = new AWS.DynamoDB();
    this.documentClient = new AWS.DynamoDB.DocumentClient();
  }

  getDB() {
    return this.db;
  }

  getDocumentClient() {
    return this.documentClient;
  }

  getTableName(): string {
    return this.tableName;
  }

  async findAll(): Promise<T[]> {
    const params = {
      TableName: this.tableName,
    };
    const result = await this.documentClient.scan(params).promise();
    if (!result) return [];
    const { Items } = result;
    return Items;
  }

  async findById(value: string): Promise<T> {
    const queryParams = {
      TableName: this.tableName,
      Key: {
        _id: value,
      },
    };
    const { Item } = await this.documentClient.get(queryParams).promise();
    return Item || null;
  }

  async findOneBySingleField(field: string, value: any): Promise<T> {
    const queryParams = {
      TableName: this.tableName,
      FilterExpression: "#field = :value",
      ExpressionAttributeNames: {
        "#field": field,
      },
      ExpressionAttributeValues: {
        ":value": value,
      },
    };
    const result = await this.documentClient.scan(queryParams).promise();
    if (!result) return null;
    const { Items } = result;
    return Items[0];
  }

  async put(data: T): Promise<T> {
    const itemId = uuidv4();
    const params = {
      TableName: this.tableName,
      Item: {
        ...data,
        _id: itemId,
      },
    };
    await this.documentClient.put(params).promise();
    const newItem = await this.findById(itemId);
    return newItem;
  }

  async update(_id: string, data: T | any): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        _id,
      },
      UpdateExpression: this.generateUpdateExpression(data),
      ExpressionAttributeValues: this.generateUpdateAttributes(data),
      ReturnValues: "UPDATED_NEW",
    };
    await this.documentClient.update(params).promise();
  }

  generateUpdateExpression(dto): string {
    const keys = Object.keys(dto).filter(key => key !== "_id");
    const expr = keys.map(key => ` ${key} = :${key}`);
    return "set" + expr;
  }

  generateUpdateAttributes(dto) {
    const keys = Object.keys(dto).filter(key => key !== "_id");
    const attr = {};
    keys.forEach(key => {
      attr[`:${key}`] = dto[key];
    });
    return attr;
  }
}
