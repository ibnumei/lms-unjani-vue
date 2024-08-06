<template>
  <div>
    <e-loading ref="loading" />
    <b-row>
        <b-colxx xxs="12">
            <piaf-breadcrumb :heading="$t('menu.banner')" />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>

    <e-modal-upload ref="modalUpload" @reload="getHeaderImage" />

    <b-colxx xxs="12">
      <b-card class="mb-4">
        <b-row>
          <h3>Banner Home</h3><br><br>
        </b-row>
        <b-card>
          <div>
            <b-row>
              <b-colxx v-for="image in bannerHome" :key="image.id" sm="6" lg="4" xl="4" class="mb-3" >
                <e-single-image
                 @upload="openModal"
                  :data="{
                    ...image,
                    img: getImageUrl(image),
                    title: image.file_name
                  }"
                />
              </b-colxx>
            </b-row>
          </div>
        </b-card>
      </b-card>
    </b-colxx>

    <b-colxx xxs="12">
      <b-card class="mb-4">
        <b-row>
          <h3>Banner Pemimjaman</h3><br><br>
        </b-row>
        <b-card>
          <div>
            <b-row>
              <b-colxx v-for="image in bannerPeminjaman" :key="image.id" sm="6" lg="4" xl="4" class="mb-3" >
                <e-single-image
                 @upload="openModal"
                  :data="{
                    ...image,
                    img: getImageUrl(image),
                    title: image.file_name
                  }"
                />
              </b-colxx>
            </b-row>
          </div>
        </b-card>
      </b-card>
    </b-colxx>

    <b-colxx xxs="12">
      <b-card class="mb-4">
        <b-row>
          <h3>Banner Pengembalian</h3><br><br>
        </b-row>
        <b-card>
          <div>
            <b-row>
              <b-colxx v-for="image in bannerPengembalian" :key="image.id" sm="6" lg="4" xl="4" class="mb-3" >
                <e-single-image
                 @upload="openModal"
                  :data="{
                    ...image,
                    img: getImageUrl(image),
                    title: image.file_name
                  }"
                />
              </b-colxx>
            </b-row>
          </div>
        </b-card>
      </b-card>
    </b-colxx>
  </div>
</template>

<script>
import _ from 'lodash'
import Text from "@/components/Customs/Text";
import axios from "axios";
import { apiBackend } from "@/constants/config";
import ImageListItem from "./Banner/ImageListItem"
import ModalUpload from "./Banner/ModalUpload"
import Loading from "@/components/Customs/Loading";


export default {
  components: {
    "e-text": Text,
    "e-single-image": ImageListItem,
    "e-modal-upload": ModalUpload,
    "e-loading": Loading
  },
  data() {
    return {
      bannerImages: []
    };
  },
  methods: {
    openModal (payload) {
      this.$refs.modalUpload.openModal(payload)
    },
    async getHeaderImage() {
      try {
        this.$refs.loading.show()
        const response = await axios.get(`${apiBackend}/banner`);
        const data = _.get(response, 'data.data', []);
        this.bannerImages = data;
      } catch (error) {
        console.error('Failed to fetch images', error);
      } finally {
        this.$refs.loading.hide()
      }
    },
    getImageUrl(image) {
      const blob = new Blob([new Uint8Array(image.file.data)], { type: image.file_type });
      return URL.createObjectURL(blob);
    }
  },
  computed: {
    bannerHome() {
      return this.bannerImages.filter((obj) => obj.category === 'banner_home');
    },
    bannerPeminjaman() {
      return this.bannerImages.filter((obj) => obj.category === 'banner_peminjaman');
    },
    bannerPengembalian() {
      return this.bannerImages.filter((obj) => obj.category === 'banner_pengembalian');
    }
  },
  mounted() {
    this.getHeaderImage();
  }
}
</script>