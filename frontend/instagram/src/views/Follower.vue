<template>
  <div class="plain-bg">
    <div class="margin-container pt-12">
      <v-row class="offset-2">
        <h2>169 Followers</h2>
      </v-row>
      <v-row
        class="offset-2 my-2 py-2 col-8 card-wrapper"
        v-for="user in followers"
        :key="user.id"
      >
        <v-col align-self="center" class="col-1 mr-10">
          <v-avatar height="7em" width="7em">
            <v-img v-bind:src="user.url" v-bind:alt="user.name" />
          </v-avatar>
        </v-col>
        <v-col align-self="center" class="ml-12 col-6">
          <v-row class="px-3" no-gutters>
            <h3>{{ user.name }}</h3>
          </v-row>
          <v-row class="px-3 col-12" justify="center" no-gutters>
            <v-col class="col-4 pa-0" align-self="center"
              ><h5 class="h5-first-child">{{ user.postCount }} Posts</h5></v-col
            >
            <v-col class="col-4 pa-0" align-self="center"
              ><h5>{{ user.followerCount }} Followers</h5></v-col
            >
            <v-col class="col-4 pa-0" align-self="center"
              ><h5 class="h5-last-child">
                {{ user.followingCount }} Followings
              </h5></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col class="px-3 col-4">
              <!-- TODO: Add script -->
              <v-btn block class="secondary-sm-btn mt-1">
                Follow
              </v-btn></v-col
            >
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Follower",
  data: () => ({
    userName: "Krit Kruaykitanon",
    followers: [
      {
        id: "1",
        name: "Krit Kruaykitanon",
        postCount: "5",
        followerCount: "42",
        followingCount: "169",
        url:
          "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg"
      },
      {
        id: "2",
        name: "Banana Boat",
        postCount: "50",
        followerCount: "42",
        followingCount: "169",
        url:
          "https://i.pinimg.com/originals/e9/72/75/e9727574fd98c42d6410a9228d4a4f34.jpg"
      }
    ]
  })
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
