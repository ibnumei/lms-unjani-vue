<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top mt-1">
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
    <home-layout>
      <div class="landing-page">
        <div class="main-container">
          <div class="content-container" id="home">
            <div class="section home" id="sectionHome">
              <div class="container">
                <div class="row" id="homeRow">
                  <div class="mt-5">&nbsp;</div>
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
                <!-- template disini -->
                <slot></slot>
                <!-- template disitu -->
              </div>
            </div>
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
import HomeLayout from "../../layouts/HomeLayout";
import GlideComponent from "../../components/Carousel/GlideComponent";

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
      ]
    };
  },
  methods: {}
};
</script>
