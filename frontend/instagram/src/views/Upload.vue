<template>
  <div class="plain-bg" v-if="user">
    <div class="margin-container pt-12">
      <v-row class="offset-2">
        <h2>Upload a photo</h2>
      </v-row>
      <div>
        <v-row class="offset-2 my-3" no-gutters>
          <v-col class="col-4">
            <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Select your image"
              prepend-icon="mdi-camera"
              @change="setFile"
            ></v-file-input>
          </v-col>
        </v-row>
        <div>
          <v-row class="home-img-container my-4" no-gutters justify="center">
            <v-col class="home-img col-4" align-self="center">
<!--              <v-img aspect-ratio="1" :src="postUrl"></v-img>-->
            </v-col>
            <v-col class="home-img-info col-4">
              <v-row class="home-img-info-profile pt-6" no-gutters>
                <v-col align-self="center" class="offset-1 col-1">
                  <v-avatar>
                    <v-img :src="user.imageUrl" alt="Krit Kruaykitanon" />
                  </v-avatar>
                </v-col>
                <v-col align-self="center" class="offset-1">
                  <v-row no-gutters>
                    <h3>{{ user.username }}</h3>
                  </v-row>
                  <v-row no-gutters>
                    <h5>2h</h5>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="img-caption px-8 py-2" no-gutters justify="center">
                <v-textarea
                  flat
                  auto-grow
                  name="caption"
                  label="caption"
                  v-model="editCaption"
                ></v-textarea>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-4 offset-6">
              <v-btn class="primary-btn my-2" block @click="submit">
                Post
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User } from "@/types/user";
import { PostActions } from "@/types/post";

const userModule = namespace("user");
const postModule = namespace("post");

@Component
export default class Upload extends Vue {
  @userModule.State("user") private user!: User;
  @postModule.Action(PostActions.createPost) createPost!: Function;

  private file: any = null;
  private editCaption = "";
  private rules = [];

  setFile(file: any) {
    this.file = file;
  }

  submit() {
    if (!this.file) return;
    const formData = new FormData();
    formData.append("image", this.file);
    const payload = {
      image: formData,
      caption: this.editCaption
    };
    this.createPost(payload);
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
