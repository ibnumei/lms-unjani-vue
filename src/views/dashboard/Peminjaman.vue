<template>
  <b-body>
    <e-loading ref="loading" />
    <e-scanner ref="modalScanner" :on-scan="handleQrScan" v-model="qrCodeContent" />
    <b-card class="p-5">
      <div class="d-flex justify-content-center align-items-center">
        <b-button
          @click="openScanner"
          variant="primary"
          size="lg"
          :class="{
            'btn-multiple-state btn-shadow': true,
          }"
        >
          <i class="simple-icon-camera"></i>
          <span class="label">Scan Buku</span>
        </b-button>
      </div>
    </b-card>
    <e-books-table
      class="mt-4"
      v-model="items"
      :show-action="true"
      @submit-data="submitRent"
    />
  </b-body>
</template>

<script>
import _ from 'lodash'
import axios from "axios";
import Body from "../common/Body.vue";
import Text from "@/components/Customs/Text";
import { apiBackend } from "@/constants/config";
import Loading from "@/components/Customs/Loading";
import { mapGetters } from 'vuex';
import ModalScanner from './Components/ModalScanner.vue'
import BooksTable from './Components/BooksTable.vue'

export default {
  components: {
    "e-loading": Loading,
    "b-body": Body,
    "e-text": Text,
    'e-scanner': ModalScanner,
    'e-books-table': BooksTable
  },
  data() {
    return {
      qrCodeContent: "",
      modalGeneratedRent: null,
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
      !!this.modalGeneratedRent && this.$router.push({
        name: 'generate-qr',
        params: {
          qr: this.modalGeneratedRent
        }
      })
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
        payload.push(_.get(this.items, '[0]items[0]'))
        payload.push(_.get(this.items, '[1]items[0]'))
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
    handleQrScan(result) {
      console.log(result)
      try {
        const data = result;
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
          const payload = {
            itemCode,
            title
          }
          this.searchRentBook(payload)
        }
      } catch (error) {
        console.log(error)
        this.commonErrorNotif()
      }
    },
    openScanner () {
      this.$refs.modalScanner.openScanner()
    },
    async goBack() {
      this.$router.push({
        name: 'landing-page',
      })
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
        if (!!data) {
          this.$refs.modalScanner.closeScanner()
        }
      } catch (error) {
        this.commonErrorNotif()
        console.log(error)
      } finally {
        this.$refs.loading.hide()
      }
    },
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
