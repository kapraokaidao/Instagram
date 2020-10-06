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
          <v-btn block class="primary-btn" @click="submit" to="/">
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
import { Action } from "vuex-class";
import { AuthActions, SignUpCredentials } from "../types/auth";
import sassStyles from "./style.scss";

@Component
export default class Signup extends Vue {
  @Action(AuthActions.signUp) private signUp!: (
    credentials: SignUpCredentials
  ) => void;

  private username = "";
  private showPassword1 = false;
  private showPassword2 = false;
  private password1 = "";
  private password2 = "";
  private rules = {
    required: value => !!value || "Required.",
    min: v => v.length >= 8 || "Min 8 characters",
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
