<template>
  <div class="plain-bg" v-if="user">
    <div class="margin-container pt-12">
      <v-row class="offset-2 pb-10">
        <h2>Upload a photo</h2>
      </v-row>
      <div>
        <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Select your image"
              prepend-icon="mdi-camera"
              @change="setFile"
            ></v-file-input>
          <v-row class="home-img-container my-4" no-gutters justify="center">
              <v-row class="img-caption px-8 py-2" no-gutters justify="center">
                <v-textarea
                  flat
                  auto-grow
                  name="caption"
                  label="caption"
                  v-model="editCaption"
                ></v-textarea>
              </v-row>
            </v-row>
          <v-row>
              <v-btn class="primary-btn my-2" block @click="submit">
                Post
              </v-btn>
          </v-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "../router";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User, UserActions } from "@/types/user";
import { PostActions } from "@/types/post";
const userModule = namespace("user");
const postModule = namespace("post");

@Component
export default class Upload extends Vue {
  @userModule.State("user") private user!: User;
  @postModule.Action(PostActions.createPost) createPost!: Function;
  @userModule.Action(UserActions.fetchPosts) private fetchPosts!: Function;

  private file: any = null;
  private editCaption = "";
  private rules = [];

  setFile(file: any) {
    this.file = file;
  }

  async submit() {
    if (!this.file) return;
    const formData = new FormData();
    formData.append("image", this.file);
    const payload = {
      image: formData,
      caption: this.editCaption
    };
    await this.createPost(payload);
    await this.fetchPosts();
    router.push("/profile");
  }
}
</script>

<style lang="scss">
@import "./style.scss";
.bg {
}
.home-img-container {
}
.home-img {
}
.home-img-info {
  background-color: white;
}
.home-img-info-profile {
}
h3 {
  color: #515151;
}
h5 {
  font-size: 14px;
  font-weight: normal;
  color: #c4c4c4;
}
</style>
