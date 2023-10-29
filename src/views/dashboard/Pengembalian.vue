<template>
  <b-body>
    <b-modal id="modallg" size="lg" title="Large Modal" hide-footer>
      <v-quagga
        :onDetected="onBarcodeScanned"
        :readerSize="readerSize"
        :readerTypes="detecteds"
        :patchSize="'medium'"
      ></v-quagga>
    </b-modal>
    <b-card>
      <h3>Scan buku</h3>
      <div>{{ result }}</div>
      <e-scan />
      <br />
      <b-button v-b-modal.modallg variant="outline-primary" class="mr-2 mb-2">{{
          $t('modal.launch-large-modal')
        }}
      </b-button>
      <div class="mt-4 col-12 p-0">
      </div>
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
import Scanner from "@/components/Customs/Scanner";
import { apiBackend } from "@/constants/config";
import jwtDecode from 'vue-jwt-decode'

export default {
  components: {
    "b-body": Body,
    "e-text": Text,
    "e-scan": Scanner
  },
  data() {
    return {
      items: [
        { id: 1, first_name: 'Mark', last_name: 'Otto', username: '@mdo' },
        { id: 2, first_name: 'Jacob', last_name: 'Thornton', username: '@fat' },
        { id: 3, first_name: 'Lary', last_name: 'the Bird', username: '@twitter' }
      ],
      readerSize: {
        width: 640,
        height: 480,
      },
      detecteds: [
        "code_128_reader",
        "ean_reader",
        "ean_8_reader",
        "code_39_reader",
        "code_39_vin_reader",
        "codabar_reader",
        "upc_reader",
        "upc_e_reader",
        "i2of5_reader",
        "2of5_reader",
        "code_93_reader",
      ],
      result: "",
      format: "",
    };
  },
  methods: {
    async goBack() {
      this.$router.push({
        name: 'landing-page',
      })
    },
    onBarcodeScanned(barcode) {
      console.log("detected", barcode);
      this.result = barcode.codeResult.code;
      this.format = barcode.codeResult.format;
      // do something...
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
