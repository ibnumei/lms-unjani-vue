<template>
  <b-body>
    <b-card>
      <div class="d-flex justify-content-center align-items-center" id="printableContent">
        <div
          style="
          width: 700px; 
          height: 700px; 
          border: 2px solid black; 
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
          "
        >
        <div style="align-items: center;">
          <div style="text-align: center;">
            <em style="font-style: normal; font-weight: bold; font-size: 50px;">Transaksi Berhasil</em>
            <div style="border-top: 2px solid #000; margin: 1em 1em 1em 1em"></div>
            <em style="font-style: normal; font-size: 18px;">Harap Simpan Bukti Peminjaman Ini</em>
            <br />
            <em style="font-style: normal; font-weight: bold; font-size: 18px;">Kode Peminjaman :</em>
            <br />
            <em style="font-style: normal; font-weight: bold; font-size: 18px;">{{qr}}</em>
          </div>
 
          <img 
          style="
          width: 450px; 
          height: 450px;
          "
          :src="qrCodeUrl" alt="QR Code">

          <div style="text-align: left;">
            <em style="font-style: normal; font-weight: bold; font-size: 18px;">Nama : {{namaPeminjam}}</em>
            <br />
            <em style="font-style: normal; font-weight: bold; font-size: 18px;">Tanggal : {{tanggalPeminjaman}}</em>
          </div>
          
        </div>
        
        </div> 
      </div>
      <div class="col-12 p-0 mt-2">
        <div class="home-carousel">
          <b-form class="av-tooltip tooltip-label-bottom">
            <div class="d-flex justify-content-end align-items-center">
              <b-button
              @click="printContent"
                variant="primary"
                size="lg"
                class=""
              >
                <span class="label">Print</span>
              </b-button>
              <b-button
                @click="goBack"
                variant="primary"
                size="lg"
                class="ml-2"
              >
                <span class="label">Tutup</span>
              </b-button>
            </div>
          </b-form>
        </div>
      </div>
    </b-card>
  </b-body>
</template>

<script>
import Body from "../common/Body.vue";
import { mapMutations } from 'vuex';
import QRCode from 'qrcode';
import _ from 'lodash';
import axios from "axios";
import { apiBackend } from "@/constants/config";
import moment from "moment";

export default {
  props: {
    isGoback: { type: Boolean, default: false }
  },
  components: {
    "b-body": Body,
  },
  data() {
    return {
      namaPeminjam: null,
      tanggalPeminjaman: null,
      qrCodeUrl: null
    };
  },
  methods: {
    ...mapMutations(['setUser']),
    async printContent() {
      await this.$htmlToPaper('printableContent');

    },
    goBack() {
      if (this.isGoback) {
        return this.$router.go(-1)
      }
      return this.$router.push({
        name: 'landing-page',
      })
    },
    async generateQRCode() {
      try {
        this.qrCodeUrl = await QRCode.toDataURL(this.$route.params.qr)
      } catch (error) {
        console.error('Error generating QR code:', error)
      }
    },
    async getQrInfo() {
      const headers = {
        token: _.get(this.currentUser, 'token')
      }
      const response = await axios.get(`${apiBackend}/qr-info/${this.qr}`, { headers });
      this.namaPeminjam = _.get(response, 'data.data.createdBy');
      const formattedDate = moment(_.get(response, 'data.data.tgl_pinjam')).locale('id').format('dddd D MMMM YYYY');
      this.tanggalPeminjaman = formattedDate;
    }
  },
  computed: {
    qr () {
      return this.$route.params.qr
    }
  },
  mounted() {
    this.generateQRCode()
    this.getQrInfo()
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.custom-rounded {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.qr-code {
  width: 400px !important;
  height: 400px !important;
}
</style>
