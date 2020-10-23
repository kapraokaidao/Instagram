import {
  UserState,
  UserGetters,
  UserMutations,
  UserActions
} from "@/types/user";
import { User } from "@/types/user";
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
  StoreOptions
} from "vuex";

import axios from "axios";
import { AuthActions, AuthMutations } from "@/types/auth";
import { RootState, rootState } from "@/store/modules/index";
import { cloneDeep } from "lodash";

const state: UserState = {
  ...cloneDeep(rootState),
  user: null
};

const getters: GetterTree<UserState, RootState> = {
  // [UserGetters.getUsers]: state => state.user
};

const mutations: MutationTree<UserState> = {
  [UserMutations.fetching]: (state, loading) => {
    state.isLoading = loading;
  },
  [UserMutations.setUser]: (state: UserState, user: User) => {
    state.user = user;
  }
};

const actions: ActionTree<UserState, RootState> = {
  [UserActions.fetchUser]: async ({ commit, dispatch }) => {
    commit(UserMutations.fetching, true);
    try {
      const { data } = await axios.get("/user/me");
      commit(UserMutations.setUser, data);
    } catch {
      await dispatch(AuthActions.logout, {}, { root: true });
    }
    commit(UserMutations.fetching, false);
  },
  [UserActions.updateProfile]: async ({ commit }, data: Partial<User>) => {
    try {
      await axios.put(`/user/me`, data);
    } catch (e) {
      console.error(e);
    }
  },
  [UserActions.uploadImage]: async ({ commit, dispatch }, formData) => {
    console.log(formData);
    try {
      await axios.post("/user/me/image", formData);
      await dispatch(UserActions.fetchUser);
    } catch (e) {
      console.error(e);
    }
  }
};

const UserModule: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default UserModule;
