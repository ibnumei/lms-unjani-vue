<template>
  <div>
    <b-row>
        <b-colxx xxs="12">
            <piaf-breadcrumb :heading="$t('menu.api')" />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>

    <b-colxx xxs="12">
      <b-card class="mb-4">
        <b-row>
          <h3>API Reference - Daftar Member</h3><br><br>
          </b-row>
          <b-row>
            <p>GET https://{link}:port/lms-unjani/member?page=1&size=10</p>
          </b-row>
          <b-card>
            <json-viewer :value="jsonDataMember" :copyable="true"></json-viewer>
          </b-card>
      </b-card>
    </b-colxx>

    <b-colxx xxs="12">
      <b-card class="mb-4">
        <b-row>
          <h3>API Reference - Daftar Transaksi</h3><br><br>
          </b-row>
          <b-row>
            <p>GET https://{link}:port/lms-unjani/list-transaction?page=1&size=10</p>
          </b-row>
          <b-card>
            <json-viewer :value="jsonDataTransaction" :copyable="true"></json-viewer>
          </b-card>
      </b-card>
    </b-colxx>

    <b-colxx xxs="12">
      <b-card class="mb-4">
        <b-row>
          <h3>API Reference - Laporan Transaksi</h3><br><br>
          </b-row>
          <b-row>
            <p>GET https://{link}:port/lms-unjani/reprot-transaction?year=2023</p>
          </b-row>
          <b-card>
            <json-viewer :value="jsonReportTransaksi" :copyable="true"></json-viewer>
          </b-card>
      </b-card>
    </b-colxx>
  </div>
</template>

<script>
import Vue from "vue";
import Text from "@/components/Customs/Text";
import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)
export default {
  components: {
    "e-text": Text,
    "json-viewer": JsonViewer,
  },
  data(){
    return{
      jsonDataMember: {
        "success": true,
        "data": {
          "totalItems": 11000,
          "totalPages": 1100,
          "currentPage": 1,
          "members": [
            {
              "id": 6041,
              "member_id": "2311221036",
              "member_name": "Abriel Nur Rielanda",
              "gender": "0",
              "member_type_name": "Mahasiswa",
              "member_mail_address": "",
              "member_email": "abril.nurielanda@gmail.com",
              "member_since_date": "2022-10-04",
              "register_date": "2022-10-04",
              "expire_date": "2023-08-31",
              "member_notes": "",
              "input_date": "2022-10-14",
              "last_update": "2022-10-20",
              "tgl_join": "2023-12-06T07:29:38.000Z"
            }
          ]
        }
      },
      jsonDataTransaction: {
        "success": true,
        "data": [
          {
            "id": 21,
            "kode_pinjam": "8d9594f9-7d8e-4494-893d-4b95345e5683",
            "id_member": 6041,
            "id_book": 1,
            "id_item_stock": "010117021000101",
            "tgl_pinjam": "2023-10-31T06:42:57.000Z",
            "tgl_kembali": null,
            "status_pinjam": 1,
            "location_order": null,
            "member_name": "Abriel Nur Rielanda",
            "title": "Psikologi Sosial, Jilid 2"
          }
        ]
      },
      jsonReportTransaksi: {
        "success": true,
        "data": [
            {
                "Bulan": "Jan",
                "total_pinjam": 0,
                "total_pengembalian": 0
            },
            {
                "Bulan": "Feb",
                "total_pinjam": 0,
                "total_pengembalian": 0
            },
            {
                "Bulan": "Mar",
                "total_pinjam": 0,
                "total_pengembalian": 0
            },
            {
                "Bulan": "Apr",
                "total_pinjam": 0,
                "total_pengembalian": 0
            },
            {
                "Bulan": "May",
                "total_pinjam": 0,
                "total_pengembalian": 0
            },
            {
                "Bulan": "Jun",
                "total_pinjam": 0,
                "total_pengembalian": 0
            },
            {
                "Bulan": "Jul",
                "total_pinjam": 0,
                "total_pengembalian": 0
            },
            {
                "Bulan": "Aug",
                "total_pinjam": 0,
                "total_pengembalian": 0
            },
            {
                "Bulan": "Sep",
                "total_pinjam": 0,
                "total_pengembalian": 0
            },
            {
                "Bulan": "Oct",
                "total_pinjam": 4,
                "total_pengembalian": 1
            },
            {
                "Bulan": "Nov",
                "total_pinjam": 8,
                "total_pengembalian": 8
            },
            {
                "Bulan": "Dec",
                "total_pinjam": 0,
                "total_pengembalian": 0
            }
        ]
    }
    }
  }
}
</script>