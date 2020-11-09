<template>
  <div class="plain-bg">
    <div class="margin-container">
      <v-row class="py-6">
        <v-col align-self="center">
          <v-avatar height="7em" width="7em">
            <v-img v-bind:src="user.imageUrl" />
          </v-avatar>
        </v-col>
        <v-col
          align-self="center"
          class="ml-xs-16 col-sm-6 ml-sm-16 ml-md-12 col-md-4 col-xl-3 ml-xl-1"
        >
          <v-row class="px-3" no-gutters>
            <h3>{{ user.username }}</h3>
            <v-btn
              color="rgba(0,0,0,0.2)"
              @click="$router.push('/profile/update')"
              class="ml-4"
            >
              <v-icon left>
                mdi-pencil
              </v-icon>
              Edit
            </v-btn>
          </v-row>
        </v-col>
        <v-col
          align-self="center"
          class="offset-md-1 col-md-4 offset-sm-1  col-sm-10 offset-xl-2"
        >
          <p>{{ user.bio }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="img in userPosts"
          :key="img._id"
          class="col-md-3 col-sm-4 col-xl-2 col-12"
        >
          <v-card
            @click="
              selectImage(img._id, img.imageUrl, img.caption, img.createdDate)
            "
          >
            <v-img aspect-ratio="1" :src="img.imageUrl"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="dialog" max-width="640">
      <v-card>
        <button
          style="margin-left:auto; display: block; font-size: 26px; margin-right:10px;"
          @click="dialog = false"
        >
          X
        </button>
        <v-card-title class="headline">
          <v-img :src="selectedUrl"></v-img>
        </v-card-title>
        <v-card-text>
          <h5>{{ dayjsx() }}</h5>
          <p style="font-size: 20px;">{{ selectedCaption }}</p>
          <button style="font-size: 16px;" @click="deleteImage">
            Delete ❌
          </button>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User, UserActions } from "@/types/user";
import { Post } from "@/types/post";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const userModule = namespace("user");
const postModule = namespace("post");

@Component
export default class Profile extends Vue {
  @userModule.State("user") private user!: User;
  @userModule.State("posts") private userPosts!: Post[];
  @userModule.Action(UserActions.fetchPosts) private fetchPosts!: Function;

  private dialog = false;
  private selectedUrl = "";
  private selectedCaption = "";
  private selectedId = "";
  private selectedCreatedDate = "";

  dayjsx() {
    return dayjs(this.selectedCreatedDate).fromNow();
  }

  selectImage(
    id: string,
    imageUrl: string,
    caption: string,
    selectedCreatedDate: string
  ) {
    this.selectedUrl = imageUrl;
    this.selectedCaption = caption;
    this.selectedId = id;
    this.dialog = true;
    this.selectedCreatedDate = selectedCreatedDate;
  }

  async deleteImage() {
    await axios.delete(`/post/${this.selectedId}`);
    await this.fetchPosts();
    this.dialog = false;
  }

  async mounted() {
    await this.fetchPosts();
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
