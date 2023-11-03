<template>
  <b-body>
    <e-loading ref="loading" />
    <b-modal 
      :hideHeaderClose="false" 
      :no-close-on-backdrop="false" 
      id="modallg" 
      ref="modalScanner" 
      size="lg" 
      title="Scan Buku" 
      hide-footer
    >
      <slot name="button"></slot>
      <div class="qr-scanner">
        {{qrCodeContent}}
        <video class="qr-scan"  ref="videoObject"></video>
      </div>
    </b-modal>
    <v-loading :active.sync="processing" :is-full-page="true"></v-loading>
    <b-card class="p-5">
      <div class="d-flex justify-content-center align-items-center">
        {{qrCodeContent}}
        <b-button
          @click="openScanner"
          variant="primary"
          size="lg"
          :disabled="processing"
          :class="{
            'btn-multiple-state btn-shadow': true,
          }"
        >
          <i class="simple-icon-camera"></i>
          <span class="label">Scan Buku</span>
        </b-button>
      </div>
    </b-card>
    <b-card class="mt-4">
      <h3>Daftar buku</h3>
      <b-table hover :items="items" :fields="tabelHeader"/>
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
import QrScanner from "qr-scanner";
import Loading from "@/components/Customs/Loading";
import { mapGetters } from 'vuex';

export default {
  components: {
    "e-loading": Loading,
    "b-body": Body,
    "e-text": Text,
  },
  data() {
    return {
      processing: false,
      qrCodeContent: "",
      tabelHeader: [
          {
            key: 'biblio_id',
            label: 'ID',
            sortable: false,
          },
          {
            key: 'title',
            label: 'Judul',
            sortable: false,
          },
          {
            key: 'fullAuthor',
            label: 'Penulis',
            sortable: false,
          },
          {
            key: 'inventory_code',
            label: 'Rak Buku',
            sortable: false,
          }
        ],
      items: [
        { 
          biblio_id: 1, 
          title: 'Mark', 
          fullAuthor: 'Otto',
          inventory_code: '91287321'
        },
      ],
    };
  },
  methods: {
    openScanner () {
      this.$refs.modalScanner.show()
      setTimeout(() => {
        this.startQrScanner()
      }, 10)
    },
    async goBack() {
      // this.$router.push({
      //   name: 'landing-page',
      // })
      console.log(this.currentUser)
    },
    handleQrScan(result) {
      try {
        const data = _.get(result, 'data', '')
        const regexItemCode = /itemCode: "([^"]+)"/;
        const regexTitle = /title: "([^"]+)"/;
        const itemCodeArr = data.match(regexItemCode);
        const titleArr = data.match(regexTitle);

        if (itemCodeArr && titleArr) {
          this.bookProcess = false
          this.$refs.modalScanner.hide()
          const itemCode = itemCodeArr[1];
          const title = titleArr[1];
          const payload = {
            itemCode,
            title
          }
          console.log('hmm?')
          this.searchRentBook(payload)
          this.qrScanner.stop();
        }
      } catch (error) {
        console.log(error)
      }
    },
    async searchRentBook (payload) {
      try {
        this.$refs.loading.show()
        const headers = {
          token: _.get(this.currentUser, 'token')
        }
        const response = await axios.post(`${apiBackend}/search-rent-book`, payload, { headers });
        const data = _.get(response, 'data.data')
        data.item_code = _.get(data, 'items[0].item_code')
        data.inventory_code = _.get(data, 'items[0].inventory_code')
        this.items.push(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.$refs.loading.hide()
      }
    },
    startQrScanner () {
      this.qrScanner = new QrScanner(this.$refs.videoObject, this.handleQrScan, {
        onDecodeError: (error) => {
          if (error === "No QR code found") return;
          console.log(error);
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      });
      this.qrScanner.start();
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
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
.qr-scan {
  max-width: 100%;
}
.qr-scanner {
  max-width: 100%;
}
.custom-rounded {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
</style>
