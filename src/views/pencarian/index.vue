<template>
  <b-body :slideshow="false">
    <div class="row mt-5">
      <div class="col-12 p-0">
        <div class="home-carousel">
          <div class="text-header">
            <p style="font-size: 50px; margin-top: 5em">Selamat Datang Di Perpustakaan</p>
            <p style="font-size: 30px; margin-bottom: 3em; margin-top: 1em" >Universitas Jendral Achmad Yani</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 p-0">
        <div class="home-carousel">
          <b-input-group class="mb-3">
            <b-form-input v-model="searchKeyword" class="custom-rounded" />
            <b-input-group-append>
              <b-button @click="searchBook" variant="outline-white">Cari Buku</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="card col-12 p-0">
        <e-book-paging :keyword="searchKeyword" ref="bookPaging" />
      </div>
    </div>
  </b-body>
</template>

<script>
import _ from 'lodash'
import axios from 'axios';
import Body from "../common/Body.vue";
import { apiBackend } from "@/constants/config";
import BookPagination from './BookPagination.vue';

export default {
  components: {
    "b-body": Body,
    "e-book-paging": BookPagination
  },
  data() {
    return {
      searchKeyword: null,
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
          image: "/assets/img/books/createthumb-1.jfif",
        },
        {
          image: "/assets/img/books/createthumb-2.jfif",
        },
        {
          image: "/assets/img/books/createthumb-3.jfif",
        },
        {
          image: "/assets/img/books/createthumb-4.jfif",
        },
        {
          image: "/assets/img/books/createthumb-5.jfif",
        },
        {
          image: "/assets/img/books/createthumb-6.jfif",
        },
      ],
    };
  },
  methods: {
    searchBook () {
      if (!!this.searchKeyword) {
        this.$refs.bookPaging.searchBook()
      }
    },
    redirectLogin (path) {
      this.$router.push({
        name: 'login',
        params: {
          path
        }
      })
    }
  },
  computed: {
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.custom-rounded {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.text-header {
  text-align: center;
}
.text-header p {
  color: white !important;
}
</style>
