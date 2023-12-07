<template>
  <div>
    <e-loading ref="loading" />
    <b-row>
        <b-colxx xxs="12">
            <piaf-breadcrumb :heading="$t('menu.account')" />
            <div class="separator mb-5"></div>
        </b-colxx>
    </b-row>
    <b-card>
      <b-row>
        <e-text
          label="Nama"
          type="text"
          v-model="form.fullname"
        />
        <e-text
          label="Username"
          type="text"
          v-model="form.username"
        />
        <e-text
          label="Email"
          type="text"
          v-model="form.email"
        />
        <e-text
          label="Password Lama"
          type="password"
          v-model="form.oldPassword"
        />
        <e-text
          label="Password Baru"
          type="password"
          v-model="form.newPassword"
        />
        <e-text
          label="Konfirmasi Password"
          type="password"
          v-model="form.confirmPassword"
        />
        <e-text
          label="Phone"
          type="text"
          v-model="form.phone"
        />
        <b-colxx xxs="12">
          <div class="d-flex justify-content-end align-items-center">
            <b-button
                @click="formSubmit"
                variant="primary"
                size="lg"
                :class="{
                  'btn-multiple-state btn-shadow': true,
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
                <span class="label">Simpan</span>
            </b-button>
          </div>
        </b-colxx>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
import Text from "@/components/Customs/Text";
import { mapGetters, mapMutations } from 'vuex';
import { setCurrentUser } from '@/utils'
import Loading from "@/components/Customs/Loading";
import { apiBackend } from "@/constants/config";

export default {
  components: {
    "e-text": Text,
    "e-loading": Loading,
  },
  data () {
    return {
      form: {
        fullname: null,
        username: null,
        email: null,
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
        phone: null
      }
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    ...mapMutations(['setUser']),
    setForm () {
      const { fullname, username, email, phone } = this.currentUser
      this.form.fullname = fullname
      this.form.username = username
      this.form.email = email
      this.form.phone = phone
    },
    async formSubmit () {
      try {
        this.$refs.loading.show()
        const headers = {
          token: _.get(this.currentUser, 'token')
        }
        const response = await axios.put(`${apiBackend}/user-admin`, this.form, { headers });
        const success = _.get(response, 'data.success');
        if (!success) {
          return this.$notify(
            'error', 
            'Perhatian!', 
            'Terjadi Kesalahan', 
            { 
              duration: 3000, 
              permanent: false 
          });
        }
        this.$notify(
          'success', 
          'Notifikasi!', 
          'Informasi Akun Berhasil Diubah', 
          { 
            duration: 3000, 
            permanent: false 
        });
        const newCurrentUser = {
          ...this.currentUser,
          fullname: this.form.fullname,
          username: this.form.username ,
          email: this.form.email,
          phone: this.form.phone,
        }
        setCurrentUser(newCurrentUser)
        this.setUser(newCurrentUser)
      } catch (error) {
        return this.$notify(
          'error', 
          'Perhatian!', 
          _.get(error, 'response.data.message', 'Terjadi Kesalahan'), 
          { 
            duration: 3000, 
            permanent: false 
        });
      } finally {
        this.$refs.loading.hide()
      }
    }
  },
  mounted () {
    this.setForm()
  }

}
</script>