<template>
  <b-body>
    <b-card>
      <h1>Login</h1>
      <hr />
      <b-row>
        <e-text label="Nama" :required="true" v-model="form.nama" />
        <e-text
          label="Password"
          type="password"
          :required="true"
          v-model="form.password"
        />
      </b-row>
      <div class="card col-12 p-0">
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
import axios from "axios";
import Body from "../common/Body.vue";
import Text from "@/components/Customs/Text";
import { apiBackend } from "@/constants/config";

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
    async formSubmit() {
      // console.log(apiBackend, this.form)
      const response = await axios.post(`${apiBackend}/login`, this.form, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(response);
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.custom-rounded {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
</style>
