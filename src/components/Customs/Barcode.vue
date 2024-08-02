<template>
  <div>
    <svg ref="barcode"></svg>
  </div>
</template>

<script>
import JsBarcode from 'jsbarcode';

export default {
  name: 'Barcode',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.generateBarcode();
  },
  watch: {
    value() {
      this.generateBarcode();
    }
  },
  methods: {
    generateBarcode() {
      JsBarcode(this.$refs.barcode, this.value, {
        format: "CODE128",
        lineColor: "#949494",
        width: 2,
        height: 100,
        displayValue: true
      });
    }
  }
};
</script>

<style scoped>
svg {
  max-width: 100%;
}
</style>
