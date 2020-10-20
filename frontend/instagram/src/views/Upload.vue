<template>
  <div class="plain-bg">
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
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row class="home-img-container my-4" no-gutters justify="center">
          <v-col class="home-img col-4" align-self="center">
            <v-img aspect-ratio="1" src="../assets/cat-background.jpg"></v-img>
          </v-col>
          <v-col class="home-img-info col-4">
            <v-row class="home-img-info-profile pt-6" no-gutters>
              <v-col align-self="center" class="offset-1 col-1">
                <v-avatar>
                  <v-img
                    src="../assets/cat-background.jpg"
                    alt="Krit Kruaykitanon"
                  />
                </v-avatar>
              </v-col>
              <v-col align-self="center" class="offset-1">
                <v-row no-gutters>
                  <h3>Krit Kruaykitanon</h3>
                </v-row>
                <v-row no-gutters>
                  <h5>2h</h5>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="img-caption pt-16" no-gutters justify="center">
              <v-col class="col-6" align-self="center">
                <p>
                  Give me some cookie!
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-4 offset-6">
            <v-btn class="primary-btn my-2" block @click="submit" to="/home">
              Post
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upload",
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
    }
  }),
  methods: {}
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
}
h5 {
  font-size: 14px;
  font-weight: normal;
  color: #c4c4c4;
}
</style>
