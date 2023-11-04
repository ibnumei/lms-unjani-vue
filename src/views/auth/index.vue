<template>
  <b-body>
    <b-card>
      <h1>Login</h1>
      <b-row>
        <e-text label="Nama" :required="true" v-model="form.nama" />
        <e-text
          label="Password"
          type="password"
          :required="true"
          v-model="form.password"
        />
      </b-row>
      <div class="col-12 p-0">
        <div class="home-carousel">
          <b-form class="av-tooltip tooltip-label-bottom">
            <div class="d-flex justify-content-end align-items-center">
              <b-button
                @click="formSubmit"
                variant="primary"
                size="lg"
                :disabled="processing"
                :class="{
                  'btn-multiple-state btn-shadow': true,
                  'show-spinner': processing,
                  'show-success': !processing && loginError === false,
                  'show-fail': !processing && loginError,
                }"
              >
                <span class="spinner d-inline-block">
                  <span class="bounce1"></span>
                  <span class="bounce2"></span>
                  <span class="bounce3"></span>
                </span>
                <span class="icon success">
                  <i class="simple-icon-check"></i>
                </span>
                <span class="icon fail">
                  <i class="simple-icon-exclamation"></i>
                </span>
                <span class="label">{{ $t("user.login-button") }}</span>
              </b-button>
            </div>
          </b-form>
        </div>
      </div>
    </b-card>
  </b-body>
</template>

<script>
import _ from 'lodash'
import axios from "axios";
import Body from "../common/Body.vue";
import Text from "@/components/Customs/Text";
import { apiBackend } from "@/constants/config";
import jwtDecode from 'vue-jwt-decode'
import { setCurrentUser } from '@/utils'
import { mapMutations } from 'vuex';

export default {
  components: {
    "b-body": Body,
    "e-text": Text,
  },
  data() {
    return {
      processing: false,
      loginError: null,
      form: {
        nama: null,
        password: null,
      },
    };
  },
  methods: {
    ...mapMutations(['setUser']),
    async formSubmit() {
      try {
        this.processing = true
        const response = await axios.post(`${apiBackend}/login`, this.form);
        const tokenDecode = jwtDecode.decode(_.get(response, 'data.data', {}))
        tokenDecode.token = _.get(response, 'data.data', {})
        setCurrentUser(tokenDecode)
        this.setUser(tokenDecode)
        localStorage.setItem('user', JSON.stringify(tokenDecode))
        this.$router.push({
          name: this.path,
        })
      } catch (error) {
        this.$notify('error', 'Peringatan!', 'Nama atau Password Salah', { duration: 3000, permanent: false });
      } finally {
        this.processing = false
      }
    },
  },
  computed: {
    path () {
      return this.$route.params.path
    }
  },
  mounted() {
    if (!['peminjaman', 'pengembalian'].includes(this.path)) {
      this.$router.push({
        name: 'landing-page',
      })
    }
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
