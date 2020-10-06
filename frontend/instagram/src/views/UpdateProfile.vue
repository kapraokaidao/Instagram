<template>
  <div>
    <h1 className="head">Edit Profile</h1>
    <v-row no-gutters>
      <v-col>
        <v-card class="ma-4 pa-4">
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
        </v-card>
      </v-col>
      <v-col>
        <v-file-input
          label="Upload new picture"
          filled
          prepend-icon="mdi-camera"
        ></v-file-input>
        <v-textarea solo name="bio" label="Bio"></v-textarea>
      </v-col>
    </v-row>
    <v-btn
      class="register-btn my-2"
      @click="submit"
      color="#727272"
      to="/"
      large
      dark
    >
      Submit Edit
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "UpdateProfile",
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
  methods: {},
};
</script>

<style scoped>
.head {
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 45px;

  color: #515151;
}
</style>
