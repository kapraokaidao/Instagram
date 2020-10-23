import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { PostActions, PostState } from "@/types/post";
import axios from "axios";
import { RootState, rootState } from "@/store/modules/index";
import { cloneDeep } from "lodash";


const state: PostState = {
  ...cloneDeep(rootState),
  timelinePosts: []
};

const getters: GetterTree<PostState, RootState> = {
};

const mutations: MutationTree<PostState> = {
};

const actions: ActionTree<PostState, RootState> = {
  [PostActions.createPost]: async ({ commit, dispatch }, payload) => {
    const { image, caption } = payload;
    try {
      const { data: post } = await axios.post("/post", image);
      await axios.put(`/post/${post._id}`, { caption });
    } catch (err) {
      console.log(err);
    }
  }
};

const PostModule: Module<PostState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default PostModule;
