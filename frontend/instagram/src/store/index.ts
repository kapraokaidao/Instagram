import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
import user from "@/store/modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    user
  }
});

export default store;
