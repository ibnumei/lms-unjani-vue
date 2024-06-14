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
import qz from 'qz-tray';
import jsrsasign from 'jsrsasign'

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
      try {
        // Connect to QZ Tray
        await qz.websocket.connect();

        // List available printers
        const printers = await qz.printers.find();
        console.log(printers); // Log available printers to the console

        // Check if the specific printer is connected
        const printerName = "POS-58C"; // Replace with your printer name
        let printerStatus
        if (printers.includes(printerName)) {
          printerStatus = `${printerName} is connected.`;
        } else {
          printerStatus = `${printerName} is not connected.`;
        }

        // Create a configuration for the specified printer
        const config = qz.configs.create(printerName, { encoding: 'ISO-8859-1' });

        // The QR data
        const qr = this.qr;

        // The dot size of the QR code
        const dots = '\x09';

        // Some proprietary size calculation
        const qrLength = qr.length + 3;
        const size1 =  String.fromCharCode(qrLength % 256);
        const size0 = String.fromCharCode(Math.floor(qrLength / 256));

        const data = [
          '\x1B' + '\x40',          // init
          '\x1B' + '\x61' + '\x31', // center align
          '\x1B' + '\x45' + '\x0D', // bold on
          'Transaksi Berhasil' + '\x0A',
          '\x1B' + '\x45' + '\x0A', // bold off
          '--------------------------------' + '\x0A',
          'Harap Simpan' + '\x0A',     // text and line break
          'Bukti Peminjaman Ini' + '\x0A',     // text and line break
          '\x0A',                   // line break
          '\x1B' + '\x45' + '\x0D', // bold on
          'Kode Peminjaman : ' + '\x0A',
          qr + '\x0A',
          '\x1B' + '\x45' + '\x0A', // bold off
          '\x0A',
          '\x0A',
          // <!-- BEGIN QR DATA -->
          '\x1D' + '\x28' + '\x6B' + '\x04' + '\x00' + '\x31' + '\x41' + '\x32' + '\x00',    // <Function 165> select the model (model 2 is widely supported)
          '\x1D' + '\x28' + '\x6B' + '\x03' + '\x00' + '\x31' + '\x43' + dots,               // <Function 167> set the size of the module
          '\x1D' + '\x28' + '\x6B' + '\x03' + '\x00' + '\x31' + '\x45' + '\x30',             // <Function 169> select level of error correction (48,49,50,51) printer-dependent
          '\x1D' + '\x28' + '\x6B' + size1 + size0 + '\x31' + '\x50' + '\x30' + qr,          // <Function 080> send your data (testing 123) to the image storage area in the printer
          '\x1D' + '\x28' + '\x6B' + '\x03' + '\x00' + '\x31' + '\x51' +'\x30',              // <Function 081> print the symbol data in the symbol storage area
          '\x1D' + '\x28' + '\x6B' + '\x03' + '\x00' + '\x31' + '\x52' +'\x30',              // <Function 082> Transmit the size information of the symbol data in the symbol storage area
          // <!-- END QR DATA -->
          '\x0A',
          '\x0A',
          '\x1B' + '\x61' + '\x30', // left align       
          '\x1B' + '\x45' + '\x0D', // bold on
          'Nama : ' + this.namaPeminjam + '\x0A',
          'Tanggal : ' + this.tanggalPeminjaman,
          '\x1B' + '\x61' + '\x30', // left align
          '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A' + '\x0A',
          '\x1B' + '\x69',          // cut paper (old syntax)
        ]

        // Print
        await qz.print(config, data);

        // Disconnect from QZ Tray
        await qz.websocket.disconnect();
      } catch (error) {
        console.error('Error checking printer connection:', error);
        this.printerStatus = 'Error checking printer connection.';
      }
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
    qz.security.setCertificatePromise((resolve, reject) => {
          // Load the certificate and passphrase
          resolve(process.env.VUE_APP_QZ_DIGITAL_CERTIFICATE);
        });

        const privateKey = process.env.VUE_APP_QZ_PRIVATE_KEY;
        qz.security.setSignatureAlgorithm("SHA512"); // Since 2.1
        qz.security.setSignaturePromise(function(toSign) {
            return function(resolve, reject) {
                try {
                    // const pk = KEYUTIL.getKey(privateKey);
                    const pk = jsrsasign.KEYUTIL.getKeyFromPlainPrivatePKCS8PEM(privateKey)
                    // const sig = new KJUR.crypto.Signature({"alg": "SHA512withRSA"});  // Use "SHA1withRSA" for QZ Tray 2.0 and older
                    const sig = new jsrsasign.KJUR.crypto.Signature({"alg": "SHA512withRSA"});
                    sig.init(pk); 
                    sig.updateString(toSign);
                    const hex = sig.sign();
                    resolve(jsrsasign.stob64(jsrsasign.hextorstr(hex)));
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            };
        });
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
