<template>
  <div class="plain-bg">
    <div class="margin-container pt-12">
      <h2 className="head">Edit Profile</h2>
      <v-file-input
        flat
        label="Upload new picture"
        prepend-icon="mdi-camera"
        @change="setFile"
      ></v-file-input>
      <v-textarea flat name="bio" label="Bio" v-model="editBio"></v-textarea>
      <v-btn class="primary-btn my-2" block @click="submit">
        Submit Edit
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User, UserActions } from "@/types/user";
import router from "../router";
const userModule = namespace("user");

@Component
export default class UpdateProfile extends Vue {
  @userModule.State("user") private user!: User;
  @userModule.Action(UserActions.fetchUser) private fetchUser!: Function;
  @userModule.Action(UserActions.uploadImage) private uploadImage!: Function;
  @userModule.Action(UserActions.updateProfile)
  private updateProfile!: Function;

  private editBio = "";
  private file: any = null;

  async mounted() {
    await this.fetchUser();
    this.editBio = this.user.bio;
  }

  setFile(file: any) {
    this.file = file;
  }

  submit() {
    if (this.file) {
      const formData = new FormData();
      formData.append("image", this.file);
      this.uploadImage(formData);
    }
    this.updateProfile({ bio: this.editBio });
    router.push("/profile");
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
