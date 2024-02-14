<template>
  <b-body>
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

    <div class="row mb-4">
      <b-colxx lg="6" class="home-carousel pr-4 pl-3">
        <div class="card row" @click="redirectLogin('pengembalian')">
          <div class="card-body text-center">
            <div>
              <i class="iconsminds-inbox-into large-icon"></i>
              <h5 class="mb-3 font-weight-semibold">Pengembalian</h5>
            </div>
          </div>
        </div>
      </b-colxx>
      <b-colxx lg="6" class="home-carousel pl-4 pr-3">
        <div class="card row" @click="redirectLogin('peminjaman')">
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
        <div class="home-carousel">
          <glide-component :settings="glideBookOption">
            <div
              class="card"
              v-for="(f, index) in bookContent"
              :key="`bookContent_${index}`"
              @click="itemAction(f)"
            >
              <b-card class="flex-row" no-body>
                <div class="w-100 position-relative">
                  <img
                    class="card-img"
                    style="max-height: 210px"
                    :src="f.image"
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
import _ from 'lodash'
import axios from 'axios';
import GlideComponent from "../../components/Carousel/GlideComponent";
import Body from "../common/Body.vue";
import { apiBackend } from "@/constants/config";

export default {
  components: {
    "glide-component": GlideComponent,
    "b-body": Body,
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
    async getImagesFromName() {
      const response = await axios.get(`${apiBackend}/book?page=1&size=10`);
      const books = _.get(response, 'data.data.tutorials', [])

      this.bookContent = []
      books.forEach((element) => {
         this.bookContent.push({
          ...element
         })
      });
    },
    itemAction (item) {
      console.log(item)
      console.log(item.id_book)
      !!item.id_book && this.$router.push({
        name: 'detail-buku',
        params: {
          id: item.id_book
        }
      })
    },
    searchBook () {
      if (!!this.searchKeyword) {
        this.$router.push({
          name: 'cari-buku',
          params: {
            keyword: this.searchKeyword
          }
        })
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
  mounted() {
    this.getImagesFromName();
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.custom-rounded {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
</style>
