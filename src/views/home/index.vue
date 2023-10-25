<template>
  <b-body>
    <div class="row">
      <div class="col-12 p-0">
        <div class="home-carousel">
          <b-input-group class="mb-3">
            <b-form-input class="custom-rounded" />
            <b-input-group-append>
              <b-button variant="outline-white">Cari Buku</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <b-colxx lg="6" class="home-carousel pr-4 pl-3">
        <div class="card row">
          <div class="card-body text-center">
            <div>
              <i class="iconsminds-inbox-into large-icon"></i>
              <h5 class="mb-3 font-weight-semibold">Pengembalian</h5>
            </div>
          </div>
        </div>
      </b-colxx>
      <b-colxx lg="6" class="home-carousel pl-4 pr-3">
        <div class="card row">
          <div class="card-body text-center">
            <div>
              <i class="iconsminds-inbox-out large-icon"></i>
              <h5 class="mb-3 font-weight-semibold">Peminjaman</h5>
            </div>
          </div>
        </div>
      </b-colxx>
    </div>

    <div class="row">
      <div class="card col-12 p-0">
        <h2 class="text-dark pl-4 mt-4">Daftar Buku Terbaru</h2>
        <hr />
        <div class="home-carousel">
          <glide-component :settings="glideBookOption">
            <div
              class="card"
              v-for="(f, index) in bookContent"
              :key="`bookContent_${index}`"
            >
              <b-card class="flex-row" no-body>
                <div class="w-100 position-relative">
                  <img
                    class="card-img"
                    style="max-height: 210px"
                    :src="f.imgSrc"
                    alt="Card cap"
                  />
                </div>
              </b-card>
            </div>
          </glide-component>
        </div>
      </div>
    </div>
  </b-body>
</template>

<script>
import GlideComponent from "../../components/Carousel/GlideComponent";
import Body from "../common/Body.vue";

export default {
  components: {
    "glide-component": GlideComponent,
    "b-body": Body,
  },
  data() {
    return {
      glideBookOption: {
        type: "carousel",
        gap: 30,
        perView: 5,
        hideNav: false,
        peek: { before: 10, after: 10 },
        breakpoints: {
          600: { perView: 3 },
          992: { perView: 4 },
          1200: { perView: 5 },
        },
      },
      bookContent: [
        {
          imgSrc: "/assets/img/books/createthumb-1.jfif",
        },
        {
          imgSrc: "/assets/img/books/createthumb-2.jfif",
        },
        {
          imgSrc: "/assets/img/books/createthumb-3.jfif",
        },
        {
          imgSrc: "/assets/img/books/createthumb-4.jfif",
        },
        {
          imgSrc: "/assets/img/books/createthumb-5.jfif",
        },
        {
          imgSrc: "/assets/img/books/createthumb-6.jfif",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.custom-rounded {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
</style>
