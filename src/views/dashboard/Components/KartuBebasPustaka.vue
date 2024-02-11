<template>
  <div
    id="printableContent"
    style="padding: 1rem; margin: auto; font-family: Arial, sans-serif"
    ref="pdfContent"
  >
    <div style="text-align: center; margin-bottom: 20px">
      <img
        src="/assets/logos/logo.png"
        alt="University Logo"
        style="width: 100px; height: 100px"
      />
      <div style="margin-top: 10px">
        <h2>Universitas Jenderal Achmad Yani</h2>
        <em style="font-style: normal;">
          Jalan Ters Jenderal Sudirman Po.Box 148 (belakang RSU Dustira) Cimahi
        </em>
        <br/>
        <em style="font-style: normal;">Gedung Poniman Lantai 3</em>
      </div>
      <div style="border-top: 2px solid #000; margin: 10px 0"></div>
    </div>

    <div style="margin-bottom: 20px; padding-left: 2rem;">
      <h3>SURAT KETERANGAN BEBAS PUSTAKA</h3>

      <em style="font-style: normal;">Yang bertanda tangan dibawah ini:</em>
      <ul>
        <li>Nama : {{ memberInfo.member_name }}</li>
        <li>NIM : {{ memberInfo.member_id }}</li>
        <li>Program Studi : {{ memberInfo.pin }}.</li>
      </ul>

      <em style="font-style: normal;">
        Menerangkan bahwa Mahasiswa tersebut tidak mempunyai pinjaman pustaka.
      </em>
    </div>

    <div style="display: flex; justify-content: space-between; padding-right: 2rem;">
      <div style="text-align: center"></div>
      <div style="text-align: right;">
        <em style="font-style: normal;">Cimahi, {{ getCurrentDate() }}</em>
        <br/>
        <br/>
        <em style="font-style: normal;">____________________</em>
        <br/>
        <em style="font-style: normal;">Pengurus Perpustakaan</em>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    memberInfo: { default: () => {} },
  },
  methods: {
    getCurrentDate() {
      const currentDate = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      return currentDate.toLocaleDateString("id-ID", options);
    },
  },
};
</script>
<style scoped>
</style>