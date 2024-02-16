<template>
  <b-row>
    <e-loading ref="loading"/>
      <b-colxx xxs="12">
        <b-card class="mb-4">
          <e-title v-if="title" id="main-title" :label="title" :refreshData="refreshData" :icon="titleIcon" style="padding: 0;"></e-title>
          <b-row v-if="showCustomPerPage">
            <b-colxx sm="2">
              <b-form-select id="select=per-page" v-model="perPage_" :options="optionsPerPage" @change="setPerPage"></b-form-select>
            </b-colxx>
            <b-colxx sm="2">
              <b-button id="processAllData" variant="outline-primary" class="default" @click="processAllData()">Process Semua</b-button>
            </b-colxx>
          </b-row>

          <b-table
          id="serverPaging"
          responsive
          striped
          show-empty
          class="vuetable"
          :fields="fields_"
          :items="items_"
          :per-page="perPage_"
          :current-page="1"
          small
          :sort-by.sync="sortBy_"
          :sort-desc.sync="sortDesc_"
          @sort-changed="sortingChanged"
          @row-clicked="selectData"
          :busy="isBusy"
          >
          <div slot="table-busy" class="text-center text-danger my-2">
              <PulseLoader :color="color_" :size="size_"></PulseLoader>
          </div>
          <template slot="empty">
              <p class="text-center"><strong>Tidak Ada Data</strong></p>
          </template>
          <template slot="emptyfiltered">
              <p class="text-center"><strong>Data Tidak Ditemukan</strong></p>
          </template>
            <template slot="HEAD_checkbox">
              <b-form-checkbox
                :id="'CheckboxAllData'"
                :disabled="isAllCheckboxDisabled"
                @change="selectAllData"
                v-model="isAllDataSelected"
                :value="true"
                :unchecked-value="false"
              ></b-form-checkbox>
            </template>
          <template slot="action" slot-scope="row">
              <slot v-if="showButton('edit', row)">
                <b-button :id="'Edit_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="editData(row)">
                  <em class="simple-icon-pencil"></em>
                </b-button>
                <b-tooltip :target="'Edit_'+row.index" triggers="hover">
                  {{ showTooltip('edit','Edit') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('delete', row)">
                <b-button :id="'Delete_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="deleteData(row)">
                  <em class="simple-icon-trash"></em>
                </b-button>
                <b-tooltip :target="'Delete_'+row.index" triggers="hover">
                  {{ showTooltip('delete','Hapus') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('refresh', row)">
                <b-button :id="'Refresh_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="refreshData(row)">
                  <em class="simple-icon-refresh"></em>
                </b-button>
                <b-tooltip :target="'Refresh_'+row.index" triggers="hover">
                  {{ showTooltip('refresh','Refresh') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('detail', row)">
                <b-button :id="'Detail_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="detailData(row)"
                  :disabled="disabledAction('detail', row)"
                >
                  Detail
                </b-button>
                <b-tooltip :target="'Detail_'+row.index" triggers="hover">
                  {{ showTooltip('detail','Detail') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('assign', row)">
                <b-button :id="'Assign_'+row.index" size="xs" variant="outline-primary" class="default"
                          @click="_onClick(row, row.index, 'assign')"
                          :disabled="disabledAction('assign', row)"
                >
                  Assign
                </b-button>
                <b-tooltip :target="'Assign_'+row.index" triggers="hover">
                  {{ showTooltip('assign','Assign') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('reassign', row)">
                <b-button :id="'Reassign_'+row.index" size="xs" variant="outline-primary" class="default"
                          @click="_onClick(row, row.index, 'reassign')"
                          :disabled="disabledAction('reassign', row)"
                >
                  Reassign
                </b-button>
                <b-tooltip :target="'Reassign_'+row.index" triggers="hover">
                  {{ showTooltip('reassign','Reassign') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('download', row)">
                <b-button :id="'Download_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="downloadData(row)"
                  :disabled="disabledAction('download', row)"
                >
                  <em class="simple-icon-cloud-download"></em>
                </b-button>
                <b-tooltip :target="'Download_'+row.index" triggers="hover">
                 {{ showTooltip('download','Download') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('retry', row)">
                <b-button :id="'Retry_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="retryData(row)"
                  :disabled="disabledAction('retry', row)"
                >
                  Retry
                </b-button>
                <b-tooltip :target="'Retry_'+row.index" triggers="hover">
                  {{ showTooltip('retry','Retry') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('view', row)">
                <b-button :id="'View_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="viewData(row)">
                  <em class="simple-icon-eye"></em>
                </b-button>
                <b-tooltip :target="'View_'+row.index" triggers="hover">
                   {{ showTooltip('view','Lihat') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('add', row)">
                <b-button :id="'Add_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="addData(row)"
                  :disabled="disabledAction('addData', row)">
                  <em class="simple-icon-plus"></em>
                </b-button>
                <b-tooltip :target="'Add_'+row.index" triggers="hover">
                  {{ showTooltip('add','Tambah') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('Process', row)">
                <b-button :id="'Process_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="processData(row)">
                  Process
                </b-button>
                <b-tooltip :target="'Process_'+row.index" triggers="hover">
                  {{ showTooltip('Process','Process') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('Continue', row)">
                <b-button :id="'continue_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="continueData(row)">
                  Continue
                </b-button>
                <b-tooltip :target="'continue_'+row.index" triggers="hover">
                  {{ showTooltip('Continue','Continue') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('View', row)">
                <b-button :id="'view_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="viewData(row)">
                  View
                </b-button>
                <b-tooltip :target="'view_'+row.index" triggers="hover">
                  {{ showTooltip('View','View') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('banding', row)">
                <b-button :id="'Banding_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="bandingData(row)">
                  <em class="simple-icon-docs"></em>
                </b-button>
                <b-tooltip :target="'Banding_'+row.index" triggers="hover">
                  {{ showTooltip('banding','Banding') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('revise', row)">
                <b-button :id="'Revise_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="reviseData(row)">
                  Revisi
                </b-button>
                <b-tooltip :target="'Revise_' + row.index" triggers="hover">
                  {{ showTooltip('revise','Revisi') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('comment', row)">
                <b-button :id="'Comment_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'comment-data')">
                  <em class="simple-icon-bubble"></em>
                </b-button>
                <b-tooltip :target="'Comment_' + row.index" triggers="hover">
                  {{ showTooltip('comment','Komentar') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('cancel', row)">
                <b-button :id="'Cancel_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'cancel-data')"
                  :disabled="disabledAction('cancel', row)"
                >
                  Cancel
                </b-button>
                <b-tooltip :target="'Cancel_' + row.index" triggers="hover">
                  Cancel
                </b-tooltip>
              </slot>
              <slot v-if="showButton('undo', row)">
                <b-button :id="'Undo_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'undo-data')"
                  :disabled="disabledAction('undo', row)"
                >
                  Undo
                </b-button>
                <b-tooltip :target="'Undo_' + row.index" triggers="hover">
                  Undo
                </b-tooltip>
              </slot>
              <slot v-if="showButton('disburse', row)">
                <b-button :id="'Disburse_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'disburse-data')"
                  :disabled="disabledAction('disburse', row)"
                >
                  Disburse
                </b-button>
                <b-tooltip :target="'Disburse_' + row.index" triggers="hover">
                  Disburse
                </b-tooltip>
              </slot>
              <slot v-if="showButton('watch', row)">
                <b-button :id="'Watch_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'watch-data')"
                  :disabled="disabledAction('watch', row)"
                >
                  Lihat
                </b-button>
                <b-tooltip :target="'Watch_' + row.index" triggers="hover">
                  Lihat
                </b-tooltip>
              </slot>

              <!-- Action with icon -->
              <slot v-if="showButton('detail_icn', row)">
                <b-button :id="'DetailIcn_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'detail-data')"
                  :disabled="disabledAction('detail_icn', row)"
                >
                  <em class="simple-icon-eye"></em>
                </b-button>
                <b-tooltip :target="'DetailIcn_' + row.index" triggers="hover">
                  Detail
                </b-tooltip>
              </slot>
              <slot v-if="showButton('show-qr', row)">
                <b-button :id="'QrIcn_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'show-qr')"
                  :disabled="disabledAction('show-qr', row)"
                >
                  <em class="iconsminds-qr-code"></em>
                </b-button>
                <b-tooltip :target="'QrIcn_' + row.index" triggers="hover">
                  Show QR
                </b-tooltip>
              </slot>
              <slot v-if="showButton('view_fpk', row)">
                <b-button :id="'ViewFpk_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'view-fpk')"
                  :disabled="disabledAction('view_fpk', row)"
                >
                  <em class="simple-icon-docs"></em>
                </b-button>
                <b-tooltip :target="'ViewFpk_'+row.index" triggers="hover">
                   {{ showTooltip('view_fpk','View FPK') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('assign_icn', row)">
                <b-button :id="'Assign_'+row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'assign-data')"
                  :disabled="disabledAction('assign_icn', row)"
                >
                  <em class="simple-icon-note"></em>
                </b-button>
                <b-tooltip :target="'Assign_'+row.index" triggers="hover">
                   {{ showTooltip('assign_icn','Assign') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('disburse_icn', row)">
                <b-button :id="'DisburseIcn_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'disburse-data')"
                  :disabled="disabledAction('disburse_icn', row)"
                >
                  <em class="simple-icon-wallet"></em>
                </b-button>
                <b-tooltip :target="'DisburseIcn_' + row.index" triggers="hover">
                  Disburse
                </b-tooltip>
              </slot>
              <slot v-if="showButton('cancel_icn', row)">
                <b-button :id="'CancelIcn_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'cancel-data')"
                  :disabled="disabledAction('cancel_icn', row)"
                >
                  <em class="simple-icon-close"></em>
                </b-button>
                <b-tooltip :target="'CancelIcn_' + row.index" triggers="hover">
                  {{ showTooltip('cancel_icn', 'Cancel') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('drop_icn', row)">
                <b-button :id="'DropIcn_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'drop-data')"
                  :disabled="disabledAction('drop_icn', row)"
                >
                  <em class="simple-icon-close"></em>
                </b-button>
                <b-tooltip :target="'DropIcn_' + row.index" triggers="hover">
                  {{ showTooltip('drop_icn', 'Drop') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('undo_icn', row)">
                <b-button :id="'UndoIcn_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'undo-data')"
                  :disabled="disabledAction('undo_icn', row)"
                >
                  <em class="simple-icon-action-undo"></em>
                </b-button>
                <b-tooltip :target="'UndoIcn_' + row.index" triggers="hover">
                  {{ showTooltip('undo_icn','Undo') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('banding_icn', row)">
                <b-button :id="'BandingIcn_' + row.index" size="xs" variant="outline-primary" class="default"
                          @click="_onClick(row, row.index, 'banding-data')"
                          :disabled="disabledAction('banding_icn', row)"
                >
                  <span class="simple-icon-docs"></span>
                </b-button>
                <b-tooltip :target="'BandingIcn_' + row.index" triggers="hover">
                  {{ showTooltip('banding_icn','Banding') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('revise_icn', row)">
                <b-button :id="'reviseIcn_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'revise-data')"
                  :disabled="disabledAction('revise_icn', row)"
                >
                  <em class="simple-icon-pencil"></em>
                </b-button>
                <b-tooltip :target="'reviseIcn_' + row.index" triggers="hover">
                  {{ showTooltip('revise_icn','Revisi') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('request', row)">
                <b-button :id="'Request_' + row.index" size="xs" variant="outline-primary" class="default"
                          @click="_onClick(row, row.index, 'request-data')"
                          :disabled="disabledAction('request', row)"
                >
                  Request
                </b-button>
                <b-tooltip :target="'Request_' + row.index" triggers="hover">
                  Request
                </b-tooltip>
              </slot>
              <slot v-if="showButton('print_icn', row)">
                <b-button :id="'PrintIcn_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'print-data')"
                  :disabled="disabledAction('print_icn', row)"
                >
                  <em class="simple-icon-printer"></em>
                </b-button>
                <b-tooltip :target="'PrintIcn_' + row.index" triggers="hover">
                  {{ showTooltip('print_icn','Print') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('download_icn', row)">
                <b-button :id="'DownloadIcn_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'download-data')"
                  :disabled="disabledAction('download_icn', row)"
                >
                  <em class="simple-icon-cloud-download"></em>
                </b-button>
                <b-tooltip :target="'DownloadIcn_' + row.index" triggers="hover">
                  {{ showTooltip('download_icn','Download') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('view_icn', row)">
                <b-button :id="'ViewIcn_' + row.index" size="xs" variant="outline-primary" class="default"
                  @click="_onClick(row, row.index, 'view-data')"
                  :disabled="disabledAction('view_icn', row)"
                >
                  <em class="simple-icon-eye"></em>
                </b-button>
                <b-tooltip :target="'ViewIcn_' + row.index" triggers="hover">
                  {{ showTooltip('view_icn','View') }}
                </b-tooltip>
              </slot>
              <slot v-if="showButton('download_end', row)">
                <b-button :id="'DownloadEnd_'+row.index" size="xs" variant="outline-primary" class="default"
                          @click="downloadData(row)"
                          :disabled="disabledAction('download_end', row)"
                >
                  Download
                </b-button>
                <b-tooltip :target="'Download_'+row.index" triggers="hover">
                  {{ showTooltip('download_end','Download') }}
                </b-tooltip>
              </slot>
            <slot v-if="showButton('checkbox', row)">
              <b-form-checkbox v-model="row.item.checkbox" :disabled="disabledAction('checkbox', row)"/>
            </slot>
          </template>
          <!--        Checkbox per row with ability to select all in header      -->
            <template slot="checkbox" slot-scope="row">
              <slot v-if="showCheckbox">
                <b-form-checkbox
                  :disabled="disabledAction('checkbox', row)"
                  :id="'Checkbox_' + row.index"
                  class="default"
                  @change="selectData(row, row.index, 'checkbox')"
                  v-model="row.item[selectedFlag]"
                  :value="true"
                  :unchecked-value="false">
                </b-form-checkbox>
              </slot>
            </template>
      </b-table>
      <div v-if="pagination">
        <hr>
        <b-row>
          <b-col>
            <p class="mt-2" id="uiTextPagingServerInfo">Menampilkan {{showStartRow()}} s/d {{showEndRow()}}, dari {{totalRows_}} data</p>
            <p v-if="showNoteReport"><em>Catatan : Data request dengan Status Done akan direset daily</em></p>
          </b-col>
          <b-col>
            <b-pagination
              size="sm"
              align="right"
              v-model="currentPage_"
              :total-rows="totalRows_"
              :per-page="perPage_"
              aria-controls="serverPaging"
              @input="changePage(currentPage_)"
              >
              <template v-slot:next-text>
                <em class="simple-icon-arrow-right"/>
              </template>
              <template v-slot:prev-text>
                <em class="simple-icon-arrow-left"/>
              </template>
              <template v-slot:first-text>
                <em class="simple-icon-control-start"/>
              </template>
              <template v-slot:last-text>
                <em class="simple-icon-control-end"/>
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </b-colxx>
</b-row>
</template>
<script>
import axios from 'axios'
import { apiBackend } from '@/constants/config'
import Title from '@/components/Customs/Title'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import FormTool from '@/components/Customs/FormTool'
import Loading from '@/components/Customs/Loading'

export default {
components: {
  'e-title': Title,
  PulseLoader,
  'e-loading': Loading

},
props: {
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
  selectedFlag: { type: String, required: false },
  showPopupWarning: { type: Boolean, default: true },
  showCustomPerPage: {type: Boolean,  required: false, default: false}
},
watch: {
  filters (n) {
    this.filters_ = n
  }
},
data () {
  return {
    name: 'PagingServer',
    type: 'COMPONENT',
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
    isAllDataSelected: false,
    optionsPerPage: [
      { value: 10, text: 10 },
      { value: 25, text: 25 },
      { value: 50, text: 50 },
      { value: 100, text: 100 }
    ]
  }
},
created () {
  this.fetchInitlize()
},
methods: {
  showStartRow () {
    return this.totalRows_ === 0 ? this.totalRows_ : ((this.currentPage_ - 1) * this.perPage_) + 1
  },
  showEndRow () {
    const endRow = ((this.currentPage_ - 1) * this.perPage_) + this.perPage_
    return endRow < this.totalRows_ ? endRow : this.totalRows_
  },
  fetchDataTable () {
    return this.items_
  },
  fetchPicker () {
    this.isBusy = true // Show loading
    return axios.get(`${this.url}/paging/picker?picker=${this.picker}`)
      .then(response => {
        this.isBusy = false // Hide loading
        this.columns_ = response.data
        for (const column of this.columns_) {
          const columnalign = 'text-' + column.align
          const columnwidth = 'server-paging-' + column.width
          let field = { key: column.id, label: column.title, sortable: column.sortable, class: columnalign, tdClass: columnwidth }
          if (column.thStyle && typeof column.thStyle === 'string') {
            field = { ...field, thStyle: column.thStyle }
          }
          this.fields_.push(field)
        }

        return response
      })
      .catch(() => {
        this.columns_ = []
        this.isBusy = false // Hide loading
      })
  },
  refresh (psearch) {
    this.currentPage_ = 1
    this.sortBy_ = ''
    this.sortDesc_ = false
    this.search_ = psearch
    this.fetchData()
  },
  fetchData () {
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
            this.items_ = result.rows
            this.totalRows_ = result.count
          } else {
            this.items_ = []
            if (result.message && this.showPopupWarning) {
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
          this.items_.forEach((data) => {
            data[this.selectedFlag] = !!data[this.selectedFlag]
          })
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
  fetchInitlize () {
    this.fetchPicker()
      .then(response => {
        this.fetchData()
      })
  },
  changePage (selectedPage) {
    this.currentPage_ = selectedPage
    this.fetchData()
  },
  sortingChanged () {
    if (this.sortDesc_ === true) {
      this.sortDesc_ = false
    } else {
      this.sortDesc_ = true
    }
    this.currentPage_ = 1
    this.fetchData()
  },
  editData (item) {
    this.$emit('edit-data', { bean: item.item, index: item.index })
  },
  deleteData (item) {
    this.$emit('delete-data', { bean: item.item, index: item.index })
  },
  downloadData (item) {
    this.$emit('download-data', { bean: item.item, index: item.index })
  },
  retryData (item) {
    this.$emit('retry-data', { bean: item.item, index: item.index })
  },
  viewData (item) {
    this.$emit('view-data', { bean: item.item, index: item.index })
  },
  detailData (item) {
    this.$emit('detail-data', { bean: item.item, index: item.index })
  },
  selectData (item, index, type) {
    this.$emit('select-data', { bean: item, index: index })
    if (type === 'checkbox') {
      this.setIsAllDataSelected()
    }
  },
  addData (item, index) {
    this.$emit('add-data', { bean: item, index: index })
  },
  processData (item) {
    this.$emit('process-data', { bean: item.item, index: item.index })
  },
  continueData (item) {
    this.$emit('continue-data', { bean: item.item, index: item.index })
  },
  bandingData (item, index) {
    this.$emit('banding-data', { bean: item, index: index })
  },
  reviseData (item) {
    this.$emit('revise-data', { bean: item.item, index: item.index })
  },
  _onClick (data, index, event) {
    this.$emit(event, { bean: data.item, index: index })
  },
  showButton (type, row) {
    const selected = this.columns_.find(e => e.id === row.field.key)
    if (selected) {
      const render = selected.components.indexOf(type) > -1
      if (this.renderButton && render) {
        return this.renderButton(type, row)
      } else { return render }
    } else {
      return false
    }
  },
  disabledAction (type, row) {
    if (type) {
      if (this.disabledButton) {
        return this.disabledButton(type, row)
      } else {
        return false
      }
    } else {
      return false
    }
  },
  showTooltip (type, tooltipDefault) {
    if (this.renderTooltip) {
      let tooltip = this.renderTooltip(type)
      if (!tooltip) {
        tooltip = tooltipDefault
      }
      return tooltip
    } else {
      return tooltipDefault
    }
  },
  selectAllData () {
    this.isAllDataSelected = !this.isAllDataSelected
    if (this.isAllDataSelected) {
      this.items_.forEach(item => {
        if (!this.disabledAction('checkbox', { item })) {
          item[this.selectedFlag] = true
        }
      })
    }
    if (!this.isAllDataSelected) {
      this.items_.forEach(item => {
        item[this.selectedFlag] = false
      })
    }
  },
  setIsAllDataSelected () {
    this.$nextTick(() => {
      const selectedData = this.items_.filter(item => item[this.selectedFlag])
      this.isAllDataSelected = this.items_.length && selectedData.length === this.items_.length
    })
  },
  async processAllData() {
    const responseConfirm = await FormTool.confirmWarning(this, 'Peringatan!', 'Apakah anda yakin akan merubah status user menjadi bebas pustaka?', 'Ya', 'Tidak')
    if(!responseConfirm.value) {
      return
    }
    const payload = this.items_
    console.log(payload)
    try {
      await axios.post(`${apiBackend}/user/set-bebas-pustaka`, payload)
      this.fetchData()
      this.$refs.loading.hide()
      FormTool.popupSuccess(this, 'Success', 'Berhasil Merubah Status Menjadi Bebas Pustaka')
    } catch (e) {
      this.$refs.loading.hide()
      FormTool.popupError(this, 'Error', `Gagal merubah data ${e}`)
    }
  },
  setPerPage() {
    this.fetchData()
  }
},
computed: {
  isAllCheckboxDisabled () {
    let disabledCheckbox = 0
    this.items_.forEach(item => {
      if (this.disabledAction('checkbox', { item })) {
        disabledCheckbox += 1
      }
    })
    return disabledCheckbox === this.items_.length
  }
}
}
</script>
<style scoped>
.server-paging-50 { width:50px !important }
.server-paging-100 { width:100px !important }
.server-paging-150 { width:150px !important }
.server-paging-200 { width:200px !important }
.server-paging-250 { width:250px !important }
.server-paging-300 { width:300px !important }
.server-paging-350 { width:350px !important }
.server-paging-400 { width:400px !important }
.server-paging-450 { width:450px !important }
.server-paging-500 { width:500px !important }

:deep(.th-50) { width:50px !important }
:deep(.th-100) { width:100px !important }
:deep(.th-150) { width:150px !important }
:deep(.th-200) { width:200px !important }
:deep(.th-250) { width:250px !important }
:deep(.th-300) { width:300px !important }
:deep(.th-350) { width:350px !important }
:deep(.th-400) { width:400px !important }
:deep(.th-450) { width:450px !important }
:deep(.th-500) { width:500px !important }

:deep(.th-nowrap) { white-space: nowrap; }
button:disabled {
color: #8e8e8e !important;
}
button:disabled:hover {
background-color: transparent !important;
}
</style>
