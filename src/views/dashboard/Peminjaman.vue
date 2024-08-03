<template>
  <b-body>
    <e-loading ref="loading" />
    <e-scanner ref="modalScanner" @on-scan="handleQrScan" v-model="qrCodeContent" />
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
          <span class="label">Scan QRCode</span>
        </b-button>
      </div>
    </b-card>
    <e-books-table
      class="mt-4"
      v-model="items"
      :show-action="'delete'"
      @submit-data="submitRent"
    />
    <div class="video-recorder" v-show="false">
      <video ref="video" playsinline autoplay></video>
      <button @click="startRecording">Start Recording</button>
      <button @click="stopRecording">Stop Recording</button>
      <a :href="videoUrl" download="recorded-video.webm" v-if="videoUrl">Download Video</a>
    </div>
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
import mixinRecording from './mixinRecording'

export default {
  mixins: [mixinRecording],
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
    goBack () {
      !!this.modalGeneratedRent && this.$router.push({
        name: 'generate-qr',
        params: {
          qr: this.modalGeneratedRent
        }
      })
    },
    checkExpiredDate() {
      const currentFullDate = new Date();
      let expireDate;

      if (this.currentUser.expire_date && this.currentUser.expire_date !== '0000-00-00') {
        expireDate = new Date(this.currentUser.expire_date);
      } else {
        expireDate = new Date('1945-08-17');
      }

      return expireDate < currentFullDate;
    },
    async submitRent () {
      if (this.items.length === 0) {
        return this.$notify(
          'error',
          'Peringatan!',
          'Silahkan Scan QR Buku yang akan dipinjam',
          {
            duration: 3000,
            permanent: false
        });
      }
      if (this.items.length > 2) {
        return this.$notify(
          'error',
          'Peringatan!',
          'Jumlah buku harus 2',
          {
            duration: 3000,
            permanent: false
        });
      }
      if(this.checkExpiredDate())  {
        return this.$notify(
          'error',
          'Peringatan!',
          'Akun anda sudah expired',
          {
            duration: 3000,
            permanent: false
        });
      }
      try {
        this.$refs.loading.show()

        const payload = []
        payload.push(_.get(this.items, '[0]items[0]'))
        if(this.items.length > 1) {
          payload.push(_.get(this.items, '[1]items[0]'))
        }
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
          this.modalGeneratedRent = data;
          await this.stopRecording(data)
        }
      } catch (error) {
        console.log(error)
        this.commonErrorNotif()
      } finally {
        this.$refs.loading.hide()
      }
    },
    handleQrScan(itemCode) {
      try {
        // const data = result;
        // const regexItemCode = /itemCode: "([^"]+)"/;
        // const regexTitle = /title: "([^"]+)"/;
        // const itemCodeArr = data.match(regexItemCode);
        // const titleArr = data.match(regexTitle);

        // if (itemCodeArr && titleArr) {
        //   const itemCode = itemCodeArr[1];
        //   const title = titleArr[1];
          // handle multiple book with same item_code
          const existingBooks = _.find(this.items, { item_code: itemCode });
          if (!!existingBooks) {
            return
          }
          const payload = {
            itemCode
          }
          this.searchRentBook(payload)
        // }
      } catch (error) {
        console.log(error)
        this.commonErrorNotif()
      }
    },
    openScanner () {
      if (this.items.length >= 2) {
        return this.$notify(
          'error',
          'Perhatian!',
          'Peminjaman tidak boleh lebih dari 2 buku',
          {
            duration: 3000,
            permanent: false
        });
      }
      this.$refs.modalScanner.openScanner()
    },
    async searchRentBook (payload) {
      try {
        this.$refs.loading.show()
        const headers = {
          token: _.get(this.currentUser, 'token')
        }
        const response = await axios.post(`${apiBackend}/search-rent-book`, payload, { headers });
        const success = _.get(response, 'data.success')
        if (!success) {
          const message = _.get(response, 'data.message')
          return this.$notify(
          'error',
          'Peringatan!',
          message,
          {
            duration: 3000,
            permanent: false
        });
        }
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
  },
  computed: {
    ...mapGetters(['currentUser']),
    path () {
      return this.$route.params.path
    }
  },
  mounted() {
    if (!this.currentUser || !this.currentUser.type === 'Member') {
      this.$router.push({
        name: 'login',
        params: {
          path: this.$route.params.path
        }
      })
    } else {
      this.startRecording()
    }
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
