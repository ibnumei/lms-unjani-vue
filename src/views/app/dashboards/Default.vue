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
              <div class="chart-container">
                <chart-server
                  picker="chartRent"
                  type="area"
                  shadow />
              </div>
            </b-colxx>
            <b-colxx xxs="12" lg="5" class="mb-4">
              <h6 class="card-subtitle">Buku Terbanyak Dipinjam</h6>
              <div class="chart-container">
                <chart-server
                  picker="chartMostBookRent"
                  type="bar"
                  shadow />
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
          search=""
          sortDesc
          :filters="[]"
        ></e-paging-server>
      </b-colxx>

    </b-row>
  </div>
</template>

<script>
import {
  lineChartData,
  polarAreaChartData,
  scatterChartData,
  barChartData,
  radarChartData,
  pieChartData,
  doughnutChartData,
} from "@/data/charts";
import LineChart from "@/components/Charts/Line";
import PolarAreaChart from "@/components/Charts/PolarArea";
import AreaChart from "@/components/Customs/Charts/Area";
import ScatterChart from "@/components/Charts/Scatter";
import BarChart from "@/components/Charts/Bar";
import RadarChart from "@/components/Charts/Radar";
import PieChart from "@/components/Charts/Pie";
import DoughnutChart from "@/components/Charts/Doughnut";
import PagingServer from "@/components/Customs/PagingServer"
import ChartServer from "@/components/Customs/Charts/ChartServer";
import { ThemeColors } from '@/utils'
const colors = ThemeColors()

export default {
  components: {
    "line-chart": LineChart,
    "polar-area-chart": PolarAreaChart,
    "area-chart": AreaChart,
    "scatter-chart": ScatterChart,
    "bar-chart": BarChart,
    "radar-chart": RadarChart,
    "pie-chart": PieChart,
    "doughnut-chart": DoughnutChart,
    'e-paging-server': PagingServer,
    'chart-server': ChartServer
  },
  data() {
    return {
      areaChartData: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "",
            data: [54, 63, 60, 65, 60, 68, 90],
            borderColor: colors.themeColor1,
            pointBackgroundColor: colors.foregroundColor,
            pointBorderColor: colors.themeColor1,
            pointHoverBackgroundColor: colors.themeColor1,
            pointHoverBorderColor: colors.foregroundColor,
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            fill: true,
            borderWidth: 2,
            backgroundColor: colors.themeColor1_10,
          },
        ],
      },
      areaChartData2: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "",
            data: [5,6,4,4,0,18,6],
            borderColor: colors.themeColor1,
            pointBackgroundColor: colors.foregroundColor,
            pointBorderColor: colors.themeColor1,
            pointHoverBackgroundColor: colors.themeColor1,
            pointHoverBorderColor: colors.foregroundColor,
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            fill: true,
            borderWidth: 2,
            backgroundColor: colors.themeColor1_10,
          },
        ],
      },
      lineChartData,
      polarAreaChartData,
      scatterChartData,
      barChartData,
      radarChartData,
      pieChartData,
      doughnutChartData,
    };
  },
};
</script>
