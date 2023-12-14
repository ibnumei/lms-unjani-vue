<template>
  <b-body>
    <e-loading ref="loading" />
    <b-card class="p-1">
      <b-tabs content-class="mt-3" fill>
        <b-tab title="Daftar Peminjaman" @click="fetchDataRent" active>
          <e-paging-server
            ref="pagingMemberRent"
            title="Daftar Pemimjam Terbaru"
            class="mt-2"
            picker="pagingMemberRent"
            :perPage="5"
            search=""
            sortDesc
            :filters="filterMemberRent"
          />
        </b-tab>
        <b-tab title="Kartu Bebas Pustaka">
          <div class="mb-3 library-clearance-certificate" ref="pdfContent">
            <!-- Header -->
            <div class="header">
              <img
                src="/assets/logos/logo.png"
                alt="University Logo"
                class="logo"
              />
              <div class="university-info">
                <h2>Universitas Jenderal Achmad Yani</h2>
                <p>Jalan Ters Jenderal Sudirman Po.Box 148 (belakang RSU Dustira) Cimahi</p>
                <p>Gedung Poniman Lantai 3</p>
              </div>
              <div class="separator"></div>
            </div>

            <!-- Body -->
            <div class="body">
              <h3>SURAT KETERANGAN BEBAS PUSTAKA</h3>
              <!-- <p>No. surat: /D.20/LL/UNPAM/ /2022</p> -->

              <p>Yang bertanda tangan dibawah ini:</p>
              <ul>
                <li>Nama : {{currentUser.member_name}}</li>
                <li>NIM : {{currentUser.member_id}}</li>
                <li>Program Studi : {{currentUser.pin}}.</li>
              </ul>

              <p>
                Menerangkan bahwa Mahasiswa tersebut tidak mempunyai pinjaman
                pustaka.
              </p>
            </div>

            <!-- Footer -->
            <div class="footer">
              <div class="signature">
              </div>
              <div class="created-date">
                <p>Cimahi, {{ getCurrentDate() }}</p>
                <p>_______________________</p>
                <p>Pengurus Perpustakaan</p>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end align-items-center">
            <b-button @click="generatePDF"> Download </b-button>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-body>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import Body from "../common/Body.vue";
import { apiBackend } from "@/constants/config";
import Loading from "@/components/Customs/Loading";
import { mapGetters } from "vuex";
import PagingServer from "@/components/Customs/PagingServer";
import html2pdf from "html2pdf.js";

export default {
  components: {
    "e-paging-server": PagingServer,
    "e-loading": Loading,
    "b-body": Body,
  },
  data() {
    return {
      filterMemberRent: [
        {
          id: "id_member",
          value: null,
          opr: "EQUAL",
          type: "STRING",
        },
      ],
    };
  },
  methods: {
    initFilter() {
      this.filterMemberRent[0].value = this.currentUser.id;
    },
    getCurrentDate() {
      const currentDate = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return currentDate.toLocaleDateString('id-ID', options);
    },
    fetchDataRent() {
      this.$refs.pagingMemberRent.fetchData();
    },
    generatePDF() {
      const element = this.$refs.pdfContent;
      const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
      const options = {
        filename: `kartu_bebas_pustaka_${this.currentUser.member_id}_${timestamp}`, // Set your custom filename here
      };

      html2pdf().from(element).set(options).save();
    },
  },
  computed: {
    ...mapGetters(["currentUser"]),
    path() {
      return this.$route.params.path;
    },
  },
  mounted() {
    if (!this.currentUser || !this.currentUser.type === "Member") {
      return this.$router.push({
        name: "login",
        params: {
          path: this.$route.params.path,
        },
      });
    }
    this.initFilter();
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.library-clearance-certificate {
  max-width: 600px;
  margin: auto;
  font-family: 'Arial', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  width: 80px;
  height: 80px;
}

.university-info {
  margin-top: 10px;
}

.separator {
  border-top: 2px solid #000;
  margin: 10px 0;
}

.body {
  margin-bottom: 20px;
}

.footer {
  display: flex;
  justify-content: space-between;
}

.signature {
  text-align: center;
}

.created-date {
  text-align: right;
}
</style>
