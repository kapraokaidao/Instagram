<template>
  <div>
    <v-card class="card-style-login">
      <form class="form-style-login">
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
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <div>
          <v-row>
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
          </v-row>
          <v-row>
            <v-btn class="signup-btn" to="/signup">
              Sign up
            </v-btn>
          </v-row>
        </div>
      </form>
    </v-card>
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
    password: { required, minLength : minLength(8) }
  },

  data: () => ({
    username: "",
    password: "",
    imageUrl : "../assets/cat-background.jpg"
  }),

  methods: {
    login() {
      // 
    }
  },

  computed: {
    passwordError () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Password must be at least 10 characters long')
        !this.$v.password.required && errors.push('Password is required.')
        return errors
    },
  }
};
</script>
<style lang="scss">
.card-style-login {
  margin: auto;
  height: auto;
  margin-right: 5%;
  margin-top: 8%;
  width: 30%;
  background: #ffdddd;
  padding: 20px;
}
.form-style-login {
  width: 84%;
  margin: 0 auto;
  padding: 10px;
}
.login-btn {
  margin: auto;
  width: 80%;
}
.signup-btn {
  margin: auto;
  margin-top: 10px;
  width: 80%;
}
.header {
  text-align: center;
  margin-top: 10px;
  display: block;
}
/* write SCSS here */
</style>
