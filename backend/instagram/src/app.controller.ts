import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { PublicAPI } from "./decorators/public-api.decorator";

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @PublicAPI()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
