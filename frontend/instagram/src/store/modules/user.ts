// import { cloneDeep } from "lodash";
// import { baseState, baseMutations } from "../state";
import {
  UserState,
  UserGetters,
  UserMutations,
  UserActions
} from "@/types/user";
import { User } from "@/types/user";
import { StoreOptions } from "vuex";
// import router from "../../router";
import axios from "axios";
import { AuthMutations } from "@/types/auth";

const store: StoreOptions<UserState> = {
  state: {
    user: null,
    isError: false,
    isFetching: false,
    isSuccess: false
  },
  getters: {
    [UserGetters.getUser]: state => state.user
  },
  mutations: {
    [UserMutations.setUser]: (state: UserState, user: User) => {
      state.user = user;
    }
  },
  actions: {
    [UserActions.fetchUser]: async ({ commit, getters }) => {
      if (getters.getUser) {
        try {
          // Patch /user/:id/updateProfile
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
  }
};
export default store;

// to get state in store
// this.$store.state.search.transcribeMessage;

// to dispatch
// this.$store.dispatch('search/start')
