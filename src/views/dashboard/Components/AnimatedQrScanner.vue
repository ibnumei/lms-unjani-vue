<template>
  <div class="qr-code-container">
    <i class="fa fa-qrcode qr-icon"></i>
    <div class="qr-code"></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
.qr-code-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.qr-icon {
  font-size: 240px; /* Adjust icon size */
  position: absolute; /* Position the icon absolutely within the QR code box */
  top: 7%; /* Align the icon vertically in the middle */
  left: 50; /* Align the icon horizontally in the middle */
  z-index: 1;
}

.qr-code {
  width: 200px; /* Adjust size as needed */
  height: 200px; /* Adjust size as needed */
  background-color: white; /* Set background color */
  border: 2px solid black; /* Set border color and width */
  animation: pulse 2s infinite alternate; /* Animation */
}

.scan-line {
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 10px; /* Adjust thickness as needed */
  background-color: red; /* Set scanning line color */
  animation: scan 2s linear infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
