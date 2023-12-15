<template>
    <div>
      <b-row>
        <b-colxx xxs="12">
          <piaf-breadcrumb :heading="$t('menu.bebas-pustaka')"/>
          <div class="separator mb-5"></div>
        </b-colxx>
        <b-colxx xxs="12">
          <b-card>
            <b-form>
              <b-row>
                <b-colxx sm="6">
                  <b-form-group label="Member Name">
                    <b-form-input v-model="filters[0].value" />
                  </b-form-group>
                </b-colxx>

                <b-colxx sm="6">
                  <b-form-group label="Status Perpustakaan">
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
                id="uiBtnBebasPustakaReset"
                class="mt-2 btn-shadow mr-2"
              >
                <em class="simple-icon-reload"/>Reset
              </b-button>
              <b-button
                @click="searchData"
                variant="success default"
                size="sm"
                id="uiBtnBebasPustakaCari"
                class="mt-2 btn-shadow"
              >
                <em class="simple-icon-magnifier"/>Cari
              </b-button>
            </div>
          </b-card>
        </b-colxx>
      </b-row>
      <e-paging-server
        ref="tblPagingMember"
        title="List Bebas Pustaka" class="mt-2"
        picker="pagingBebasPustaka"
        :perPage=50
        search=""
        sortDesc
        :filters="filters"
        :show-checkbox="true"
        :selected-flag="'bebas_pustaka'"
        @detail-data="viewDetail"
        :disabledButton="disabledButton"
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
          { id: 'member_name', value: '', opr: 'LIKE', type: 'STRING' },
          { id: 'bebas_pustaka', value: '', opr: 'LIKE', type: 'BOOLEAN' },
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
      viewDetail ({ bean }) {
        console.log('from detail', bean)
      },
      disabledButton (type, { item }) {
        return true
      }
    }
  }
  
  </script>