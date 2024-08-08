<template>
  <div>
    <e-loading ref="loading" />
    <e-scanner ref="modalScanner" @on-scan="handleQrScan" v-model="qrCodeContent" />
    <b-card>
      <h3>Daftar buku</h3>
      <b-table responsive hover :items="value" :fields="d_header">
        <template slot="actions" slot-scope="row">
          <b-button
            :id="`button_delete_table_${row.index}`"
            size="xs"
            @click="deleteAction(row)"
            variant="outline-primary"
            class="default"
          >
            <em class="simple-icon-trash"></em> Hapus
          </b-button>
        </template>
        <template slot="verify" slot-scope="row">
          <b-button
            v-if="!row.item.verified"
            :id="`button_verify_table_${row.index}`"
            size="xs"
            @click="openScanner(row.index)"
            variant="outline-primary"
            class="default"
            :disabled="row.item.disabled"
          >
            <em class="iconsminds-qr-code" />
          </b-button>
        </template>
      </b-table>
      <div class="d-flex justify-content-end">
        <b-button
          @click="submit"
          variant="primary"
          size="lg"
          class="btn-multiple-state btn-shadow mr-2"
        >
          <span class="label">Submit</span>
        </b-button>
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
    </b-card>
  </div>
</template>

<script>
import _ from "lodash";
import ModalScanner from './ModalScanner.vue'
import Loading from "@/components/Customs/Loading";
import { apiDrawer } from "@/constants/config";
import axios from "axios";


const tabelHeader = [
  {
    key: "biblio_id",
    label: "ID",
    sortable: false,
  },
  {
    key: "title",
    label: "Judul",
    sortable: false,
  },
  {
    key: "fullAuthor",
    label: "Penulis",
    sortable: false,
  },
  {
    key: "inventory_code",
    label: "Rak Buku",
    sortable: false,
  },
];

const REGEX_ITEM_CODE = /itemCode: "([^"]+)"/;
const REGEX_TITLE = /title: "([^"]+)"/;

export default {
  components: {
    'e-scanner': ModalScanner,
    "e-loading": Loading,
  },
  props: {
    showAction: { default: '' },
    value: { default: [] },
    onBack: { type: Function, default: null },
    verifiedItemCode: { default: [] }
  },
  data() {
    return {
      d_header: [],
      qrCodeContent: null,
      qrVerifyIndex: null
    };
  },
  methods: {
    deleteAction(items) {
      const x = [...this.value];
      _.pullAt(x, items.index);
      this.$emit("input", x);
    },
    setHeader () {
      this.d_header = [...tabelHeader]
      if (this.showAction === 'delete') {
        this.d_header.push({
          key: "actions",
          label: "Action",
          sortable: false,
        });
      }
      if (this.showAction === 'verify') {
        this.d_header.push({
          key: "verify",
          label: "Verifikasi",
          sortable: false,
          tdClass: 'text-center'
        });
      }
    },
    init () {
      this.setHeader()
    },
    goBack() {
      if (!!this.onBack) {
        return this.onBack()
      }
      this.$router.push({
        name: 'landing-page',
      })
    },
    submit () {
      const items = this.value || [];
      let allVerified = items.length > 0;
      items.forEach((item) => {
        allVerified = allVerified && item.verified
      })
      if(!allVerified) {
        return this.$notify(
            'error',
            'Peringatan!',
            'Harap Verifikasi Buku yang akan dikembalikan',
            {
              duration: 3000,
              permanent: false
            }
          );
      }
      this.$emit('submit-data')
    },
    openScanner (index) {
      this.qrVerifyIndex = index
      return this.$refs.modalScanner.openScanner()
    },
    async handleQrScan(itemCode) {
      try {
        this.$refs.loading.show()

        const itemMatch = this.value[this.qrVerifyIndex].item_code === itemCode
        // const titleMatch = this.value[this.qrVerifyIndex].title === title

        if (itemMatch) {
          if (![...this.verifiedItemCode].includes(itemCode)) {
            this.verifiedItemCode.push(itemCode)
          }
          this.value[this.qrVerifyIndex].verified = true
          
          // HIT Api Drawer with null payload when succesfully verification book 
          try {
            await axios.post(`${apiDrawer}`, {})
          } catch (error) {
            console.log('Failed to open API Drawer... ', error)
            this.$notify(
              'error',
              'Peringatan!',
              'Terjadi Kesalahan Pada Drawer...',
              {
                duration: 3000,
                permanent: false
              }
            );
          }

          this.$notify(
            'success',
            'Notifikasi!',
            'Berhasil Verifikasi Buku',
            {
              duration: 3000,
              permanent: false
            }
          );
        } else {
          this.$notify(
            'error',
            'Peringatan!',
            'QR Buku Tidak Sesuai',
            {
              duration: 3000,
              permanent: false
            }
          );
        }
      } catch(e) {
        console.error(e)

        this.$notify(
          'error',
          'Peringatan!',
          'QR Buku Tidak Sesuai',
          {
            duration: 3000,
            permanent: false
          }
        );
      } finally {
        this.$refs.loading.hide()
        this.$refs.modalScanner.stopQrScanner()
        return this.$refs.modalScanner.closeScanner()
      }
    }
  },
  mounted() {
    this.init()
  },
};
</script>
