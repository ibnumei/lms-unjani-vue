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
                  <b-form-input v-model="filters[4].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Tanggal Kembali">
                  <b-form-input v-model="filters[5].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Status Pinjam">
                  <b-form-input v-model="filters[6].value" />
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
              class="mt-2 btn-shadow"
            >
              <em class="simple-icon-magnifier"/>Cari
            </b-button>
          </div>
        </b-card>
      </b-colxx>
    </b-row>
    <e-paging-server
      ref="tblPagingBook"
      title="List Data Peminjaman Buku" class="mt-2"
      picker="pagingRentList"
      :perPage=25
      search=""
      sortDesc
      :filters="filters"
    ></e-paging-server>
  </div>
</template>
<script>
import pagingServer from '@/components/Customs/PagingServer'
export default {
  components: {
    'e-paging-server': pagingServer
  },
  data () {
    return {
      filters: [
        { id: 'kode_pinjam', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'member_name', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'title', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'inventory_code', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'tgl_pinjam', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'tgl_kembali', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'status_pinjam', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'location_order', value: '', opr: 'LIKE', type: 'STRING' }
      ]
    }
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
  }
}

</script>