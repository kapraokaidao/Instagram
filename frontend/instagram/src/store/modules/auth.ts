import {
  AuthState,
  LoginCredentials,
  SignUpCredentials,
  AuthActions,
  AuthMutations,
  AuthGetters
} from "@/types/auth";
import { cloneDeep } from "lodash";
import { User } from "@/types/user";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import router from "../../router";
import axios from "axios";
import { RootState, rootState } from "@/store/modules/index";

const state: AuthState = {
  ...cloneDeep(rootState),
  token: null,
  user: null
};

const getters: GetterTree<AuthState, RootState> = {
  [AuthGetters.isLogin]: state => !!state.token,
  [AuthGetters.getUser]: state => state.user,
  [AuthGetters.isLoading]: state => state.isLoading,
  [AuthGetters.getError]: state => state.isError,
  [AuthGetters.getErrorData]: state => state.errorData
};

const mutations: MutationTree<AuthState> = {
  [AuthMutations.setToken]: (state, payload: string) => {
    state.token = payload;
  },
  [AuthMutations.setLoading]: (state, payload: boolean) => {
    state.isLoading = payload;
  },
  [AuthMutations.setError]: (state, payload: boolean) => {
    state.isError = payload;
  },
  [AuthMutations.setErrorData]: (state, payload: string) => {
    state.errorData = payload;
  },
  [AuthMutations.setUser]: (state, payload: User) => {
    state.user = payload;
  }
};

const actions: ActionTree<AuthState, any> = {
  [AuthActions.login]: async (
    { commit, dispatch },
    payload: LoginCredentials
  ) => {
    commit(AuthMutations.setLoading, true);
    try {
      const response = await axios.post<string>("/auth/login", payload);
      if (response.status === 201) {
        commit(AuthMutations.setToken, response.data);
        dispatch(AuthActions.setAxiosHeader);
        commit(AuthMutations.setError, false);
        dispatch(AuthActions.redirect);
      } else {
        commit(AuthMutations.setError, true);
      }
    } catch (error) {
      commit(AuthMutations.setError, true);
      if (error.toString().includes("401")) {
        commit(AuthMutations.setErrorData, "username or password is wrong");
      } else {
        commit(
          AuthMutations.setErrorData,
          "something is wrong with the server"
        );
      }
    }
    commit(AuthMutations.setLoading, false);
  },
  [AuthActions.signUp]: async (
    { commit, dispatch },
    payload: SignUpCredentials
  ) => {
    commit(AuthMutations.setLoading, true);
    let response;
    try {
      response = await axios.post<string>("/auth/register", payload);
      if (response.status === 201) {
        commit(AuthMutations.setToken, response.data);
        dispatch(AuthActions.setAxiosHeader);
        commit(AuthMutations.setError, false);
        dispatch(AuthActions.redirect);
      } else {
        throw new Error();
      }
    } catch (error) {
      commit(AuthMutations.setError, true);

      if (error.toString().includes("400")) {
        commit(AuthMutations.setErrorData, "username is already taken");
      } else if (error.toString().includes("500")) {
        commit(AuthMutations.setErrorData, "email is already taken");
      } else {
        commit(
          AuthMutations.setErrorData,
          "something is wrong with the server"
        );
      }
    }
    commit(AuthMutations.setLoading, false);
  },
  [AuthActions.logout]: async ({ commit }) => {
    commit(AuthMutations.setUser, null);
    commit(AuthMutations.setToken, null);
    router.push("/login");
  },
  [AuthActions.redirect]: async ({ commit }) => {
    const pathTogetUser = "/user/me";
    const response = await axios.get<User>(pathTogetUser);
    if (response.status === 200) {
      commit(AuthMutations.setUser, response.data);
      router.push("/profile");
    }
    commit(AuthMutations.setLoading, false);
  },
  [AuthActions.setAxiosHeader]: ({ state }) => {
    if (state.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    }
  }
};

const AuthModule: Module<AuthState, any> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default AuthModule;
