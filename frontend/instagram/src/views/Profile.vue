<template>
  <div class="plain-bg">
    <div class="margin-container px-12 px-xs-0">
      <v-row class="home-img-info-profile py-6">
        <v-col align-self="center" class="col-1">
          <v-avatar height="7em" width="7em">
            <v-img src="../assets/cat-background.jpg" alt="Krit Kruaykitanon" />
          </v-avatar>
        </v-col>
        <v-col
          align-self="center"
          class="ml-xs-16 col-sm-6 ml-sm-16 ml-md-12 col-md-4 col-xl-3 ml-xl-1"
        >
          <v-row class="px-3" no-gutters>
            <h3>Krit Kruaykitanon</h3>
          </v-row>
          <v-row class="px-3 col-12" justify="center" no-gutters>
            <v-col class="col-4 pa-0" align-self="center"
              ><h5 class="h5-first-child">13 Posts</h5></v-col
            >
            <v-col class="col-4 pa-0" align-self="center"
              ><h5>133 Posts</h5></v-col
            >
            <v-col class="col-4 pa-0" align-self="center"
              ><h5 class="h5-last-child">13 Posts</h5></v-col
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
        <v-col class="col-md-3 col-sm-4 col-xl-2">
          <v-img
            aspect-ratio="1"
            :src="getImgUrl('cat-background.jpg')"
          ></v-img>
        </v-col>
        <v-col class="col-md-3 col-sm-4 col-xl-2">
          <v-img
            aspect-ratio="1"
            :src="getImgUrl('cat-background.jpg')"
          ></v-img>
        </v-col>
        <v-col class="col-md-3 col-sm-4 col-xl-2">
          <v-img
            aspect-ratio="1"
            :src="getImgUrl('cat-background.jpg')"
          ></v-img>
        </v-col>
        <v-col class="col-md-3 col-sm-4 col-xl-2">
          <v-img
            aspect-ratio="1"
            :src="getImgUrl('cat-background.jpg')"
          ></v-img>
        </v-col>
        <v-col class="col-md-3 col-sm-4 col-xl-2">
          <v-img
            aspect-ratio="1"
            :src="getImgUrl('cat-background.jpg')"
          ></v-img>
        </v-col>
        <v-col class="col-md-3 col-sm-4 col-xl-2">
          <v-img
            aspect-ratio="1"
            :src="getImgUrl('cat-background.jpg')"
          ></v-img>
        </v-col>
        <v-col class="col-md-3 col-sm-4 col-xl-2">
          <v-img
            aspect-ratio="1"
            :src="getImgUrl('cat-background.jpg')"
          ></v-img>
        </v-col>
        <v-col class="col-md-3 col-sm-4 col-xl-2">
          <v-img
            aspect-ratio="1"
            :src="getImgUrl('cat-background.jpg')"
          ></v-img>
        </v-col>
        <v-col class="col-md-3 col-sm-4 col-xl-2">
          <v-img
            aspect-ratio="1"
            :src="getImgUrl('cat-background.jpg')"
          ></v-img>
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
    imgfs: ["./public/cat-background.jpg", "./public/cat-background.jpg"]
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
  font-size: 24px;
}
h5 {
  color: #49a18c;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
}
.h5-first-child {
  text-align: left;
}
.h5-last-child {
  text-align: right;
}
.pong {
  background-color: aquamarine;
}
.ping {
  background-color: red;
}
</style>
