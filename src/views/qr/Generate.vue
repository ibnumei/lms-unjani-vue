<template>
  <b-body>
    <b-card>
      <h1>Harap Simpan QR Berikut</h1>
      <div class="d-flex justify-content-center align-items-center">
        <qrcode :value="qr" class="qr-code" :options="{ width: '100%', height: '100%' }">
        </qrcode>
      </div>
      <div class="col-12 p-0">
        <div class="home-carousel">
          <b-form class="av-tooltip tooltip-label-bottom">
            <div class="d-flex justify-content-end align-items-center">
              <b-button
              @click="goBack"
                variant="primary"
                size="lg"
                :class="{
                  'btn-multiple-state btn-shadow': true
                }"
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

export default {
  components: {
    "b-body": Body,
  },
  data() {
    return {
      form: {
        nama: null,
        password: null,
      },
    };
  },
  methods: {
    ...mapMutations(['setUser']),
    goBack() {
      this.$router.push({
        name: 'landing-page',
      })
    },
  },
  computed: {
    qr () {
      return this.$route.params.qr
    }
  },
  mounted() {
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
.qr-code {
  width: 500px !important;
  height: 500px !important;
}
</style>
