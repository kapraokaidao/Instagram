import {
  AuthState,
  LoginCredentials,
  SignUpCredentials,
  AuthActions,
  AuthMutations,
  AuthGetters
} from "@/types/auth";
import { cloneDeep } from "lodash";
import { User, UserActions } from "@/types/user";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import router from "../../router";
import axios from "axios";
import { RootState, rootState } from "@/store/modules/index";

const state: AuthState = {
  ...cloneDeep(rootState),
  token: null
};

const getters: GetterTree<AuthState, RootState> = {
  [AuthGetters.isLogin]: state => !!state.token,
  [AuthGetters.isLoading]: state => state.isLoading,
  [AuthGetters.getError]: state => state.isError,
  [AuthGetters.getErrorData]: state => state.errorData
};

const mutations: MutationTree<AuthState> = {
  [AuthMutations.setToken]: (state, payload: { access_token: string }) => {
    state.token = payload.access_token;
  },
  [AuthMutations.setLoading]: (state, payload: boolean) => {
    state.isLoading = payload;
  },
  [AuthMutations.setError]: (state, payload: boolean) => {
    state.isError = payload;
  },
  [AuthMutations.setErrorData]: (state, payload: string) => {
    alert(payload);
    state.errorData = payload;
  }
};

const actions: ActionTree<AuthState, any> = {
  [AuthActions.login]: async (
    { commit, dispatch },
    payload: LoginCredentials
  ) => {
    commit(AuthMutations.setLoading, true);
    try {
      const response = await axios.post("/auth/login", payload);
      commit(AuthMutations.setToken, response.data);
      await dispatch(AuthActions.setAxiosHeader);
      router.push({ name: "Profile" });
    } catch (error) {
      commit(AuthMutations.setError, true);
      commit(AuthMutations.setErrorData, error.response.message);
    }
    commit(AuthMutations.setLoading, false);
  },
  [AuthActions.signUp]: async (
    { commit, dispatch },
    payload: SignUpCredentials
  ) => {
    commit(AuthMutations.setLoading, true);
    try {
      const response = await axios.post<string>("/auth/register", payload);
      commit(AuthMutations.setToken, response.data);
      commit(AuthMutations.setError, false);
      await dispatch(AuthActions.setAxiosHeader);
      router.push({ name: "Profile" });
    } catch (error) {
      commit(AuthMutations.setError, true);
      commit(AuthMutations.setErrorData, error.response.message);
    }
    commit(AuthMutations.setLoading, false);
  },
  [AuthActions.logout]: async ({ commit }) => {
    commit(AuthMutations.setToken, null);
    alert("logout");
    router.push({ name: "Login" });
  },
  [AuthActions.redirect]: async ({ commit }) => {
    const response = await axios.get<User>("/user/me");
    if (response.status === 200) {
      commit(AuthMutations.setUser, response.data);
      router.push({ name: "Profile" });
    } else {
      alert("token error");
    }
    commit(AuthMutations.setLoading, false);
  },
  [AuthActions.VerifyToken]: async ({ state, commit, dispatch }) => {
    try {
      if (state.token) {
        await dispatch(AuthActions.setAxiosHeader);
        await dispatch("user/" + UserActions.fetchUser, {}, { root: true });
      } else {
        await dispatch(AuthActions.logout);
      }
    } catch (e) {
      await dispatch(AuthActions.logout);
    }
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
