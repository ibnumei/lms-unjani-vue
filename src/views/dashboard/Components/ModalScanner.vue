<template>
  <b-modal
    :hideHeaderClose="false"
    :no-close-on-backdrop="false"
    id="modallg"
    ref="modalScanner"
    size="lg"
    title="Scan Buku"
    hide-footer
  >
    <slot name="button"></slot>
    <div class="qr-scanner">
      <video class="qr-scan" ref="videoObject"></video>
    </div>
  </b-modal>
</template>
<script>
import _ from 'lodash'
import QrScanner from "qr-scanner";

export default {
  props: {
    value: { default: null },
    onScan: { type: Function, default: () => {} }
  },
  data () {
    return {
      qrValue: null
    }
  },
  methods: {
    startQrScanner () {
      this.qrScanner = new QrScanner(this.$refs.videoObject, this.handleQrScan, {
        onDecodeError: (error) => {
          if (error === "No QR code found") return;
          console.log(error);
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      });
      this.qrScanner.start();
    },
    handleQrScan(result) {
      const data = _.get(result, 'data', null)
      if (data === this.qrValue) {
        return
      } else {
        this.qrValue = data
        this.onScan(data);
        this.$emit('input', data);
      }
    },
    openScanner () {
      this.qrValue = null
      this.$refs.modalScanner.show()
      setTimeout(() => {
        this.startQrScanner()
      }, 10)
    },
    stopQrScanner () {
      this.qrScanner.stop();
    },
    closeScanner () {
      this.stopQrScanner()
      this.$refs.modalScanner.hide()
    }
  }
};
</script>

<style lang="scss" scoped>
.qr-scan {
  max-width: 100%;
}
.qr-scanner {
  max-width: 100%;
}
.custom-rounded {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.qrcode {
  display: inline-block;
  font-size: 0;
  margin-bottom: 0;
  position: relative;
}
.qrcode__image {
  background-color: #fff;
  border: 0.25rem solid #fff;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 15%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 15%;
}
</style>