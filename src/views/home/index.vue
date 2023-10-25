<template>
  <div>
    <home-layout>
      <div class="landing-page">
        <div class="main-container">
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">
                <img
                  src="../../assets/logos/logo.svg"
                  height="60"
                  class="d-inline-block align-text-top"
                />
              </a>
            </div>
          </nav>

          <div class="content-container" id="home">
            <div class="section home" id="sectionHome">
              <div class="container">
                <div class="row" id="homeRow">
                  <b-colxx xxs="12" class="pl-0 pr-0 mt-4">
                    <glide-component :settings="glideBannerOption">
                      <div
                        class="pr-3 pl-2 mb-4 glide__slide"
                        v-for="(f, index) in bannerContent"
                        :key="`bannerContent_${index}`"
                      >
                        <b-card class="flex-row" no-body>
                          <div class="w-100 position-relative">
                            <img
                              class="card-img"
                              style="max-height: 400px"
                              :src="f.imgSrc"
                              alt="Card cap"
                            />
                          </div>
                        </b-card>
                      </div>
                    </glide-component>
                  </b-colxx>
                </div>

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
                          <h5 class="mb-3 font-weight-semibold">
                            Pengembalian
                          </h5>
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
                    <hr/>
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
              </div>
            </div>

            <!-- <div class="section footer mb-0 bg-primary" id="sectionFooter">
            <div class="container">
              <div class="row footer-row">
                <div class="col-12 text-right">
                  <a
                    class="btn btn-circle btn-outline-semi-light footer-circle-button"
                    @click="scrollTo('#home')"
                    href="javascript:;"
                  >
                    <i class="simple-icon-arrow-up"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="container copyright pt-5 pb-5">
              <div class="row">
                <div class="col-12"></div>
                <div class="col-12 text-center">
                  <p class="mb-0">2020 © ColoredStrategies</p>
                </div>
              </div>
            </div>
          </div> -->
          </div>
        </div>
      </div>
    </home-layout>
    <div class="section footer fixed-bottom bg-primary">
      <div class="container copyright pt-3 pb-3">
        <div class="row">
          <div class="col-12 text-center">
            <p class="mb-0">© Copyright 2023 - UNJANI - All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { headroom } from "vue-headroom";
import VueScrollTo from "vue-scrollto";
import HomeLayout from "../../layouts/HomeLayout";
import GlideComponent from "../../components/Carousel/GlideComponent";
import { adminRoot, buyUrl } from "../../constants/config";

const scrollOptions = {
  container: "body",
  easing: "ease-in",
  offset: -120,
  force: true,
  x: false,
  y: true,
};

export default {
  components: {
    "home-layout": HomeLayout,
    "glide-component": GlideComponent,
    headroom: headroom,
  },
  data() {
    return {
      glideBannerOption: {
        gap: 5,
        perView: 1,
        type: "carousel",
        autoplay: true,
        animationDuration: 4000,
        hideNav: true,
        breakpoints: {
          600: {
            perView: 1,
          },
          1400: {
            perView: 1,
          },
        },
      },
      bannerContent: [
        {
          imgSrc: "/assets/img/landing-page/slideshow/1.jpg",
        },
        {
          imgSrc: "/assets/img/landing-page/slideshow/2.jpg",
        },
        {
          imgSrc: "/assets/img/landing-page/slideshow/3.jpg",
        },
        {
          imgSrc: "/assets/img/landing-page/slideshow/4.jpg",
        },
      ],
      showMobileMenu: false,
      adminRoot,
      buyUrl,
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
  methods: {
    onWindowResize() {
      const homeRect = document
        .getElementById("homeRow")
        .getBoundingClientRect();
      const homeSection = document.getElementById("sectionHome");
      homeSection.style.backgroundPositionX = homeRect.x - 580 + "px";

      const footerSection = document.getElementById("sectionFooter");
      footerSection.style.backgroundPositionX =
        event.target.innerWidth - homeRect.x - 2000 + "px";

      if (event.target.innerWidth >= 992) {
        this.showMobileMenu = false;
      }
    },
    onWindowScroll() {
      this.showMobileMenu = false;
    },
    onWindowClick() {
      this.showMobileMenu = false;
    },

    scrollTo(target) {
      VueScrollTo.scrollTo(target, 200, scrollOptions);
    },
  },
  mounted() {
    // document.body.classList.add("no-footer");
    window.addEventListener("scroll", this.onWindowScroll);
    window.addEventListener("resize", this.onWindowResize);
    window.addEventListener("click", this.onWindowClick);
  },
  beforeDestroy() {
    // document.body.classList.remove("no-footer");
    window.removeEventListener("scroll", this.onWindowScroll);
    window.removeEventListener("resize", this.onWindowResize);
    window.removeEventListener("click", this.onWindowClick);
  },
};
</script>
<style lang="scss" scoped>
  .custom-rounded {
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }
  // .footer {
  //   margin-top: auto!important;
  //   position: absolute;
  //   bottom: 0;
  //   width: 100%;
  // }
</style>
