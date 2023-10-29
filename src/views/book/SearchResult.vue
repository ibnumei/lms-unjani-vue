<template>
  <b-body>
    <div class="row">
      <div class="col-12 p-0">
        <div class="home-carousel">
          <b-input-group class="mb-3">
            <b-form-input v-model="keyword" class="custom-rounded" />
            <b-input-group-append>
              <b-button @click="goSearch" variant="outline-white">Cari Buku</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="card col-12 p-0">
        <h2 class="text-dark pl-4 mt-4">Daftar Pencarian Buku</h2>
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
import GlideComponent from "@/components/Carousel/GlideComponent";
import ImageList from "@/components/Customs/ImageList";
import _ from 'lodash'
import axios from "axios";
import Body from "../common/Body.vue";
import Text from "@/components/Customs/Text";
import { apiBackend } from "@/constants/config";
import jwtDecode from 'vue-jwt-decode'

export default {
  components: {
    "glide-component": GlideComponent,
    "b-body": Body,
    "e-text": Text,
    "image-list-item": ImageList,
  },
  data() {
    return {
      selectedItems: [],
      items: [
        {
          id: 1,
          title: 'asd',
          img: `http://library-lama.unjani.id/lib/minigalnano/createthumb.php?filename=../../images/docs/Psikologi_Sosial,_Jilid_2.jpg.jpg&width=200`
        }
      ],
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
      keyword: null
    };
  },
  methods: {
    async goBack() {
      this.$router.go({
        name: 'landing-page',
      })
    },
    itemAction (item) {
      console.log(item)
      console.log(item.id_book)
      this.$router.push({
        name: 'detail-buku',
        params: {
          id: item.id_book
        }
      })
    },
    goSearch () {
      if (!!this.keyword) {
        // this.$router.go({
        //   name: 'cari-buku',
        //   params: {
        //     keyword: this.keyword
        //   }
        // })
        this.searchBook()
      }
    },
    async searchBook () {
      let urlEncodedString = encodeURIComponent(this.keyword);
      try {
        this.processing = true
        const response = await axios.get(`${apiBackend}/book?title=${urlEncodedString}&page=1&size=10`);
        const books = _.get(response, 'data.data.tutorials', [])
        this.bookContent = []
        books.forEach(element => {
          this.bookContent.push({
            ...element,
            imgSrc: `http://library-lama.unjani.id/lib/minigalnano/createthumb.php?filename=../../images/docs/${element.image}&width=200`
          })
        });
      } catch (error) {
        this.$notify('error', 'Peringatan!', 'Terjadi Kesalahan Sistem', { duration: 3000, permanent: false });
      } finally {
        this.processing = false
      }
    }
  },
  computed: {
  },
  mounted() {
    this.keyword = this.$route.params.keyword
    this.searchBook()
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
