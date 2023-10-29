<template>
  <b-colxx
    id="bColxx"
    :xxs="12"
    :sm="12"
    :md="12"
    :lg="12"
    v-if="12"
  >
    <v-quagga
      :onDetected="onBarcodeScanned"
      :readerSize="readerSize"
      :readerTypes="detecteds"
      :patchSize="'medium'"
    ></v-quagga>
  </b-colxx>
</template>
<script>
export default {
  data () {
    return {
      readerSize: {
        width: 100,
        height: 480,
      },
      detecteds: [
        "code_128_reader",
        "ean_reader",
        "ean_8_reader",
        "code_39_reader",
        "code_39_vin_reader",
        "codabar_reader",
        "upc_reader",
        "upc_e_reader",
        "i2of5_reader",
        "2of5_reader",
        "code_93_reader",
      ],
      result: "",
      format: "",
    }
  },
  methods: {
    onBarcodeScanned(barcode) {
      console.log("detected", barcode);
      this.result = barcode.codeResult.code;
      this.format = barcode.codeResult.format;
      // do something...
    },
  },
};
</script>
<style lang="scss" scoped>
  .viewport canvas{
    width: 30px !important
  }
  .viewport video{
    width: 30px !important
  }
</style>