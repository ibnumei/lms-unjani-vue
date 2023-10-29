<template>
  <b-body>
    <b-card>
      <b-row class="flex-row">
        <img :src="books.imgSrc" class="card-img" />
        <b-colxx xxs="6" xs="6" lg="6">
          <b-card-body>
            <h2 class="mb-4">{{ books.title }}</h2>
            <h6 class="mb-4 card-subtitle">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Accusamus tempora quasi deleniti voluptates voluptatum tenetur
              sunt eligendi quo architecto aperiam ipsa delectus et, obcaecati,
              aut quidem blanditiis nemo voluptatem saepe?
            </h6>

            <p class="card-text text-muted text-small mb-0 font-weight-light">
              09.04.2018
            </p>
            <code>{{ books }}</code>
          </b-card-body>
        </b-colxx>
      </b-row>
    </b-card>
  </b-body>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import Body from "../common/Body.vue";
import Text from "@/components/Customs/Text";
import { apiBackend } from "@/constants/config";
import jwtDecode from "vue-jwt-decode";

export default {
  components: {
    "b-body": Body,
    "e-text": Text
  },
  data() {
    return {
      processing: false,
      loginError: null,
      books: {
        imgSrc: null,
        title: null
      }
    };
  },
  methods: {
    async getDetails() {
      try {
        this.processing = true;
        const response = await axios.get(`${apiBackend}/book/${this.id}`);
        const books = _.get(response, "data.data", {});
        this.books = {
          ...books,
          imgSrc: `http://library-lama.unjani.id/lib/minigalnano/createthumb.php?filename=../../images/docs/${books.image}&width=200`
        };
      } catch (error) {
        this.$notify("error", "Peringatan!", "Terjadi Kesalahan Sistem", {
          duration: 3000,
          permanent: false
        });
      } finally {
        this.processing = false;
      }
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.getDetails();
  },
  beforeDestroy() {}
};
</script>
<style lang="scss" scoped>
.custom-rounded {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.card-img {
  width: 500px;
  max-height: 800px;
  height: 800px;
}
</style>
