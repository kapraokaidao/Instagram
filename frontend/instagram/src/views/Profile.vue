<template>
  <div class="plain-bg">
    <div class="margin-container px-12 px-xs-0">
      <v-row class="py-6">
        <v-col align-self="center" class="col-1">
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
          <v-row class="px-3 col-12" no-gutters>
            <v-col class="col-4 pa-0" align-self="center"
              ><h5 class="h5-first-child">{{ userPosts.length }} Posts</h5></v-col
            >
            <!-- <v-col class="col-4 pa-0" align-self="center"
              ><h5>{{ user.followerCount }} Followers</h5></v-col
            >
            <v-col class="col-4 pa-0" align-self="center"
              ><h5 class="h5-last-child">
                {{ user.followingCount }} Followings
              </h5></v-col
            > -->
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
          <v-card @click="selectImage(img.imageUrl, img.caption)">
            <v-img aspect-ratio="1" :src="img.imageUrl"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="dialog" max-width="640">
      <v-card>
        <v-card-title class="headline">
          <v-img :src="selectedUrl"></v-img>
        </v-card-title>
        <v-card-text>
          {{ selectedCaption }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User, UserActions } from "@/types/user";
import { Post } from "@/types/post";

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

  selectImage(imageUrl: string, caption: string) {
    this.selectedUrl = imageUrl;
    this.selectedCaption = caption;
    this.dialog = true;
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
