<template>
  <div>
    <e-chart-area
    :data="items_"
    :labels="labels"
  />
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import Area from '@/components/Customs/Charts/Area'
import { apiBackend } from '@/constants/config'
import FormTool from '@/components/Customs/FormTool'

export default {
  props: {
    data: {
      type: Array,
    },
    containerClass: {
      type: String,
      default: "chart-container",
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    titleIcon: { type: String, default: '' },
    title: { type: String, default: null },
    picker: { type: String, required: true, default: '' },
    dataScope: { type: Boolean, required: false, default: false },
    perPage: { type: Number, required: false, default: 10 },
    sortBy: { type: String, required: false, default: '' },
    sortDesc: { type: Boolean, required: false, default: false },
    search: { type: String, required: false, default: '' },
    filters: { type: Array, required: false, default: () => [] },
    loaded: { type: Function, default: null },
    renderButton: { type: Function, default: null },
    disabledButton: { type: Function, default: null },
    renderTooltip: { type: Function, default: null },
    url: { type: String, default: apiBackend },
    pagination: { type: Boolean, required: false, default: true },
    showNoteReport: { type: Boolean, required: false, default: false },
    refreshData: { type: Function, default: null },
    showCheckbox: { type: Boolean, default: false },
    selectedFlag: { type: String, required: false }
  },
  data () {
    return {
      labels: [],
      currentPage_: 1,
      totalRows_: 0,
      columns_: [],
      items_: [],
      fields_: [],
      picker_: this.picker,
      perPage_: this.perPage,
      sortBy_: this.sortBy,
      sortDesc_: this.sortDesc,
      search_: this.search,
      filters_: this.filters,
      color_: '#ea7f25',
      size_: '15px',
      isBusy: false,
      isAllDataSelected: false
    }
  },
  components: {
    'e-chart-area': Area
  },
  methods: {
    async fetchPicker () {
      this.isBusy = true // Show loading
      const response = await axios.get(`${this.url}/paging/picker?picker=${this.picker}`)
      const data = _.get(response, 'data', []);
      const labels = []
      data.forEach(element => {
        labels.push(element.title)
      });
      this.labels = labels
    },
    async fetchData () {
      const param = {
        'picker': this.picker,
        'dataScope': this.dataScope,
        'page': this.currentPage_ - 1,
        'pageSize': this.perPage_,
        'orderColumn': this.sortBy_,
        'orderDir': this.sortDesc_ ? 'desc' : 'asc',
        'search': this.search_,
        'filters': this.filters_.filter(e => {
          let conditon = (e.value != null && e.value !== '') // untuk menjagain objt single non array
          if (conditon && Array.isArray(e.value)) { // Lalukan checking bila object adalah Array
            conditon = e.value.length > 0 // cek if array cek length harus lebih dari 0, bila > 0 condition true, else false
          }
          return conditon
        })
      }
      this.isBusy = true // Loading
      return axios.post(this.url + '/paging/fetch', param)
        .then(response => {
          this.isBusy = false // Hide loading
          if (response.status === 200) {
            const result = response.data
            if (result.success) {
              console.log(result.rows)
              const rows = _.get(result, 'rows[0]', [])
              const items = []
              Object.keys(rows).forEach(key => {
                items.push(rows[key])
              });
              this.items_ = items
            } else {
              this.items_ = []
              if (result.message) {
                FormTool.popupWarning(this, 'Informasi', result.message)
              }
            }
          } else {
            this.items_ = []
          }

          if (this.loaded) {
            this.loaded(true)
          }
          if (this.showCheckbox) {
            this.setIsAllDataSelected()
          }

          return response
        }).catch(() => {
          this.items_ = []
          this.totalRows_ = 0
          this.isBusy = false // Hide loading
          if (this.loaded) {
            this.loaded(false)
          }
        })
    },
  },
  mounted() {
    this.fetchPicker()
    this.fetchData()
  }
}
</script>