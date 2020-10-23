import { User } from "../types/user";
import { RootState } from "@/store/modules";

export interface AuthState extends RootState {
  token: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  password: string;
}

export enum AuthGetters {
  isLogin = "isLogin",
  isLoading = "isLoading",
  getUser = "getUser",
  getError = "getError",
  getErrorData = "getErrorData"
}

export enum AuthMutations {
  setToken = "setToken",
  setLoading = "setLoading",
  setError = "setError",
  setUser = "setUser",
  setErrorData = "setErrorData"
}

export enum AuthActions {
  login = "login",
  logout = "logout",
  signUp = "signUp",
  redirect = "redirect",
  setAxiosHeader = "setAxiosHeader",
  protectedRedirect = "protectedRedirect",
  VerifyToken = "VerifyToken"
}
