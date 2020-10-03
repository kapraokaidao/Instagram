import { User } from "../types/user";

export interface AuthState {
  fetchingLogin: boolean;
  error: boolean;
  token: string | null;
  user: User | null;
  errorMessage: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  password: string;
  email: string;
}

export enum AuthGetters {
  isLogin = "isLogin",
  isFetchingLogin = "isFetchingLogin",
  getUser = "getUser",
  getError = "getError",
  getErrorMessage = "getErrorMessage"
}

export enum AuthMutations {
  setToken = "setToken",
  setFetchingLogin = "setFetchingLogin",
  setError = "setError",
  setUser = "setUser",
  setErrorMessage = "serErrorMessage"
}

export enum AuthActions {
  login = "login",
  logout = "logout",
  signUp = "signUp",
  redirect = "redirect",
  setAxiosHeader = "setAxiosHeader",
  protectedRedirect = "protectedRedirect"
}
