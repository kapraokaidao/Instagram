<template>
  <div class="plain-bg">
    <div class="margin-container pt-12">
      <v-row class="offset-2">
        <h2>Welcome! {{ username }}</h2>
      </v-row>
      <v-row
        v-for="(image, i) in posts"
        :key="i"
        class="home-img-container my-12"
        no-gutters
        justify="center"
      >
        <v-col class="home-img col-4" align-self="center">
          <v-img aspect-ratio="1" v-bind:src="image.imageUrl" />
        </v-col>
        <v-col class="home-img-info col-4">
          <v-row class="home-img-info-profile pt-6" no-gutters>
            <v-col align-self="center" class="offset-1 col-1">
                <v-avatar>
                  <v-img v-bind:src="image.imageUrl" />
                </v-avatar>
            </v-col>
            <v-col align-self="center" class="ml-3">
              <v-row no-gutters>
                <p
                  class="secondary-link text-decoration-none"
                  >{{ image._uid }}</p>
              </v-row>
              <v-row no-gutters>
                <!-- <h5>{{dayjs.unix(image.updatedDate).fromNow()}}</h5> -->
              </v-row>
            </v-col>
          </v-row>
          <v-row class="img-caption pt-16" no-gutters justify="center">
            <v-col class="col-8" align-self="center">
              <p class="text-center">
                {{ image.caption }}
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "Home",
  data: () => ({
    posts: [],
    username: "",
  }),
  methods: {
  },
  async mounted() {
    const data = (
      await axios({
        method: "get",
        url: "/post"
      })
    ).data.data;
    this.posts = data

    await this.$store.dispatch("user/fetchUser");
    const { username } = this.$store.state.user.user;
    this.username = username;
  }
};
</script>

<style lang="scss">
@import "./style.scss";
.home-img-info {
  background-color: white;
}
</style>
