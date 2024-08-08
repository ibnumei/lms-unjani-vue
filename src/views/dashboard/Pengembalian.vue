<template>
  <b-body>
    <e-loading ref="loading" />
    <e-scanner ref="modalScanner" @on-scan="handleQrScan" />
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
      :show-action="'verify'"
      :verified-item-code="verifiedItemCode"
      @submit-data="submitReturnBook"
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
      qrCodeContent: null,
      items: [],
      verifiedItemCode: []
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
    async submitReturnBook () {
      try {
        this.$refs.loading.show()

        const headers = {
          token: _.get(this.currentUser, 'token')
        }
        const payload = {
          kode_pinjam: this.qrCodeContent,
          id_item_stock: this.verifiedItemCode
        }
        const response = await axios.put(`${apiBackend}/rent-book`, payload, { headers });
        console.log(response)
        const data = _.get(response, 'data.success')
        if (!!data) {
          this.$notify(
            'success',
            'Notifikasi!',
            'Buku Berhasil Dikembalikan',
            {
              duration: 3000,
              permanent: false
          });
          await this.stopRecording(this.qrCodeContent)
        } else {
          this.$notify(
            'warning',
            'Perhatian!',
            _.get(response, 'data.message' , 'Data Tidak ditemukan atau status sudah dikembalikan'),
            {
              duration: 3000,
              permanent: false
          });
        }
      } catch (error) {
        console.log(error)
        this.commonErrorNotif()
      } finally {
        this.$refs.loading.hide()
      }
    },
    handleQrScan(result) {
      try {
        const payload = result;

        if (!!payload && (payload !== this.qrCodeContent)) {
          this.qrCodeContent = payload
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
        const response = await axios.get(`${apiBackend}/search-return-book/${payload}`, { headers });
        const data = _.get(response, 'data.data', [])
        const success = _.get(response, 'data.success')
        if (!success) {
          this.qrCodeContent = null
          this.items = []
          return this.$notify(
          'error',
          'Peringatan!',
          _.get(response, 'data.message', 'Terjadi Kesalahan'),
          {
            duration: 3000,
            permanent: false
          });
        }
        data.forEach((element) => {
          element.item_code = _.get(element, 'items[0].item_code')
          element.inventory_code = _.get(element, 'items[0].inventory_code')
          element.verified = false
        });
        this.items = data
      } catch (error) {
        this.commonErrorNotif()
        console.log(error)
      } finally {
        this.$refs.loading.hide()
      }
    }
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
