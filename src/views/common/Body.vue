<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top mt-0"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img
            src="../../assets/logos/logo.svg"
            height="60"
            class="d-inline-block align-text-top"
          />
        </a>
      </div>
      <div class="navbar-right">
        <div class="user d-inline-block">
          <b-dropdown
            class="dropdown-menu-right"
            right
            variant="empty"
            toggle-class="p-0"
            menu-class="mt-3"
            no-caret
          >
            <template slot="button-content">
              <span class="name mr-1 text-white" style="font-size: 20px;">{{memberName}}</span>
              <span>
                <img alt="yyyy" src="@/assets/img/user-profile.png" />
              </span>
            </template>
            <b-dropdown-item @click="loginMahasiswa" v-if="!memberName">Login</b-dropdown-item>
            <b-dropdown-item @click="pageMahasiswa" v-if="!!memberName">Mahasiswa</b-dropdown-item>
            <b-dropdown-item @click="logoutMahasiswa" v-if="!!memberName">Logout</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </nav>
    <home-layout>
      <div class="landing-page">
        <div class="main-container">
          <div class="content-container" id="home">
            <div class="section home" id="sectionHome">
              <div class="container bottom-space">
                <div v-if="slideshow" class="row mt-4" id="homeRow">
                  <div class="mt-5">&nbsp;</div>
                  <b-colxx xxs="12" class="pl-0 pr-0 mt-4">
                    <div>
                      <b-carousel
                        id="carousel-1"
                        v-model="slide"
                        :interval="4000"
                        controls
                        indicators
                        img-width="1024"
                        img-height="100"
                        style="text-shadow: 1px 1px 2px #333"
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd"
                        class="mb-3"
                      >
                        <!-- Slides with image only -->
                        <template                         
                          v-for="(content, index) in bannerContent"
                        >
                          <b-carousel-slide
                            class="carousel-unjani"
                            :key="`slider-${index}`"
                          >
                            <template #img>
                              <div class="image-container">
                                <img
                                  class="img-fluid w-100"
                                  width="1024"
                                  height="100"
                                  :src="content.imgSrc"
                                  alt="image slot"
                                >
                              </div>
                            </template>
                          </b-carousel-slide>

                        </template>

                      </b-carousel>
                    </div>
                  </b-colxx>
                </div>
                <div v-else style="padding-bottom: 6em;" id="homeRow"></div>
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
            <p class="mb-0">© Copyright 2024 - UNJANI - All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from "axios";
import { apiBackend } from "@/constants/config";
import { headroom } from "vue-headroom";
import HomeLayout from "../../layouts/HomeLayout";
import GlideComponent from "../../components/Carousel/GlideComponent";
import { mapGetters } from 'vuex';

export default {
  props: {
    slideshow: { default: true }
  },
  components: {
    "home-layout": HomeLayout,
    "glide-component": GlideComponent,
    headroom: headroom,
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    logoutMahasiswa () {
      this.$router.push({ name: 'member-logout' })
    },
    loginMahasiswa () {
      this.$router.push({
        name: 'login',
        params: {
          path: 'mahasiswa'
        }
      })
    },
    pageMahasiswa () {
      this.$router.push({ name: 'mahasiswa' })
    },
    async getHeaderImage() {
      try {
        const response = await axios.get(`${apiBackend}/banner`);
        const data = _.get(response, 'data.data', []);
        data.forEach((element) => {
          element.imgSrc = this.getImageUrl(element)
          console.log(element.imgSrc)
        });
        this.bannerImages = data;
      } catch (error) {
        console.error('Failed to fetch images', error);
      }
    },
    getImageUrl(image) {
      const blob = new Blob([new Uint8Array(image.file.data)], { type: image.file_type });
      return URL.createObjectURL(blob);
    }
  },
  mounted() {
    this.getHeaderImage();
  },
  computed: {
    ...mapGetters(['currentUser']),
    memberName () {
      if (this.currentUser && this.currentUser.type === 'Member') {
        return this.currentUser.member_name
      }
      return null
    },
    
    currentPage () {
      if (this.$route.path.toLowerCase().includes('pengembalian')) {
        return 'pengembalian'
      } else if (this.$route.path.toLowerCase().includes('peminjaman')) {
        return 'peminjaman'
      } else {
        return 'home'
      }
    },
    bannerContent() {
      console.log(this.currentPage)
      const mappingImages = {
        home: this.bannerImages.filter((obj) => obj.category === 'banner_home'),
        peminjaman: this.bannerImages.filter((obj) => obj.category === 'banner_peminjaman'),
        pengembalian: this.bannerImages.filter((obj) => obj.category === 'banner_pengembalian')
      }
      const banner = mappingImages[this.currentPage]
      if (!banner || banner.length == 0) {
        return this.defaultBannerContent
      }
      
      return banner
    }
  },
  data() {
    return {
      slide: 0,
      sliding: false,
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
      defaultBannerContent: [
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
      bannerImages: [],
    };
  }
};
</script>
<style lang="scss" scoped>
  .carousel-unjani {
    border-radius: 100px !important;
  }

  .image-container {
    width: 100%; /* Set the desired width for the container */
    height: 400px; /* Set the desired height for the container */
    overflow: hidden; /* Hide any part of the image that exceeds the container dimensions */
    border-radius: 15px; /* Set the border radius to create rounded corners */
    display: flex;
    justify-content: center; /* Center the content horizontally */
    align-items: center; /* Center the content vertically */
  }

  .image-container img {
    width: 100%; /* Make the image fill the width of the container */
    height: auto; /* Maintain the original aspect ratio of the image */
  }

  .bottom-space {
    margin-bottom: 5em;
  }
</style>
