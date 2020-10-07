import { Global, Module } from "@nestjs/common";
import { DynamoRepository } from "./dynamo.repository";

@Global()
@Module({
  imports: [],
  providers: [
    DynamoRepository,
    { provide: "tableName", useValue: "" },
  ],
})
export class DynamoModule {}
