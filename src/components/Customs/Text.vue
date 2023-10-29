<template>
  <b-colxx
    id="bColxx"
    :xxs="d_xxs"
    :sm="d_sm"
    :md="d_md"
    :lg="d_lg"
    v-if="d_show"
  >
    <label class="form-group has-float-label">
      <b-input-group size="md" :prepend="prepend" :append="append">
        <b-form-input
          :readonly="readonly"
          :id="id"
          :maxlength="maxlength"
          :minlength="minlength"
          :disabled="d_disabled"
          :state="fState"
          v-model="d_value"
          :text="d_value"
          @input="fInput"
          @blur="fBlur"
          @keyup="fKeyup"
          :type="type"
          :class="`form-control ${inputClass}`"
          :style="addedStyle"
        />
      </b-input-group>
      <div class="d-flex justify-content-end align-item-center">
        <small class="text-danger p-1" v-for="(error, index) in d_errors" :key="`${index}-error-${label}`">
          <span>{{ error }}</span>
        </small>
      </div>
      <legend tabindex="-1" class="bv-no-focus-ring col-form-label pt-0">
        {{ label }}
      </legend>
    </label>
  </b-colxx>
</template>
<script>
import commonInputMixin from "@/mixins/commonInputMixin";
export default {
  mixins: [commonInputMixin]
};
</script>