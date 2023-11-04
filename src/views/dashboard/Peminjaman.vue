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
    <b-modal 
      :hideHeaderClose="false" 
      :no-close-on-backdrop="true" 
      id="modallgg" 
      ref="modalGeneratedRent" 
      size="lg" 
      title="Harap Simpan QR Berikut" 
      hide-footer
    >
      <div class="d-flex justify-content-center align-items-center">
        <qrcode :value="modalGeneratedRent" :options="{ width: '100%', height: '100%' }">
        </qrcode>
      </div>
    </b-modal>
    <v-loading :active.sync="processing" :is-full-page="true"></v-loading>
    <b-card class="p-5">
      <div class="d-flex justify-content-center align-items-center">
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
      <b-table hover :items="items" :fields="tabelHeader">
        <template #cell(actions)="row">
          <b-button :id="`button_table_${row.index}`" size="xs" @click="buttonAction(row)" variant="outline-primary" class="default">
            <em class="simple-icon-trash"></em> Hapus
          </b-button>
        </template>
      </b-table>
      <div class="d-flex justify-content-end">
        <b-button
          @click="submitRent"
          variant="primary"
          size="lg"
          :disabled="processing"
          class="btn-multiple-state btn-shadow mr-2"
        >
          <span class="label">Submit</span>
        </b-button>
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
      modalGeneratedRent: null,
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
          },
          {
            key: 'actions',
            label: 'Action',
            sortable: false,
          },
        ],
      items: [],
    };
  },
  methods: {
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
    showQRGenerated () {
      this.$refs.modalGeneratedRent.show()
    },
    async submitRent () {
      if (this.items.length !== 2) {
        return this.$notify(
          'error', 
          'Peringatan!', 
          'Jumlah buku harus 2', 
          { 
            duration: 3000, 
            permanent: false 
        });
      }
      try {
        this.$refs.loading.show()

        const payload = []
        payload.push(_.get(this.items, '[0]items'))
        payload.push(_.get(this.items, '[1]items'))
        const headers = {
          token: _.get(this.currentUser, 'token')
        }
        const response = await axios.post(`${apiBackend}/rent-book`, payload, { headers });
        const data = _.get(response, 'data.data')
        if (!!data) {
          this.$notify(
          'success', 
          'Notifikasi!', 
          'Buku Berhasil Ditambah', 
          { 
            duration: 3000, 
            permanent: false 
          });
        }
        this.modalGeneratedRent = data;
        this.showQRGenerated()
      } catch (error) {
        console.log(error)
        this.commonErrorNotif()
      } finally {
        this.$refs.loading.hide()
      }
    },
    buttonAction (items) {
      const x = [ ...this.items ]
      _.pullAt(x, items.index);
      this.items = x;
    },
    openScanner () {
      this.$refs.modalScanner.show()
      setTimeout(() => {
        this.startQrScanner()
      }, 10)
    },
    async goBack() {
      this.$router.push({
        name: 'landing-page',
      })
    },
    handleQrScan(result) {
      try {
        const data = _.get(result, 'data', '')
        const regexItemCode = /itemCode: "([^"]+)"/;
        const regexTitle = /title: "([^"]+)"/;
        const itemCodeArr = data.match(regexItemCode);
        const titleArr = data.match(regexTitle);

        if (itemCodeArr && titleArr) {
          const itemCode = itemCodeArr[1];
          const title = titleArr[1];
          // handle multiple book with same item_code
          const existingBooks = _.find(this.items, { item_code: itemCode });
          if (!!existingBooks) {
            return
          }
          this.bookProcess = false
          this.$refs.modalScanner.hide()
          const payload = {
            itemCode,
            title
          }
          this.searchRentBook(payload)
          this.qrScanner.stop();
        }
      } catch (error) {
        console.log(error)
        this.commonErrorNotif()
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
        this.commonErrorNotif()
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
.qrcode {
  display: inline-block;
  font-size: 0;
  margin-bottom: 0;
  position: relative;
}
.qrcode__image {
  background-color: #fff;
  border: 0.25rem solid #fff;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 15%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 15%;
}
</style>
