<template>
  <b-body>
    <e-loading ref="loading" />
    <div class="row">
      <div class="col-12 p-0">
        <div class="home-carousel">
          <b-input-group class="mb-3">
            <b-form-input v-model="keyword" class="custom-rounded" />
            <b-input-group-append>
              <b-button @click="goSearch" variant="outline-white"
                >Cari Buku</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="card col-12 p-0">
        <h2 class="text-dark pl-4 mt-4">Daftar Pencarian Buku</h2>
        <div class="home-carousel">
          <b-card>
            <b-row>
              <b-card-group
                class="col-md-2"
                v-for="(content, index) in contents"
                :key="index"
              >
                <b-card>
                  <div class="image-container">
                    <b-card-img
                      :src="content.image"
                      alt="Image"
                      class="image"
                      top
                    ></b-card-img>
                  </div>
                  <p class="card-text text-truncate">
                    {{ content.title }}
                  </p>
                  <p class="card-text">
                    {{ content.publisher_name }}
                  </p>
                  <div slot="footer">
                    <b-btn @click="itemAction(content)" variant="primary" block>Detail</b-btn>
                  </div>
                </b-card>
              </b-card-group>
            </b-row>
            <b-pagination-nav
              class="mt-5"
              size="lg"
              align="center"
              :number-of-pages="totalPages"
              :link-gen="linkGen"
              @input="changePage(curerntPage)"
              v-model="curerntPage"
              :per-page="5"
            >
              <template v-slot:next-text>
                <i class="simple-icon-arrow-right" />
              </template>
              <template v-slot:prev-text>
                <i class="simple-icon-arrow-left" />
              </template>
              <template v-slot:first-text>
                <i class="simple-icon-control-start" />
              </template>
              <template v-slot:last-text>
                <i class="simple-icon-control-end" />
              </template>
            </b-pagination-nav>
          </b-card>
        </div>
      </div>
    </div>
  </b-body>
</template>

<script>
import GlideComponent from "@/components/Carousel/GlideComponent";
import ImageList from "@/components/Customs/ImageList";
import _ from "lodash";
import axios from "axios";
import Body from "../common/Body.vue";
import Text from "@/components/Customs/Text";
import { apiBackend } from "@/constants/config";
import Loading from "@/components/Customs/Loading";


export default {
  props: {
    pageSize: { default: 12 },
  },
  components: {
    "glide-component": GlideComponent,
    "e-loading": Loading,
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
          title: "asd",
          image: null
        },
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
      keyword: "psikologi",
      curerntPage: 1,
      response: {},
    };
  },
  methods: {
    linkGen(pagenum) {},
    changePage(pageNum) {
      setTimeout(() => {
        this.fetchPage();
      }, 10);
    },
    commonErrorNotif () {
      return this.$notify(
        'error', 
        'Perhatian!', 
        'Terjadi Kesalahan', 
        { 
          duration: 3000, 
          permanent: false 
      });
    },
    async fetchPage() {
      try {
        this.$refs.loading.show()
        const response = await axios.get(
          `${apiBackend}/book?title=${this.keyword}&page=${this.curerntPage}&size=${this.pageSize}`
        );
        this.response = _.get(response, "data.data", {});
      } catch (error) {
        console.log(error)
        this.commonErrorNotif()
      }  finally {
        this.$refs.loading.hide()
      }
    },
    async goBack() {
      this.$router.go({
        name: "landing-page",
      });
    },
    itemAction(item) {
      this.$router.push({
        name: 'detail-buku',
        params: {
          id: item.id_book
        }
      })
    },
    goSearch() {
      if (!!this.keyword) {
        this.fetchPage();
      }
    },
  },
  computed: {
    contents() {
      const contents = _.get(this.response, "tutorials", []);
      return contents;
    },
    curerntPages() {
      return _.get(this.response, "currentPage", 0);
    },
    totalPages() {
      return _.get(this.response, "totalPages", 1);
    },
  },
  mounted() {
    this.keyword = this.$route.params.keyword;
    this.fetchPage();
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
