import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/Login.vue";
import UpdateProfile from "../views/UpdateProfile.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Upload from "../views/Upload.vue";
import Follower from "../views/Follower.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Signup.vue")
  },
  {
    path: "/profile/update",
    name: "UpdateProfile",
    component: UpdateProfile
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload
  },
  {
    path: "/follower",
    name: "Follower",
    component: Follower
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const state = store.state as any;
  const isAuthenticated = !!state.auth.token;
  if (to.name === "Signup" || to.name === "Login") {
    if (isAuthenticated) next({ name: "Profile" });
    else next();
  } else {
    if (isAuthenticated) next();
    else next({ name: "Login" });
  }
});

export default router;
