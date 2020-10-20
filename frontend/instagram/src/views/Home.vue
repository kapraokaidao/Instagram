<template>
  <div class="plain-bg">
    <div class="margin-container pt-12">
      <v-row class="offset-2">
        <h2>Welcome! {{ userName }}</h2>
      </v-row>
      <v-row
        v-for="(image, i) in images"
        :key="i"
        class="home-img-container my-12"
        no-gutters
        justify="center"
      >
        <v-col class="home-img col-4" align-self="center">
          <v-img aspect-ratio="1" v-bind:src="image.detail.url"></v-img>
        </v-col>
        <v-col class="home-img-info col-4">
          <v-row class="home-img-info-profile pt-6" no-gutters>
            <v-col align-self="center" class="offset-1 col-1">
              <v-btn icon v-bind:to="toProfile(image.user.id)">
                <v-avatar>
                  <v-img
                    v-bind:src="image.user.url"
                    v-bind:alt="image.user.name"
                  />
                </v-avatar>
              </v-btn>
            </v-col>
            <v-col align-self="center" class="ml-3">
              <v-row no-gutters>
                <router-link
                  class="secondary-link text-decoration-none"
                  v-bind:to="toProfile(image.user.id)"
                  >{{ image.user.name }}</router-link
                >
              </v-row>
              <v-row no-gutters>
                <h5>2h</h5>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="img-caption pt-16" no-gutters justify="center">
            <v-col class="col-8" align-self="center">
              <p class="text-center">
                {{ image.detail.caption }}
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    userName: "Krit Kruaykitanon",
    images: [
      {
        user: {
          id: "1",
          name: "Krit Kruaykitanon",
          url:
            "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg"
        },
        detail: {
          url:
            "https://t2.ea.ltmcdn.com/en/images/0/3/1/colors_of_siamese_cats_130_2_600.jpg",
          forTime: "2h",
          caption:
            "For instance, you are sharing your morning coffee. Then you can write something like “enjoying my morning cup of coffee in Bali. Where are you currently sipping your coffee?”"
        }
      },
      {
        user: {
          id: "1",
          name: "Krit Kruaykitanon",
          url:
            "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg"
        },
        detail: {
          url:
            "https://miro.medium.com/max/11400/1*lS9ZqdEGZrRiTcL1JUgt9w.jpeg",
          forTime: "1d",
          caption: "Give me some chocolate!"
        }
      },
      {
        user: {
          id: "2",
          name: "Korn Kruaykitanon",
          url:
            "https://cbsnews1.cbsistatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg"
        },
        detail: {
          url:
            "https://cdn.vox-cdn.com/thumbor/UbmR5ZXfDHlsj6ObVvAiI3Od3oA=/0x0:3000x1571/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/19873983/GettyImages_137497593.jpg",
          forTime: "2w",
          caption: "Give me some noodles!"
        }
      }
    ]
  }),
  methods: {
    toProfile: id => {
      return `/profile/${id}`;
    }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
.home-img-info {
  background-color: white;
}
</style>
