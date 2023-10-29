<template>
  <b-body>
    <div class="row">
      <div class="col-12 p-0">
        <div class="home-carousel">
          <b-input-group class="mb-3">
            <b-form-input class="custom-rounded" />
            <b-input-group-append>
              <b-button variant="outline-white">Cari Buku</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <b-colxx lg="6" class="home-carousel pr-4 pl-3">
        <div class="card row" @click="redirectLogin('pengembalian')">
          <div class="card-body text-center">
            <div>
              <i class="iconsminds-inbox-into large-icon"></i>
              <h5 class="mb-3 font-weight-semibold">Pengembalian</h5>
            </div>
          </div>
        </div>
      </b-colxx>
      <b-colxx lg="6" class="home-carousel pl-4 pr-3">
        <div class="card row" @click="redirectLogin('peminjaman')">
          <div class="card-body text-center">
            <div>
              <i class="iconsminds-inbox-out large-icon"></i>
              <h5 class="mb-3 font-weight-semibold">Peminjaman</h5>
            </div>
          </div>
        </div>
      </b-colxx>
    </div>

    <div class="row">
      <div class="card col-12 p-0">
        <h2 class="text-dark pl-4 mt-4">Daftar Buku Terbaru</h2>
        <div class="home-carousel">
          <glide-component :settings="glideBookOption">
            <div
              class="card"
              v-for="(f, index) in bookContent"
              :key="`bookContent_${index}`"
            >
              <b-card class="flex-row" no-body>
                <div class="w-100 position-relative">
                  <img
                    class="card-img"
                    style="max-height: 210px"
                    :src="f.imgSrc"
                    alt="Card cap"
                  />
                </div>
              </b-card>
            </div>
          </glide-component>
        </div>
      </div>
    </div>
  </b-body>
</template>

<script>
import GlideComponent from "../../components/Carousel/GlideComponent";
import Body from "../common/Body.vue";

export default {
  components: {
    "glide-component": GlideComponent,
    "b-body": Body,
  },
  data() {
    return {
      glideBookOption: {
        type: "carousel",
        gap: 30,
        perView: 5,
        hideNav: false,
        peek: { before: 10, after: 10 },
        breakpoints: {
          600: { perView: 3 },
          992: { perView: 4 },
          1200: { perView: 5 },
        },
      },
      bookContent: [
        {
          imgSrc: "/assets/img/books/createthumb-1.jfif",
        },
        {
          imgSrc: "/assets/img/books/createthumb-2.jfif",
        },
        {
          imgSrc: "/assets/img/books/createthumb-3.jfif",
        },
        {
          imgSrc: "/assets/img/books/createthumb-4.jfif",
        },
        {
          imgSrc: "/assets/img/books/createthumb-5.jfif",
        },
        {
          imgSrc: "/assets/img/books/createthumb-6.jfif",
        },
      ],
    };
  },
  methods: {
    async getImagesFromName() {
      const response = [
        {
          id_book: 1,
          biblio_id: 21,
          title: "Psikologi Sosial, Jilid 2",
          edition: "5",
          isbn_issn: "",
          publisher_name: "Erlangga",
          publish_year: "1985",
          collation: "x,263 hal.illus, 17.5x25 cm",
          series_title: "",
          call_number: "302 SEA p",
          language_name: "Indonesia",
          place_place: "Jakarta",
          notes: "",
          image: "Psikologi_Sosial,_Jilid_2.jpg.jpg",
          classification: null,
          spec_detail_info: "",
          uid: null,
          input_date: "2007-01-01 05:12:40",
          last_date: null,
          isActive: null,
          modifiedDate: null,
          modifiedBy: null,
          createdDate: "2023-10-22T19:25:08.000Z",
          createdBy: null,
        },
        {
          id_book: 2,
          biblio_id: 20,
          title: "Psikologi Sosial, Jilid 1",
          edition: "5",
          isbn_issn: "",
          publisher_name: "Erlangga",
          publish_year: "1985",
          collation: "xii,275 hal.illus.17.5x25 cm",
          series_title: "",
          call_number: "302 SEA p",
          language_name: "Indonesia",
          place_place: "Jakarta",
          notes: "",
          image: "Psikologi_Sosial,_Jilid_1.jpg.jpg",
          classification: null,
          spec_detail_info: "",
          uid: null,
          input_date: "2007-01-01 05:12:40",
          last_date: null,
          isActive: null,
          modifiedDate: null,
          modifiedBy: null,
          createdDate: "2023-10-22T19:25:08.000Z",
          createdBy: null,
        },
        {
          id_book: 3,
          biblio_id: 19,
          title:
            "Psikologi Perkembangan : Pendekatan ekologi kaitannya dengan konsep diri dan penyesuaian diri pada remaja",
          edition: "",
          isbn_issn: "979-3304-58-8",
          publisher_name: "PT. Refika Aditama",
          publish_year: "2009",
          collation: "v,233 hlm,;24x16 cm",
          series_title: "",
          call_number: "155.25 AGU p",
          language_name: "Indonesia",
          place_place: "Bandung",
          notes: "",
          image: "Psikologi_Perkembangan_Hendriatil.jpg.jpg",
          classification: null,
          spec_detail_info: "",
          uid: null,
          input_date: "2007-01-01 05:12:40",
          last_date: null,
          isActive: null,
          modifiedDate: null,
          modifiedBy: null,
          createdDate: "2023-10-22T19:25:08.000Z",
          createdBy: null,
        },
        {
          id_book: 4,
          biblio_id: 17,
          title: "Kimia Anorganik Dasar",
          edition: "",
          isbn_issn: "979-456-029-4",
          publisher_name: "Perusahaan Umum Telekomunikasi",
          publish_year: "1989",
          collation: "viii, 665 hlm; ilus; Indeks:657-665; 23x15,5 cm",
          series_title: "",
          call_number: "546 COT k",
          language_name: "Indonesia",
          place_place: "Jakarta",
          notes: "",
          image: "Kimia_Anorganik_Dasar.jpg.jpg",
          classification: null,
          spec_detail_info: "",
          uid: null,
          input_date: "2007-01-01 05:12:40",
          last_date: null,
          isActive: null,
          modifiedDate: null,
          modifiedBy: null,
          createdDate: "2023-10-22T19:25:08.000Z",
          createdBy: null,
        },
        {
          id_book: 5,
          biblio_id: 18,
          title:
            "Psikologi Perkembangan : Suatu Pendekatan Sepanjang Rentang Kehidupan",
          edition: "5",
          isbn_issn: "13-00-008-8",
          publisher_name: "Erlangga",
          publish_year: "1980",
          collation: "xii, 447 hlm; ilus; 25 x 17,5 cm",
          series_title: "",
          call_number: "155.25 HUR p",
          language_name: "Indonesia",
          place_place: "Jakarta",
          notes: "",
          image: "13072009121227_17753.jpg.jpg",
          classification: null,
          spec_detail_info: "",
          uid: null,
          input_date: "2007-01-01 05:12:40",
          last_date: null,
          isActive: null,
          modifiedDate: null,
          modifiedBy: null,
          createdDate: "2023-10-22T19:25:08.000Z",
          createdBy: null,
        },
      ];
      this.bookContent = []
      response.forEach((element) => {
        // console.log(element.image)
         const imgSrc = `http://library-lama.unjani.id/lib/minigalnano/createthumb.php?filename=../../images/docs/${element.image}&width=200`

         this.bookContent.push({ imgSrc })
      });
      console.log(this.bookContent)
    },
    redirectLogin (path) {
      this.$router.push({
        name: 'login',
        params: {
          path
        }
      })
    }
  },
  mounted() {
    this.getImagesFromName();
    localStorage.removeItem('user')
  },
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.custom-rounded {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
</style>
