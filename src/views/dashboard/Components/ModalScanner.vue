<template>
  <b-modal
    :hideHeaderClose="false"
    :no-close-on-backdrop="true"
    id="modallg"
    ref="modalScanner"
    size="lg"
    title="Scan QRCode"
    hide-footer
    v-model="show"
    @close="closeAction"
  >
    <a-scanner />
      <b-input
        style="opacity: 0;"
        @blur="refocus"
        v-model="qrValue"
        ref="qrInput"
      />
  </b-modal>
</template>
<script>

import _ from "lodash";
import AnimatedQrScanner from './AnimatedQrScanner';

export default {
  props: {
    value: { default: null },
    onScan: { type: Function, default: () => {} },
  },
  components: {
    'a-scanner': AnimatedQrScanner
  },
  data() {
    return {
      qrValue: null,
      show: false,
    };
  },
  methods: {
    closeAction(asd) {
      this.show = false;
    },
    openScanner() {
      this.qrValue = null;
      this.show = true;
      setTimeout(() => {
        this.$refs.qrInput.focus()
      }, 10)
      window.addEventListener('keydown', this.handleKeyDown);
    },
    closeScanner() {
      window.removeEventListener('keydown', this.handleKeyDown);
      setTimeout(() => {
        this.show = false;
        this.qrValue = null;
      }, 10)
    },
    refocus() {
      if (this.show) {
        this.$refs.qrInput.focus();
      }
    },
    handleKeyDown(event) {
      if (event.key === "Enter") {
        this.$emit('on-scan', this.qrValue);
        this.closeScanner()
      }
    }
  },
  destroyed() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
};
</script>

<style lang="scss" scoped>

</style>