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
              @change="upload"
            ></v-file-input>
          </v-col>
        </v-row>
        <div v-if="postId">
          <v-row class="home-img-container my-4" no-gutters justify="center">
            <v-col class="home-img col-4" align-self="center">
              <v-img aspect-ratio="1" :src="postUrl"></v-img>
            </v-col>
            <v-col class="home-img-info col-4">
              <v-row class="home-img-info-profile pt-6" no-gutters>
                <v-col align-self="center" class="offset-1 col-1">
                  <v-avatar>
                    <v-img :src="imageUrl" alt="Krit Kruaykitanon" />
                  </v-avatar>
                </v-col>
                <v-col align-self="center" class="offset-1">
                  <v-row no-gutters>
                    <h3>{{ username }}</h3>
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
                  v-model="caption"
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

<script>
import axios from "axios";
import router from "../router";
export default {
  name: "Upload",
  data: () => ({
    username: "",
    imageUrl: "",
    postUrl: "",
    postId: "",
    caption: ""
  }),
  methods: {
    async upload(file) {
      const formData = new FormData();
      formData.append("image", file);
      const { imageUrl, _id } = (
        await axios({
          method: "post",
          url: "/post",
          data: formData
        })
      ).data;
      this.postUrl = imageUrl;
      this.postId = _id;
    },
    async submit() {
      await axios({
        method: "put",
        url: `/post/${this.postId}`,
        data: { caption: this.caption }
      });
      router.push("/profile");
    }
  },
  async mounted() {
    await this.$store.dispatch("user/fetchUser");
    const { username, imageUrl } = this.$store.state.user.user;
    this.username = username;
    this.imageUrl = imageUrl;
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
}
h5 {
  font-size: 14px;
  font-weight: normal;
  color: #c4c4c4;
}
</style>
