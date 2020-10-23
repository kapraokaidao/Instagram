import { Module } from "@nestjs/common";
import { InteractionController } from "./interaction.controller";
import { PostService } from "../post/post.service";

@Module({
  controllers: [InteractionController],
  providers: [
    PostService,
  ],
})
export class PostModule {}
