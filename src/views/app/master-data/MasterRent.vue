<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.master-rent')"/>
        <div class="separator mb-5"></div>
      </b-colxx>
      <b-colxx xxs="12">
        <b-card>
          <b-form>
            <b-row>
              <b-colxx sm="4">
                <b-form-group label="Kode Pinjam">
                  <b-form-input v-model="filters[0].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Member Name">
                  <b-form-input v-model="filters[1].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Title Buku">
                  <b-form-input v-model="filters[2].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Inventory">
                  <b-form-input v-model="filters[3].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Tanggal Pinjam">
                  <datepicker
                    :bootstrap-styling="true"
                    v-model="filters[4].value"
                    mode="single"
                  ></datepicker>
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Tanggal Kembali">
                  <datepicker
                    :bootstrap-styling="true"
                    v-model="filters[5].value"
                    mode="single"
                  ></datepicker>
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Status Pinjam">
                  <b-form-select v-model="filters[6].value" :options="optionsStatus"></b-form-select>
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Location Order">
                  <b-form-input v-model="filters[7].value" />
                </b-form-group>
              </b-colxx>
            </b-row>
          </b-form>
          <div class="d-flex justify-content-end align-items-center">
            <b-button
              @click="onReset"
              variant="primary default"
              size="sm"
              id="uiBtnMasterBookReset"
              class="mt-2 btn-shadow mr-2"
            >
              <em class="simple-icon-reload"/>Reset
            </b-button>
            <b-button
              @click="searchData"
              variant="success default"
              size="sm"
              id="uiBtnMasterBookCari"
              class="mt-2 btn-shadow mr-2"
            >
              <em class="simple-icon-magnifier"/>Cari
            </b-button>

            <b-button
              @click="downloadExcel"
              variant="success default"
              size="sm"
              id="uiBtnBebasPustakaCari"
              class="mt-2 btn-shadow"
            >
              <em class="simple-icon-magnifier" />Export Data
            </b-button>
          </div>
        </b-card>
      </b-colxx>
    </b-row>
    <e-paging-server
      ref="tblPagingBook"
      title="List Transaksi" class="mt-2"
      picker="pagingRentList"
      :perPage=25
      search=""
      sortDesc
      :filters="filters"
      :showCustomPerPage="true"
    ></e-paging-server>
  </div>
</template>
<script>
import pagingServer from '@/components/Customs/PagingServer'
import Datepicker from "vuejs-datepicker";
import _ from 'lodash'
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export default {
  components: {
    'e-paging-server': pagingServer,
    datepicker: Datepicker
  },
  data () {
    return {
      filters: [
        { id: 'kode_pinjam', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'member_name', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'title', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'inventory_code', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'tgl_pinjam', value: '', opr: 'EQUAL', type: 'DATE' },
        { id: 'tgl_kembali', value: '', opr: 'EQUAL', type: 'DATE' },
        { id: 'status_pinjam', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'location_order', value: '', opr: 'LIKE', type: 'STRING' }
      ],
      optionsStatus: [
          { value: 1, text: 'Aktif' },
          { value: 0, text: 'Done' }
        ]
    }
  },
  mounted () {

  },
  methods: {
    searchData () {
      this.$refs.tblPagingBook.refresh('')
    },
    onReset () {
      this.filters[0].value = ''
      this.filters[1].value = ''
      this.filters[2].value = ''
      this.filters[3].value = ''
      this.filters[4].value = ''
      this.filters[5].value = ''
      this.filters[6].value = ''
      this.filters[7].value = ''
      this.$refs.tblPagingBook.refresh('')
    },
    async downloadExcel() {
      console.log(this.$refs.tblPagingBook.items_)
      const refItems = _.get(this.$refs, 'tblPagingBook.items_', [])
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');

      const rows = [];
      refItems.forEach((item, index) => {
        rows.push([ 
          index + 1, 
          item.kode_pinjam, 
          item.member_name, 
          item.title,
          item.inventory_code,
          item.tgl_pinjam_format,
          item.tgl_kembali_format,
          item.status_pinjam_format])
      })

      // Add some data
      worksheet.addTable({
        name: 'TableMember',
        ref: 'A1',
        headerRow: true,
        style: {
          theme: 'TableStyleMedium2',
          showRowStripes: true,
        },
        columns: [
          { name: 'No.' },
          { name: 'Kode Pinjam' , filterButton: true},
          { name: 'Member Name', filterButton: true },
          { name: 'Judul Buku', filterButton: true },
          { name: 'Inventory Code', filterButton: true },
          { name: 'Tanggal Pinjam', filterButton: true },
          { name: 'Tanggal Kembali', filterButton: true },
          { name: 'Status Pinjam', filterButton: true },
        ],
        rows,
      });

      worksheet.columns.forEach((column) => {
        column.width = column.values.reduce((maxWidth, value) => {
          return Math.max(maxWidth, value.toString().length);
        }, 0) * 1.2; // Add some padding
      });

      // Generate the Excel file
      const buffer = await workbook.xlsx.writeBuffer();

      // Save the file
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear();
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');

      const documentName = `Daftar Transasksi-${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

      saveAs(blob, documentName);
    },
  }
}

</script>