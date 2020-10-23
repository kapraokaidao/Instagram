<template>
  <div class="plain-bg">
    <div class="margin-container pt-12">
      <h2 className="head">Edit Profile</h2>
      <v-file-input
        flat
        label="Upload new picture"
        prepend-icon="mdi-camera"
      ></v-file-input>
      <v-textarea flat name="bio" label="Bio" v-model="bio"></v-textarea>
      <v-btn class="primary-btn my-2" block @click="submit">
        Submit Edit
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UpdateProfile",
  data: () => ({
    bio: ""
  }),
  methods: {
    submit() {
      axios.put("/user/me", {
        bio: this.bio
      });
    }
  },
  async mounted() {
    const { bio } = (await axios.get("/user/me")).data;
    this.bio = bio;
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
