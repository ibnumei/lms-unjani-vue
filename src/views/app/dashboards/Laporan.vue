<template>
    <div>
      <b-row>
        <b-colxx xxs="12">
          <piaf-breadcrumb :heading="$t('menu.laporan')"/>
          <div class="separator mb-5"></div>
        </b-colxx>
      </b-row>
      <b-row>
  
        <b-colxx xxs="12">
          <b-card class="mb-4">
            <b-row>
              <b-colxx xxs="12" lg="8" class="mb-4">
                <h6 class="card-subtitle">Grafik Peminjaman Dalam Satu Bulan</h6>
                <date-picker
                  type="year"
                  v-model="filterChartRent[0].value"
                  @change="refetchChart('chartRent')"
                  valueType="format"
                ></date-picker>
                  <chart-server
                    ref="chartRent"
                   :filters="filterChartRent"
                    picker="chartRent"
                    type="area"
                    shadow />
              </b-colxx>
              <b-colxx xxs="12" lg="4" class="mb-4">
                <h6 class="card-subtitle">Buku Terbanyak Dipinjam</h6>
                <date-picker
                  type="month"
                  @change="refetchChart('chartMostBookRent')"
                  v-model="filterChartMostBookRent[0].value"
                  valueType="format"
                ></date-picker>
                <chart-server
                  ref="chartMostBookRent"
                  :filters="filterChartMostBookRent"
                  picker="chartMostBookRent"
                  type="bar"
                  customLabel="Buku"
                  shadow
                />
              </b-colxx>
            </b-row>
          </b-card>
        </b-colxx>
  
        <b-colxx xxs="12">
          <b-card class="mb-4">
            <b-row>
              <b-colxx xxs="12" lg="8" class="">
                <h6 class="card-subtitle">User Terbanyak Meminjam</h6>
                <date-picker
                  type="month"
                  @change="refetchChart('barChartMostUserRent')"
                  v-model="filterChartMostUserRent[0].value"
                  valueType="format"
                ></date-picker>
                <chart-server
                  ref="barChartMostUserRent"
                  :filters="filterChartMostUserRent"
                  picker="barChartMostUserRent"
                  type="bar"
                  customLabel="Member"
                  shadow
                />
              </b-colxx>
              <b-colxx xxs="12" lg="4" class="">
                <h6 class="card-subtitle">Status Peminjaman</h6>
                <date-picker
                  type="month"
                  @change="refetchChart('chartBookTransaction')"
                  v-model="filterChartBookTransaction[0].value"
                  valueType="format"
                ></date-picker>
                <chart-server
                  ref="chartBookTransaction"
                  :filters="filterChartBookTransaction"
                  picker="chartBookTransaction"
                  type="pie"
                  customLabel="Member"
                  shadow
                />
              </b-colxx>
            </b-row>
          </b-card>
        </b-colxx>
  
        <b-colxx xxs="12">
          <b-card class="mb-4">
            <b-row>
              <b-colxx xxs="12" class="mb-4">
                <h6 class="card-subtitle">Grafik Peminjaman Dalam Satu Tahun</h6>
                <date-picker
                  type="year"
                  v-model="filterChartRentAndReturn[0].value"
                  @change="refetchChart('chartRentAndReturn')"
                  valueType="format"
                ></date-picker>
                  <chart-server
                    ref="chartRentAndReturn"
                   :filters="filterChartRentAndReturn"
                    picker="chartRentAndReturn"
                    type="area"
                    :useRaw="true"
                    shadow />
              </b-colxx>
            </b-row>
          </b-card>
        </b-colxx>
  
  
      </b-row>
    </div>
  </template>
  
  <script>
  import PagingServer from "@/components/Customs/PagingServer"
  import ChartServer from "@/components/Customs/Charts/ChartServer";
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import Bar from './Bar'
  
  export default {
    components: {
      DatePicker,
      'e-paging-server': PagingServer,
      'chart-server': ChartServer,
      'e-bar': Bar
    },
    data() {
      return {
        filterChartRent: [
          {
            id: 'year',
            value: null,
            opr: 'EQUAL',
            type: 'NUMBER'
          }
        ],
        filterChartMostBookRent: [
          {
            id: 'yearMonth',
            value: null,
            opr: 'EQUAL',
            type: 'STRING'
          },
        ],
        filterChartMostUserRent: [
          {
            id: 'yearMonth',
            value: null,
            opr: 'EQUAL',
            type: 'STRING'
          },
        ],
        filterChartBookTransaction: [
          {
            id: 'yearMonth',
            value: null,
            opr: 'EQUAL',
            type: 'STRING'
          },
        ],
        filterChartRentAndReturn: [
          {
            id: 'year',
            value: null,
            opr: 'EQUAL',
            type: 'NUMBER'
          }
        ],
      };
    },
    methods: {
      initFilter () {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        currentMonth = currentMonth + 1;
  
        const currentYearMonth = `${currentYear}-${currentMonth}`;
        this.filterChartRent[0].value = currentYear.toString();
        this.filterChartMostBookRent[0].value = currentYearMonth;
        this.filterChartMostUserRent[0].value = currentYearMonth;
        this.filterChartBookTransaction[0].value = currentYearMonth;
      },
      refetchChart(refName) {
        this.$refs[refName].fetchData()
      },
    },
    mounted () {
      this.initFilter()
    }
  };
  </script>
  