<template>
  <div class="center-container">
    <v-card class="card-style">
      <form class="form-style">
        <h2>Signup</h2>
        <div class="px-12 my-6">
          <v-text-field
            v-model="username"
            :rules="[rules.required]"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password1"
            :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPassword1 ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="showPassword1 = !showPassword1"
          ></v-text-field>
          <v-text-field
            v-model="password2"
            :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showPassword2 ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="showPassword2 = !showPassword2"
          ></v-text-field>
        </div>

        <div class="px-12 my-3">
          <v-btn block class="primary-btn" @click="submit">
            Register
          </v-btn>
        </div>
      </form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { Action, namespace } from "vuex-class";
import { AuthActions, SignUpCredentials } from "../types/auth";
const authModule = namespace("auth");

@Component
export default class Signup extends Vue {
  @authModule.Action(AuthActions.signUp) private signUp!: (
    credential: SignUpCredentials
  ) => void;
  private username = "";
  private showPassword1 = false;
  private showPassword2 = false;
  private password1 = "";
  private password2 = "";
  private rules = {
    required: (value: any) => !!value || "Required.",
    min: (v: { length: number }) => v.length >= 8 || "Min 8 characters",
    emailMatch: () => "The email and password you entered don't match"
  };

  submit() {
    // validate
    this.signUp({
      username: this.username,
      password: this.password1
    });
  }
}
</script>
<style lang="scss">
@import "./style.scss";
.bg {
  overflow: hidden;
  background-image: url("../assets/blur-cat-background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
