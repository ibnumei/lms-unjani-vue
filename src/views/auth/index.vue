<template>
  <b-body>
    <b-card>
      <h1>Login</h1>
      <b-row>
        <e-text 
          label="NIM" 
          :required="true" 
          v-model="form.nim" 
          :disabled="userNeverLogsIn"
        />
        <e-text
          label="Password"
          type="password"
          :required="true"
          v-model="form.password"
          :disabled="userNeverLogsIn"
        />
        <div class="col-12 p-0" v-if="userNeverLogsIn">
          <e-text
            label="New Password"
            type="password"
            :required="true"
            v-model="newPassword"
          />
          <e-text
            label="Confirm New Password"
            type="password"
            :required="true"
            v-model="confirmNewPassword"
          />
        </div>
      </b-row>
      <div class="col-12 p-0">
        <div class="home-carousel">
          <b-form class="av-tooltip tooltip-label-bottom">
            <div class="d-flex justify-content-end align-items-center">
              <b-button
                @click="checkLogin"
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
import { mapGetters, mapMutations } from 'vuex';

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
        nim: null,
        password: null,
        firstLogin: null
      },
      neverLoggedIn: false,
      newPassword: null,
      confirmNewPassword: null
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
        this.$notify('error', 'Peringatan!', 'NIM atau Password Salah atau User sudah tidak aktif', { duration: 3000, permanent: false });
      } finally {
        this.processing = false
        this.neverLoggedIn = false
        this.form.firstLogin = null
        this.newPassword = null
        this.confirmNewPassword= null
      }
    },
    async checkLogin() {
      if (!this.form.nim || !this.form.password) {
        this.$notify('warning', 'Peringatan!', 'Silahkan Isi Kolom NIM & Password', { duration: 3000, permanent: false });
        return
      }
      const response = await axios.post(`${apiBackend}/check-login`, this.form)
      const { data } = response.data
      if (!data) {
        return this.$notify('error', 'Peringatan!', 'NIM atau Password Salah atau User sudah tidak aktif', { duration: 3000, permanent: false });
      }
      if (!data.hasLoggedIn  && !this.newPassword && !this.confirmNewPassword)  {
        this.neverLoggedIn = true
        this.$notify('warning', 'Peringatan!', 'Anda Terdeteksi Pertama Kali Login, Silahkan Ganti Password', { duration: 3000, permanent: false });
        return
      }
      if (this.neverLoggedIn && (this.newPassword !== this.confirmNewPassword)) {
        this.$notify('error', 'Peringatan!', 'Password yang dimasukan tidak sama', { duration: 3000, permanent: false });
        return
      }
      if (this.neverLoggedIn) {
        this.form.newPassword = this.newPassword
        this.form.firstLogin = true
      }
      await this.formSubmit()
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    path () {
      return this.$route.params.path
    },
    userNeverLogsIn () {
      return this.neverLoggedIn
    }
  },
  mounted() {
    if (!['peminjaman', 'pengembalian', 'mahasiswa'].includes(this.path)) {
      this.$router.push({
        name: 'landing-page',
      })
    }
    if (this.currentUser && this.currentUser.type === 'Member') {
      this.$router.push({
        name: this.path,
      })
    }
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
