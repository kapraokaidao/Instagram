<template>
  <v-card class="card-style-signup">
    <form class="form-style-signup">
      <div class="header">
        <h2>Signup</h2>
      </div>
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
      <div>
        <v-row>
          <v-btn
            class="register-btn my-2"
            @click="submit"
            color="#727272"
            to="/"
            large
            dark
          >
            Register
          </v-btn>
        </v-row>
      </div>
    </form>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Signup",
  mixins: [validationMixin],

  validations: {
    username: { required },
  },

  data: () => ({
    username: "",
    showPassword1: false,
    showPassword2: false,
    password1: "",
    password2: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match",
    },
  }),

  methods: {
    register() {
      //
    },
  },
};
</script>

<style scoped></style>
