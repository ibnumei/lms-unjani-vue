<template>
  <div class="vld-parent">
    <loading
      :active.sync="isLoading"
      :is-full-page="fullPage"
    ></loading>
  </div>
</template>
 
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  data() {
    return {
      isLoading: false,
      fullPage: true,
    };
  },
  components: {
    Loading,
  },
  methods: {
    show () {
      this.isLoading = true
    },
    hide () {
      this.isLoading = false
    }
  },
};
</script> 