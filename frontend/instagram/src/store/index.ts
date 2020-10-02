import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
// import user from "@/store/modules/user";
// import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
// const vuexLocal = new VuexPersistence<LoginState>({
//   storage: window.localStorage,
//   modules: ["login"]
// });
const store = new Vuex.Store({
  modules: {
    auth
  }
  // plugins: [vuexLocal.plugin]
});

export default store;
