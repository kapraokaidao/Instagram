<template>
  <div class="plain-bg">
    <div class="margin-container px-12 px-xs-0">
      <v-row class="py-6">
        <v-col align-self="center" class="col-1">
          <v-avatar height="7em" width="7em">
            <v-img v-bind:src="userUrl" alt="Krit Kruaykitanon" />
          </v-avatar>
        </v-col>
        <v-col
          align-self="center"
          class="ml-xs-16 col-sm-6 ml-sm-16 ml-md-12 col-md-4 col-xl-3 ml-xl-1"
        >
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
            <v-col>
              <v-btn block class="secondary-sm-btn mt-1" @click="login" to="/">
                Follow
              </v-btn></v-col
            >
          </v-row>
        </v-col>
        <v-col
          align-self="center"
          class="offset-md-1 col-md-4 offset-sm-1  col-sm-10 offset-xl-2"
        >
          <p>
            Thank you for liking my photo! hope you have a great time and enjoy
            my gallery!
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="img in images"
          :key="img.id"
          class="col-md-3 col-sm-4 col-xl-2 col-12"
        >
          <v-img aspect-ratio="1" :src="img.src"></v-img>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({
    username: "",
    showPassword1: false,
    showPassword2: false,
    password1: "",
    password2: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    imagex: "./public/cat-background.jpg",
    imgfs: ["./public/cat-background.jpg", "./public/cat-background.jpg"],
    userUrl:
      "https://64.media.tumblr.com/2256c172b8d646fb99eb525e3db3a7bd/tumblr_puth3breAF1u87abko1_500.jpg",

    images: [
      {
        id: "01",
        src:
          "https://i.pinimg.com/736x/97/87/57/9787579f9b41fbce7c834954fedc0415.jpg"
      },
      {
        id: "02",
        src:
          "https://i.pinimg.com/736x/1f/5b/8d/1f5b8d7c56e12ce4565fb18d7c69285a.jpg"
      },
      {
        id: "03",
        src:
          "https://aesthetic.clueforlife.com/wp-content/uploads/2020/08/lofi-art-aesthetic.jpg"
      },
      {
        id: "04",
        src:
          "https://i.pinimg.com/736x/37/c6/ae/37c6ae455e5d08b70fba422c5cf69713.jpg"
      },
      {
        id: "05",
        src:
          "https://i.pinimg.com/originals/9a/a1/50/9aa150ac5fc1b155250aa7fd7d373a53.jpg"
      }
    ],
    user: {
      name: "Krit Kruaykitanon",
      postCount: "5",
      followerCount: "169",
      followingCount: "42"
    }
  }),
  methods: {
    getImgUrl(pic) {
      return require("../assets/" + pic);
    }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
