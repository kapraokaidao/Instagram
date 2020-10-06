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
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
        ></v-text-field>
        <v-text-field
          class="text-field"
          v-model="password"
          :error-messages="passwordError"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <v-btn
          class="login-btn my-2"
          @click="login"
          color="#727272"
          to="/"
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

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "Login",

  mixins: [validationMixin],

  validations: {
    username: { required },
    password: { required, minLength: minLength(8) },
  },

  data: () => ({
    username: "",
    password: "",
    imageUrl: "../assets/cat-background.jpg",
  }),

  methods: {
    login() {
      //
    },
  },

  computed: {
    passwordError() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must be at least 10 characters long");
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
  },
};
</script>

<style scoped></style>
