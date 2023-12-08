<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="Dashboard" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>

      <b-colxx xxs="12">
        <b-card class="mb-4">
          <b-row>
            <b-colxx xxs="12" lg="7" class="mb-4">
              <h6 class="card-subtitle">Grafik Peminjaman Dalam Satu Bulan</h6>
                <chart-server
                  picker="chartRent"
                  type="area"
                  shadow />
            </b-colxx>
            <b-colxx xxs="12" lg="5" class="mb-4">
              <h6 class="card-subtitle">Buku Terbanyak Dipinjam</h6>
                <chart-server
                  picker="chartMostBookRent"
                  type="bar"
                  shadow />
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>

      <b-colxx xxs="12">
        <b-card class="mb-4">
          <b-row>
            <b-colxx xxs="12" lg="7" class="">
              <h6 class="card-subtitle">Grafik Peminjaman Dalam Satu Bulan</h6>
              <e-bar />
            </b-colxx>
            <b-colxx xxs="12" lg="5" class="">
              <h6 class="card-subtitle">Buku Terbanyak Dipinjam</h6>
              <div class="chart-container">
              </div>
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>

      <b-colxx xxs="12">
        <e-paging-server
          ref="tblPagingBook"
          title="Daftar Pemimjam Terbaru"
          class="mt-2"
          picker="pagingLatestRent"
          :perPage="10"
          search=""
          sortDesc
          :filters="[]"
        ></e-paging-server>
      </b-colxx>

    </b-row>
  </div>
</template>

<script>
import PagingServer from "@/components/Customs/PagingServer"
import ChartServer from "@/components/Customs/Charts/ChartServer";
import Bar from './Bar'

export default {
  components: {
    'e-paging-server': PagingServer,
    'chart-server': ChartServer,
    'e-bar': Bar
  },
  data() {
    return {
    };
  },
};
</script>
