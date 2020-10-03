<template>
  <v-card class="card-style">
    <form class="form-style">
      <div class="header">
        <h2> Signup </h2>
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
            <v-text-field
        v-model="password2"
        :error-messages="passwordError"
        label="Password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <div>  
        <v-row>
          <v-btn class="register-btn my-2" @click="submit" color="#727272" to="/"
              large
              dark>
            Register
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
  name: "Signup",
  mixins: [validationMixin],

  validations: {
    username: { required },
    password: { required },
  },

  data: () => ({
    username: "",
    password: "",
    password2: "",
  }),

  methods: {
    register() {
        // 
    }
  }
};
</script>
<style lang="scss">
  .card-style {
    margin: 0 auto;
    width:30%;
    background: #FFFFFF;
    padding: 20px;
  }
  .form-style {
    width  : 70%;
    margin: 0 auto;
    padding: 10px
  }
  .register-btn {
    margin : auto;
    width: 70%;
  }
  .header {
    text-align: center;
    margin-top: 10px;
    display: block;
  }
/* write SCSS here */
</style>