<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.master-book')"/>
        <div class="separator mb-5"></div>
      </b-colxx>
      <b-colxx xxs="12">
        <b-card>
          <b-form>
            <b-row>
              <b-colxx sm="4">
                <b-form-group label="Title Buku">
                  <b-form-input v-model="filters[0].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="ISBN ISSN">
                  <b-form-input v-model="filters[1].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Publisher">
                  <b-form-input v-model="filters[2].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Publish Year">
                  <b-form-input v-model="filters[3].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Collatioon">
                  <b-form-input v-model="filters[4].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Item Code">
                  <b-form-input v-model="filters[5].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Inventory">
                  <b-form-input v-model="filters[6].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Stock">
                  <b-form-input v-model="filters[7].value" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="4">
                <b-form-group label="Author">
                  <b-form-input v-model="filters[8].value" />
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
      title="List Book Data" class="mt-2"
      picker="pagingBookList"
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
        { id: 'title', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'isbn_issn', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'publisher_name', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'publish_year', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'collation', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'item_code', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'inventory_code', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'stock', value: '', opr: 'LIKE', type: 'STRING' },
        { id: 'full_author', value: '', opr: 'LIKE', type: 'STRING' }
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
      this.filters[8].value = ''
      this.$refs.tblPagingBook.refresh('')
    },
  }
}

</script>