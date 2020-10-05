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
