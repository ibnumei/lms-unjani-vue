<template>
    <b-colxx xxs="12">
      <b-row class="d-flex align-items-center">
        <b-col align-v="center">
          <h3>
            <span v-b-tooltip.hover="{ customClass:alignHover }" :title="title">
              <em v-bind:class="this.icon"></em> {{this.label}}
              &nbsp;
              <em v-if="title != ''" class="simple-icon-question question-mark"></em>
            </span>
          </h3>
        </b-col>
        <b-col v-if="refreshData" class="d-flex justify-content-end align-items-center">
          <b-button
            id="refresh"
            variant="outline-primary"
            class="default mb-3"
            @click="refreshData()"
            size="md"
          >
            Refresh
          </b-button>
        </b-col>
      </b-row>
      <hr style="margin-top: -1px;">
    </b-colxx>
  </template>
  <script>
  export default {
    props: {
      id: { type: String, default: '' },
      show: { type: Boolean, default: true },
      required: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      label: { type: String, default: '' },
      value: { type: String, default: '' },
      title: { type: String, default: '' },
      prepend: { type: String, default: null },
      append: { type: String, default: null },
      col: { type: String, default: '12,12,12,12' },
      maxlength: { type: Number, default: 24 },
      vruntime: { type: Function, default: null },
      icon: { type: String, default: '' },
      alignHover: { type: String, default: 'center' },
      refreshData: { type: Function, default: null }
    },
    data () {
      return {
        d_value: this.value,
        d_show: this.show,
        d_disabled: this.disabled,
        d_xxs: 0,
        d_sm: 0,
        d_md: 0,
        d_lg: 0,
        d_errros: [],
        d_typed: false
      }
    },
    created () {
      this.fSplitColumns()
    },
    watch: {
      col (n, o) { this.fSplitColumns() },
      value (n, o) {
        this.d_value = n
        this.validate()
      },
      show (n, o) { this.d_show = n },
      disabled (n, o) { this.d_disabled = n }
    },
    methods: {
      fSplitColumns () {
        const cols = this.col.split(',')
        this.d_xxs = cols.length > 0 ? cols[0].trim() : 0
        this.d_sm = cols.length > 1 ? cols[1].trim() : 0
        this.d_md = cols.length > 2 ? cols[2].trim() : 0
        this.d_lg = cols.length > 3 ? cols[3].trim() : 0
      }
    }
  }
  </script>
  