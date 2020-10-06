<template>
  <div class="flex-container">
    <div class="card-style-login">
      <form class="form-style-login">
        <div class="img-container">
          <v-img max-height="100" max-width="100" src="../assets/logo.png" />
        </div>
        <h2 class="header">
          Instagram
        </h2>
        <v-text-field
          class="text-field"
          v-model="username"
          :error-messages="usernameError"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          class="text-field"
          v-model="password"
          :error-messages="passwordError"
          label="Password"
          required
        ></v-text-field>
        <v-btn
          class="login-btn my-2"
          @click="submit"
          color="#727272"
          large
          dark
        >
          Login
        </v-btn>
        <div class="signup-link">
          <router-link class="signup-text" to="/signup">Sign Up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { Action } from "vuex-class";
import { AuthActions, LoginCredentials } from "../types/auth";

@Component
export default class Login extends Vue {
  @Action(AuthActions.login) private login!: (
    credential: LoginCredentials
  ) => void;
  // data
  private username = "";
  private password = "";
  private imageUrl = "../assets/cat-background.jpg";

  submit() {
    // validate
    this.login({
      username: this.username,
      password: this.password
    });
  }
}
</script>

<style scoped></style>
