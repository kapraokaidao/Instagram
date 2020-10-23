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
import { AuthMutations } from "@/types/auth";
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
  [UserMutations.setUser]: (state: UserState, user: User) => {
    state.user = user;
  }
};

const actions: ActionTree<UserState, RootState> = {
  [UserActions.fetchUser]: async ({ commit, getters }) => {
    if (getters.getUser) {
      try {
        // Get /user
        const response = await axios.get("/user");
        const responseData: User = response.data;
        commit(UserMutations.setUser, responseData);
      } catch {
        // TODO show error user fetching failed
      }
    }
  },
  [UserActions.updateProfile]: async (
    { commit },
    updatedProfile: Partial<User> | User
  ) => {
    try {
      // Patch /user/:id/updateProfile
      const response = await axios.patch(
        `/user/${updatedProfile._id}/updateProfile`
      );
      if (response.status === 200) {
        const responseData: User = response.data;
        commit(AuthMutations.setUser, responseData);
      } else {
        // TODO show error updateProfile failed
      }
    } catch {
      // TODO show error
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