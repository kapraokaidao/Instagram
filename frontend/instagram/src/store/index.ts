import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
import user from "@/store/modules/user";
import { AuthState } from "../types/auth";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence<AuthState>({
  storage: window.localStorage,
  modules: ["auth"]
});

const store = new Vuex.Store({
  modules: {
    auth,
    user
  },
  plugins: [vuexLocal.plugin]
});

export default store;
