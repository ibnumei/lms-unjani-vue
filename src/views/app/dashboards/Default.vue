<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.charts')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4">
          <b-row>
            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">Grafik Peminjaman Dalam Satu Bulan</h6>
              <div class="chart-container">
                <area-chart 
                  :data="[11, 22, 33, 44, 55, 66, 77]"
                  :labels="['Mons', 'Tuee', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
                  shadow />
              </div>
            </b-colxx>
            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">Grafik Peminjaman Dalam Satu Bulan</h6>
              <div class="chart-container">
                <area-chart-server
                  :data="[11, 22, 33, 44]"
                  :labels="['Mons', 'Tuee', 'Wed', 'Thu']"
                  picker="pagingChartRent"
                  shadow />
              </div>
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>

      <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('charts.line')">
          <b-row>
            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.shadow") }}</h6>
              <div class="chart-container">
                <line-chart :data="lineChartData" shadow />
              </div>
            </b-colxx>

            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.no-shadow") }}</h6>
              <div class="chart-container">
                <line-chart :data="lineChartData" />
              </div>
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>

      <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('charts.polar')">
          <b-row>
            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.shadow") }}</h6>
              <div class="chart-container">
                <polar-area-chart :data="polarAreaChartData" shadow />
              </div>
            </b-colxx>

            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.no-shadow") }}</h6>
              <div class="chart-container">
                <polar-area-chart :data="polarAreaChartData" />
              </div>
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>

      <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('charts.scatter')">
          <b-row>
            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.shadow") }}</h6>
              <div class="chart-container">
                <scatter-chart :data="scatterChartData" shadow />
              </div>
            </b-colxx>

            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.no-shadow") }}</h6>
              <div class="chart-container">
                <scatter-chart :data="scatterChartData" />
              </div>
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>

      <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('charts.bar')">
          <b-row>
            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.shadow") }}</h6>
              <div class="chart-container">
                <bar-chart :data="barChartData" shadow />
              </div>
            </b-colxx>

            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.no-shadow") }}</h6>
              <div class="chart-container">
                <bar-chart :data="barChartData" />
              </div>
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>

      <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('charts.radar')">
          <b-row>
            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.shadow") }}</h6>
              <div class="chart-container">
                <radar-chart :data="radarChartData" shadow />
              </div>
            </b-colxx>

            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.no-shadow") }}</h6>
              <div class="chart-container">
                <radar-chart :data="radarChartData" />
              </div>
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>

      <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('charts.pie')">
          <b-row>
            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.shadow") }}</h6>
              <div class="chart-container">
                <pie-chart :data="pieChartData" shadow />
              </div>
            </b-colxx>

            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.no-shadow") }}</h6>
              <div class="chart-container">
                <pie-chart :data="pieChartData" />
              </div>
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>

      <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('charts.doughnut')">
          <b-row>
            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.shadow") }}</h6>
              <div class="chart-container">
                <doughnut-chart :data="doughnutChartData" shadow />
              </div>
            </b-colxx>

            <b-colxx xxs="12" lg="6" class="mb-4">
              <h6 class="card-subtitle">{{ $t("charts.no-shadow") }}</h6>
              <div class="chart-container">
                <doughnut-chart :data="doughnutChartData" />
              </div>
            </b-colxx>
          </b-row>
        </b-card>
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
import AreaChartServer from "@/components/Customs/Charts/AreaServer";
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
    'area-chart-server': AreaChartServer
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
