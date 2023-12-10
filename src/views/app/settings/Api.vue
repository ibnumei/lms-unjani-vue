<template>
  <div>
    <b-row>
        <b-colxx xxs="12">
            <piaf-breadcrumb :heading="$t('menu.api')" />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>
    <b-row>
        <b-colxx xxs="12">
            <p>{{$t('menu.api')}}</p>
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
            <json-viewer :value="jsonDataMember"></json-viewer>
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
      }
    }
  }
}
</script>