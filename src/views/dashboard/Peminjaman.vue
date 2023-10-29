<template>
  <b-body>
    <b-card>
      <h3>Scan buku</h3>
    </b-card>
    <b-card class="mt-4">
      <h3>Daftar buku</h3>
      <b-table hover :items="items" />
      <div class="mt-4 col-12 p-0">
        <div class="">
          <b-form class="av-tooltip tooltip-label-bottom">
            <div class="d-flex justify-content-end align-items-center">
              <b-button
                @click="goBack"
                variant="primary"
                size="lg"
                :disabled="processing"
                :class="{
                  'btn-multiple-state btn-shadow': true,
                }"
              >
                <span class="label">Kembali</span>
              </b-button>
            </div>
          </b-form>
        </div>
      </div>
    </b-card>
    
  </b-body>
</template>

<script>
import _ from 'lodash'
import axios from "axios";
import Body from "../common/Body.vue";
import Text from "@/components/Customs/Text";
import { apiBackend } from "@/constants/config";
import jwtDecode from 'vue-jwt-decode'

export default {
  components: {
    "b-body": Body,
    "e-text": Text,
  },
  data() {
    return {
      items: [
        { id: 1, first_name: 'Mark', last_name: 'Otto', username: '@mdo' },
        { id: 2, first_name: 'Jacob', last_name: 'Thornton', username: '@fat' },
        { id: 3, first_name: 'Lary', last_name: 'the Bird', username: '@twitter' }
      ],
    };
  },
  methods: {
    async goBack() {
      this.$router.push({
        name: 'landing-page',
      })
    },
  },
  computed: {
    path () {
      return this.$route.params.path
    }
  },
  mounted() {
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
