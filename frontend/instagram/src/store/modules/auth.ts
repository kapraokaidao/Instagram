import {
  AuthState,
  LoginCredentials,
  SignUpCredentials,
  AuthActions,
  AuthMutations,
  AuthGetters
} from "@/types/auth";
import { User } from "@/types/user";
import { StoreOptions } from "vuex";
import router from "../../router";
import axios from "axios";

const store: StoreOptions<AuthState> = {
  state: {
    fetchingLogin: false,
    error: false,
    token: null,
    user: null,
    errorMessage: ""
  },
  getters: {
    [AuthGetters.isLogin]: state => !!state.token,
    [AuthGetters.getUser]: state => state.user,
    [AuthGetters.isFetchingLogin]: state => state.fetchingLogin,
    [AuthGetters.getError]: state => state.error,
    [AuthGetters.getErrorMessage]: state => state.errorMessage
  },
  mutations: {
    [AuthMutations.setToken]: (state, payload: string) => {
      state.token = payload;
    },
    [AuthMutations.setFetchingLogin]: (state, payload: boolean) => {
      state.fetchingLogin = payload;
    },
    [AuthMutations.setError]: (state, payload: boolean) => {
      state.error = payload;
    },
    [AuthMutations.setErrorMessage]: (state, payload: string) => {
      state.errorMessage = payload;
    },
    [AuthMutations.setUser]: (state, payload: User) => {
      state.user = payload;
    }
  },
  actions: {
    [AuthActions.login]: async (
      { commit, dispatch },
      payload: LoginCredentials
    ) => {
      commit(AuthMutations.setFetchingLogin, true);
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
          commit(
            AuthMutations.setErrorMessage,
            "username or password is wrong"
          );
        } else {
          commit(
            AuthMutations.setErrorMessage,
            "something is wrong with the server"
          );
        }
      }
      commit(AuthMutations.setFetchingLogin, false);
    },
    [AuthActions.signUp]: async (
      { commit, dispatch },
      payload: SignUpCredentials
    ) => {
      commit(AuthMutations.setFetchingLogin, true);
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
          commit(AuthMutations.setErrorMessage, "username is already taken");
        } else if (error.toString().includes("500")) {
          commit(AuthMutations.setErrorMessage, "email is already taken");
        } else {
          commit(
            AuthMutations.setErrorMessage,
            "something is wrong with the server"
          );
        }
      }
      commit(AuthMutations.setFetchingLogin, false);
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
      commit(AuthMutations.setFetchingLogin, false);
    },
    [AuthActions.setAxiosHeader]: ({ state }) => {
      if (state.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${state.token}`;
      }
    }
  }
};
export default store;

// to get state in store
// this.$store.state.search.transcribeMessage;

// to dispatch
// this.$store.dispatch('search/start')
