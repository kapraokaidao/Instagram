import { User } from "@/types/user";

export interface Post {
  _id: string; // post id
  _uid: string; // user id , owner of post
  owner: User;
  caption: string; // changable
  imageUrl: string; // cannot be changed
  likes: number;
  likedBy: string[]; // arr of user id who liked the post
  createdDate: number;
  updatedDate: number;
}

export interface PostState {
  timelinePosts: Post[],
}

export enum PostActions {
  fetchTimelinePosts = "fetchTimelinePosts",
  createPost = "createPost"
}

export enum PostMutations {
  setTimelinePosts = "setTimelinePosts",
}