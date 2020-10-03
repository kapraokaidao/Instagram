<template>
  <v-card class="card-style">
    <form class="form-style">
      <div class="header">
        <h2>Instagram</h2>
      </div>
      <v-text-field
        v-model="username"
        :error-messages="usernameError"
        label="Username"
        required
        @input="$v.username.$touch()"
        @blur="$v.username.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordError"
        label="Password"
        required
      ></v-text-field>
      <div>
        <v-row>
          <v-btn
            class="login-btn my-2"
            @click="submit"
            color="#727272"
            to="/"
            large
            dark
          >
            Login
          </v-btn>
        </v-row>
        <v-row>
          <v-btn class="signup-btn" @click="clear" to="/signup">
            Sign up
          </v-btn>
        </v-row>
      </div>
    </form>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  name: "Login",

  validations: {
    username: { required },
    password: { required }
  },

  data: () => ({
    username: "",
    password: ""
  }),

  methods: {
    login() {
      // 
    },
    signup() {
      // 
    }
  }
};
</script>
<style lang="scss">
.card-style {
  margin: 0 auto;
  height: auto;
  margin-right: 5%;
  top: 15%;
  width: 30%;
  background: #ffdddd;
  padding: 20px;
}
.form-style {
  width: 70%;
  margin: 0 auto;
  padding: 10px;
}
.login-btn {
  margin: auto;
  width: 70%;
}
.signup-btn {
  margin: auto;
  margin-top: 10px;
  width: 70%;
}
.header {
  text-align: center;
  margin-top: 10px;
  display: block;
}
/* write SCSS here */
</style>
