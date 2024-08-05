<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.master-member')"/>
        <div class="separator mb-5"></div>
      </b-colxx>
      <b-colxx xxs="12">
        <b-card>
          <b-form>
            <b-row>
              <b-colxx sm="6">
                <b-form-group label="Member Name">
                  <b-form-input v-model="filters[1].value" />
                </b-form-group>
              </b-colxx>
            </b-row>
          </b-form>
          <div class="d-flex justify-content-end align-items-center">
            <b-button
              @click="onReset"
              variant="primary default"
              size="sm"
              id="uiBtnMasterMemberReset"
              class="mt-2 btn-shadow mr-2"
            >
              <em class="simple-icon-reload"/>Reset
            </b-button>
            <b-button
              @click="searchData"
              variant="success default"
              size="sm"
              id="uiBtnMasterMemberCari"
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
      ref="tblPagingMember"
      title="List Member" class="mt-2"
      picker="pagingMemberList"
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
import _ from 'lodash'
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export default {
  components: {
    'e-paging-server': pagingServer
  },
  data () {
    return {
      filters: [
        { id: 'member_id', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'member_name', value: '', opr: 'LIKE', type: 'STRING' }
        // { id: 'expire_date', value: '0000', opr: 'NOTSTARTWITH', type: 'STRING' }
      ]
    }
  },
  methods: {
    searchData () {
      this.$refs.tblPagingMember.refresh('')
    },
    onReset () {
      this.filters[0].value = ''
      this.filters[1].value = ''
      this.$refs.tblPagingMember.refresh('')
    },
    async downloadExcel() {
      console.log(this.$refs.tblPagingMember.items_)
      const refItems = _.get(this.$refs, 'tblPagingMember.items_', [])
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');

      const rows = [];
      refItems.forEach((item, index) => {
        rows.push([ 
          index + 1,
          item.member_name, 
          item.pin,
          item.tgl_join2])
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
          { name: 'Member Name' , filterButton: true},
          { name: 'Pin', filterButton: true },
          { name: 'Tanggal Join', filterButton: true }
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

      const documentName = `Daftar Member-${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

      saveAs(blob, documentName);
    }
  }
}

</script>