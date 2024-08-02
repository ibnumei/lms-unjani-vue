<template>
  <b-body>
    <b-card>
      <b-row class="flex-row">
        <img :src="books.image" class="card-img" />
        <b-colxx xxs="6" xs="6" lg="6">
          <b-card-body>
            <h2 class="mb-4">{{ books.title }}</h2>
            <h6 class="mb-4 card-subtitle">
              {{books.fullAuthor}}
            </h6>
            <hr />
            <h3 class="card-text text-muted text-small mb-1">
              Ketersediaan
            </h3>
            <b-table
              striped
              bordered
              responsive
              thead-class="hidden_header"
              :fields="headerKetersediaan"
              :items="books.items"
            >
              <template slot="item_code" slot-scope="data">
                <Barcode v-if="data.item.item_code" :value="data.item.item_code" />
              </template>
              <template slot="status" slot-scope="data">
                <b-badge class="mt-5" :variant="data.item.status == 'Tersedia' ? 'primary' : 'danger'" >{{ data.item.status }}</b-badge>
              </template>
            </b-table>
            <hr />
            <h3 class="card-text text-muted text-small mb-1">
              Informasi Detail
            </h3>
            <table >
                  <tbody class="s-table">      
                    <tr>
                      <th>Judul Seri</th>
                      <td>
                        {{ printText(books.series_title) }}
                      </td>
                    </tr>
                    <tr>
                      <th>No. Panggil</th>
                      <td>
                        {{ printText(books.call_number) }}
                      </td>
                    </tr>
                    <tr>
                      <th>Penerbit</th>
                      <td>
                        <span>
                          {{ printText(books.publisher_name) }} : {{ printText(books.place_place) }}., {{ printText(books.publish_year) }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>Deskripsi Fisik</th>
                      <td>
                        {{ printText(books.collation) }}
                      </td>
                    </tr>
                    <tr>
                      <th>Bahasa</th>
                      <td>
                        {{ printText(books.language_name) }}
                      </td>
                    </tr>
                    <tr>
                      <th>ISBN/ISSN</th>
                      <td>
                        {{ printText(books.isbn_issn) }}
                      </td>
                    </tr>
                    <tr>  
                      <th>Klasifikasi</th>
                      <td>
                        {{ printText(books.classification) }}
                      </td>
                    </tr>
                    <!-- <tr>
                      <th>Tipe Isi</th>
                      <td>
                        {{ printText(books.classification) }}
                      </td>
                    </tr>
                    <tr>
                      <th>Tipe Media</th>
                      <td>
                        <div itemprop="bookFormat" property="bookFormat">-</div>
                      </td>
                    </tr> -->
                    <!-- <tr>
                      <th>Tipe Pembawa</th>
                      <td>
                      <div itemprop="bookFormat" property="bookFormat">-</div>
                      </td>
                    </tr> -->
                    <tr>
                      <th>Edisi</th>
                      <td>
                        {{ printText(books.edition) }}
                      </td>
                    </tr>
                    <!-- <tr>
                      <th>Subyek</th>
                      <td>
                        <div class="s-subject" itemprop="keywords" property="keywords">-</div>
                      </td>
                    </tr> -->
                    <tr>
                      <th>Info Detil Spesifik</th>
                      <td>
                        {{ printText(books.spec_detail_info) }}
                      </td>
                    </tr>
                    <!-- <tr>
                      <th>Pernyataan Tanggungjawab</th>
                      <td>
                        <div itemprop="author" property="author">-</div>
                      </td>
                    </tr>     -->
                  </tbody>
            </table>
          </b-card-body>
        </b-colxx>
      </b-row>
    </b-card>
  </b-body>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import Body from "../common/Body.vue";
import Text from "@/components/Customs/Text";
import Barcode from "@/components/Customs/Barcode";
import { apiBackend } from "@/constants/config";
import jwtDecode from "vue-jwt-decode";

export default {
  components: {
    "b-body": Body,
    "e-text": Text,
    Barcode
  },
  data() {
    return {
      processing: false,
      loginError: null,
      headerKetersediaan: [
        { key: 'item_code', label: 'Kode Item' },
        { key: 'status', label: 'Status' },
      ],
      books: {
        imgSrc: null,
        title: null
      }
    };
  },
  methods: {
    async getDetails() {
      try {
        this.processing = true;
        const response = await axios.get(`${apiBackend}/book/${this.id}`);
        const books = _.get(response, "data.data", {});
        _.get(books, 'items', []).forEach(item => {
          item.call_number = books.call_number
        })
        books.fullAuthor = _.map(_.get(books, 'authors', []), 'author_name').join(', ');
        this.books = {
          ...books,
        };
      } catch (error) {
        this.$notify("error", "Peringatan!", "Terjadi Kesalahan Sistem", {
          duration: 3000,
          permanent: false
        });
      } finally {
        this.processing = false;
      }
    },
    printText(text) {
      if (!!text || text !== '') {
        return text
      }
      return '-'
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.getDetails();
  },
  beforeDestroy() {}
};
</script>
<style lang="scss">
.custom-rounded {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.card-img {
  width: 500px;
  max-height: 800px;
  height: 800px;
}
.hidden_header {
  display: none !important;
}
.s-table th, .s-table td {
  text-align: left;
  padding: 8px;
}

.s-table tr:nth-child(odd) {
  background-color: #f2f2f2;
}
</style>
