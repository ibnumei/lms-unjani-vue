<template>
  <b-body>
    <b-card class="row">
      <h1>Login</h1>
      <hr />
      <div class="card col-12 p-0">
        <div class="home-carousel">
          <b-form
        @submit.prevent="formSubmit"
        class="av-tooltip tooltip-label-bottom"
      >
        <b-form-group :label="$t('user.email')" class="has-float-label mb-4">
          <b-form-input
            type="text"
            v-model="$v.form.email.$model"
            :state="!$v.form.email.$error"
          />
          <b-form-invalid-feedback v-if="!$v.form.email.required"
            >Please enter your email address</b-form-invalid-feedback
          >
          <b-form-invalid-feedback v-else-if="!$v.form.email.email"
            >Please enter a valid email address</b-form-invalid-feedback
          >
          <b-form-invalid-feedback v-else-if="!$v.form.email.minLength"
            >Your email must be minimum 4 characters</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group :label="$t('user.password')" class="has-float-label mb-4">
          <b-form-input
            type="password"
            v-model="$v.form.password.$model"
            :state="!$v.form.password.$error"
          />
          <b-form-invalid-feedback v-if="!$v.form.password.required"
            >Please enter your password</b-form-invalid-feedback
          >
          <b-form-invalid-feedback
            v-else-if="
              !$v.form.password.minLength || !$v.form.password.maxLength
            "
            >Your password must be between 4 and 16
            characters</b-form-invalid-feedback
          >
        </b-form-group>
        <div class="d-flex justify-content-end align-items-center">
          <b-button
            type="submit"
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
import Body from "../common/Body.vue";
import {
    validationMixin
} from "vuelidate";
const {
    required,
    maxLength,
    minLength,
    email
} = require("vuelidate/lib/validators");

export default {
  mixins: [validationMixin],
  validations: {
        form: {
            password: {
                required,
                maxLength: maxLength(16),
                minLength: minLength(4)
            },
            email: {
                required,
                email,
                minLength: minLength(4)
            }
        }
    },
  components: {
    "b-body": Body,
  },
  data() {
    return {
      form: {
                email: null,
                password: null
            },
    };
  },
  methods: {
    formSubmit() {
            this.$v.$touch();
            this.$v.form.$touch();
           // if (!this.$v.form.$anyError) {
                // this.login({
                //     email: this.form.email,
                //     password: this.form.password
                // });
            //}
        }
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
