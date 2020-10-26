import { RootState } from "@/store/modules";
import { Post } from "@/types/post";

export interface User {
  _id: string;
  username: string;
  imageUrl: string;
  bio: string;
}
export interface UserState extends RootState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  user: User | null;
  posts: Post[];
}

export enum UserGetters {
  getUser = "getUser"
}

export enum UserMutations {
  fetching = "fetching",
  success = "success",
  error = "error",
  setUser = "setUser",
  setPosts = "setPosts"
}

export enum UserActions {
  fetchUser = "fetchUser",
  setFetching = "setFetching",
  setSuccess = "setSuccess",
  setError = "setError",
  updateProfile = "updateProfile",
  uploadImage = "uploadImage",
  fetchPosts = "fetchPosts"
}
