<template>
  <div>
    <e-loading ref="loading" />
    <b-modal
      :hideHeaderClose="false"
      :no-close-on-backdrop="true"
      id="modallg"
      ref="modalScanner"
      size="lg"
      title="Ubah Gambar Banner"
      hide-footer
      v-model="showModal"
      @close="closeModal"
    >
      <b-form-file
        class="mb-1"
        @change="onFileChange"
        accept="image/*"
        placeholder="Silahkan pilih file..."
        no-drop
      ></b-form-file>
      <div v-if="imagePreview">
        <img
          :src="imagePreview"
          alt="Image Preview"
          style="width: 100%; height: auto"
        />
      </div>
      <b-button
        class="mt-1"
        size="md"
        variant="outline-primary"
        @click="uploadFile"
      >
        <em class="simple-icon-cloud-upload"></em> Upload Gambar
      </b-button>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import { apiBackend } from "@/constants/config";
import Loading from "@/components/Customs/Loading";

export default {
  components: {
    "e-loading": Loading,
  },
  data() {
    return {
      fileId: null,
      selectedFile: null,
      imagePreview: null,
      errorMessage: "",
      showModal: false,
    };
  },
  methods: {
    openModal(payload) {
      this.fileId = _.get(payload, "data.id");
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedFile = null;
      this.imagePreview = null;
      this.errorMessage = "";
      this.fileId = null;
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (!file) {
        this.errorMessage = "No file selected";
        return;
      }

      if (!file.type.startsWith("image/")) {
        this.errorMessage = "Please select an image file";
        this.selectedFile = null;
        this.imagePreview = null;
        return;
      }

      this.selectedFile = file;
      this.imagePreview = URL.createObjectURL(file);
      this.errorMessage = "";
    },
    async uploadFile() {
      if (!this.selectedFile) {
        this.errorMessage = "Please select a file to upload";
        return;
      }

      const payload = {
        id: this.fileId,
      };

      console.log(payload);

      const formData = new FormData();
      formData.append("file", this.selectedFile);
      Object.keys(payload).forEach((e) => {
        if (e && payload[e]) {
          formData.append(e, payload[e]);
        }
      });

      try {
        this.$refs.loading.show()
        const response = await axios.post(
          `${apiBackend}/banner/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const success = _.get(response, 'data.success')
        if (success) {
          this.$notify(
          'success',
          'Notifikasi!',
          'Gambar Berhasil Diubah',
          {
            duration: 3000,
            permanent: false
          });
        }
        this.$emit('reload')
        this.closeModal()
      } catch (error) {
        console.error("Error uploading file:", error);
        this.errorMessage = "Gagal Ubah Gambar";
        return this.$notify(
          'error',
          'Peringatan!',
          'Gagal Ubah Gambar',
          {
            duration: 3000,
            permanent: false
        });
      } finally {
        this.$refs.loading.hide()
      }
    },
  },
};
</script>
