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
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap");
.flex-container {
  height: 100%;
  margin-inline-start: 10%;
  margin-inline-end: 10%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.card-style-login {
  width: 35em;
  padding: 30px;
  background: #ffffff;
  border-radius: 32px;
}
.form-style-login {
  text-align: center;
  margin: 5em 3em;
  display: flex;
  flex-direction: column;
}
.img-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  text-align: center;

  font-family: "Quicksand";
  font-weight: bold;
  font-size: 36px;
}
.login-btn {
  font-family: "Quicksand";
  font-weight: bold;
  font-size: 18px;
}
.signup-link {
  margin: 1em;
}
.signup-text {
  font-family: "Quicksand";
  font-weight: bold;
}
.text-field {
  font-family: "Quicksand";
  font-weight: regular;
}
</style>
