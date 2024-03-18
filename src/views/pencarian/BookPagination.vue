<template>
  <div class="home-carousel">
    <e-loading ref="loading" />
    <b-card>
      <b-row>
        <b-card-group
          class="col-md-2"
          v-for="(content, index) in contents"
          :key="index"
        >
          <b-card @click="itemAction(content)">
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
          </b-card>
        </b-card-group>
      </b-row>
      <div class="text-center" v-if="!contents.length">
        <p class="text-center" style="font-size: 25px;"> Buku Tidak Ditemukan </p>
      </div>
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
</template>

<script>
import _ from "lodash";
import axios from "axios";
import Loading from "@/components/Customs/Loading";
import { apiBackend } from "@/constants/config";

export default {
  props: {
    pageSize: { default: 12 },
    keyword: { default: null }
  },
  data () {
    return {
      curerntPage: 1,
      response: {},
    }
  },
  components: {
    "e-loading": Loading
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
          `${apiBackend}/book?sortBy=input_date&order=DESC&page=${this.curerntPage}&size=${this.pageSize}`
        );
        this.response = _.get(response, "data.data", {});
      } catch (error) {
        console.log(error)
        this.commonErrorNotif()
      }  finally {
        this.$refs.loading.hide()
      }
    },
    async searchBook() {
      try {
        this.$refs.loading.show()
        let getBookApi = `${apiBackend}/book?title=${this.keyword}&page=${this.curerntPage}&size=${this.pageSize}`;
        if (!this.keyword) { 
          getBookApi = `${apiBackend}/book?sortBy=input_date&order=DESC&page=${this.curerntPage}&size=${this.pageSize}`;
        };
        const response = await axios.get(getBookApi);
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
    }
  },
  mounted() {
    this.fetchPage()
  }
};
</script>