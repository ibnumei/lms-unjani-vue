<template>
  <div>
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
          label="Password"
          disabled
          type="text"
          v-model="form.password"
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
import Text from "@/components/Customs/Text";
import { mapGetters, mapMutations } from 'vuex';
import { setCurrentUser } from '@/utils'

export default {
  components: {
    "e-text": Text,
  },
  data () {
    return {
      form: {
        fullname: null,
        username: null,
        email: null,
        password: null,
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
    formSubmit () {
      const newCurrentUser = {
        ...this.currentUser,
        fullname: this.form.fullname,
        username: this.form.username ,
        email: this.form.email,
        phone: this.form.phone,
      }
      setCurrentUser(newCurrentUser)
      this.setUser(newCurrentUser)
    }
  },
  mounted () {
    this.setForm()
  }

}
</script>