<template>
  <div class="plain-bg">
    <div class="margin-container pt-12">
      <v-row class="offset-2">
        <h2>Welcome! {{ user ? user.username : "" }}</h2>
      </v-row>

      <div v-for="(image, i) in timelinePosts" :key="i" class="py-10">
        <v-row class="home-img" no-gutters justify="center">
          <v-col class="home-img" align-self="center">
            <v-img aspect-ratio="1" v-bind:src="image.imageUrl" />
          </v-col>
          <v-col class="home-img-info">
            <v-row class="home-img-info-profile pt-6" no-gutters>
              <v-col align-self="center" class="offset-1">
                <v-avatar>
                  <v-img
                    v-bind:src="image.owner.imageUrl ? image.owner.imageUrl : tempIcon"
                  />
                </v-avatar>
              </v-col>
              <v-col align-self="center" class="ml-3">
                <v-row no-gutters>
                  <p class="secondary-link text-decoration-none">
                    {{ image.owner ? image.owner.username : "" }}
                  </p>
                </v-row>
                <v-row no-gutters>
                  <!-- <h5>{{dayjs.unix(image.updatedDate).fromNow()}}</h5> -->
                </v-row>
              </v-col>
            </v-row>
            <v-row class="img-caption pt-16" no-gutters justify="center">
              <p class="text-center">
                {{ image.caption }}
              </p>
            </v-row>
          </v-col>
        </v-row>
        <div>
          <div><button style="color:red;font-size:30px;" @click="likeButton(image._id)">❤</button> <span style="font-size: 24px;">{{image.likes}}</span></div>
        </div>
        <div>
          <input placeholder="comment" v-model="inputComment[image._id]" /> <button style="font-size:26;" @click="comment(image._id)">submit</button>
        </div>
        <div v-for="(comment, i) in comments[image._id]" :key="i">
          <div>
            {{comment.message}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User } from "@/types/user";
import { Post, PostActions } from "@/types/post";
const userModule = namespace("user");
const postModule = namespace("post");

@Component
export default class Home extends Vue {
  @userModule.State("user") private user!: User;
  @postModule.State("timelinePosts") private timelinePosts!: Post[];
  @postModule.Action(PostActions.fetchTimelinePosts)
  private fetchTimelinePosts!: Function;

  tempIcon = "https://image.flaticon.com/icons/png/512/149/149071.png";
  inputComment: any = {}
  comments: any = {}

  async likeButton(id: string){
    const { data } = await axios.post(`/post/${id}/like`);
    this.fetchTimelinePosts();
  }

  async comment(id: string){
    const {data} = await axios.post(`/comment`, {
      _pid: id,
      message: this.inputComment[id]
    })
    const {data: comment} = await axios.get(`/post/${id}/comment`)
    console.log('saasd', comment)
    this.comments[id] = comment
  }

  mounted() {
    this.fetchTimelinePosts();
  }
}
</script>

<style lang="scss">
@import "./style.scss";
.home-img-info {
  background-color: white;
}
</style>
