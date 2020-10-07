<template>
  <div class="plain-bg">
    <div class="margin-container pt-12">
      <h2 className="head">Edit Profile</h2>
      <v-row>
        <v-col class="col-5">
          <v-card flat class="pa-5" color="#FAFAFA">
            <v-text-field
              class="mb-6"
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
        <v-col class="col-5 offset-1">
          <v-file-input
            flat
            label="Upload new picture"
            prepend-icon="mdi-camera"
          ></v-file-input>
          <v-textarea flat name="bio" label="Bio"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-4">
          <v-btn class="primary-btn my-2" block @click="submit" to="/login">
            Submit Edit
          </v-btn>
        </v-col>
      </v-row>
    </div>
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
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    }
  }),
  methods: {}
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
