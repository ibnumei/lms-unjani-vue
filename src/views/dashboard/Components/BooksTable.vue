<template>
  <b-card>
    <h3>Daftar buku</h3>
    <b-table responsive hover :items="value" :fields="d_header">
      <template slot="actions" slot-scope="row">
        <b-button
          :id="`button_table_${row.index}`"
          size="xs"
          @click="deleteAction(row)"
          variant="outline-primary"
          class="default"
        >
          <em class="simple-icon-trash"></em> Hapus
        </b-button>
      </template>
    </b-table>
    <div class="d-flex justify-content-end">
      <b-button
        @click="submit"
        variant="primary"
        size="lg"
        class="btn-multiple-state btn-shadow mr-2"
      >
        <span class="label">Submit</span>
      </b-button>
      <b-button
        @click="goBack"
        variant="primary"
        size="lg"
        :class="{
          'btn-multiple-state btn-shadow': true,
        }"
      >
        <span class="label">Kembali</span>
      </b-button>
    </div>
  </b-card>
</template>
<script>
import _ from "lodash";
const tabelHeader = [
  {
    key: "biblio_id",
    label: "ID",
    sortable: false,
  },
  {
    key: "title",
    label: "Judul",
    sortable: false,
  },
  {
    key: "fullAuthor",
    label: "Penulis",
    sortable: false,
  },
  {
    key: "inventory_code",
    label: "Rak Buku",
    sortable: false,
  },
];
export default {
  props: {
    showAction: { default: false },
    value: { default: [] },
    onBack: { type: Function, default: null }
  },
  data() {
    return {
      d_header: []
    };
  },
  methods: {
    deleteAction(items) {
      const x = [...this.value];
      _.pullAt(x, items.index);
      this.$emit("input", x);
    },
    setHeader () {
      this.d_header = tabelHeader
      if (this.showAction) {
        this.d_header.push({
          key: "actions",
          label: "Action",
          sortable: false,
        });
      }
    },
    init () {
      this.setHeader()
    },
    goBack() {
      if (!!this.onBack) {
        return this.onBack()
      }
      this.$router.push({
        name: 'landing-page',
      })
    },
    submit () {
      this.$emit('submit-data')
    }
  },
  computed: {
  },
  mounted() {
    this.init()
  },
};
</script>