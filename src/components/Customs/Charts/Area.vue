<template>
  <div :class="containerClass">
    <canvas :key="refCanvas" :id="refCanvas" :ref="refCanvas"></canvas>
  </div>
</template>
<script>
import _ from "lodash";
import Chart from "chart.js";
import { ThemeColors } from "@/utils";

const colors = ThemeColors();

export default {
  props: {
    labels: {
      type: Array,
    },
    data: {
      type: Array,
    },
    containerClass: {
      type: String,
      default: "chart-container",
    },
    shadow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      refCanvas: "canvas",
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
      areaChartOptions: {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: colors.foregroundColor,
          titleFontColor: colors.primaryColor,
          borderColor: colors.separatorColor,
          borderWidth: 0.5,
          bodyFontColor: colors.primaryColor,
          bodySpacing: 10,
          xPadding: 15,
          yPadding: 15,
          cornerRadius: 0.15,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                lineWidth: 1,
                color: "rgba(0,0,0,0.1)",
                drawBorder: false,
              },
              ticks: {
                beginAtZero: true,
                stepSize: 20,
                min: 0,
                max: 100,
                padding: 20,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    generateIdRef() {
      const min = 10000; // Minimum 5-digit number
      const max = 99999; // Maximum 5-digit number

      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    init() {
      if (this.shadow) {
        Chart.defaults.lineWithShadow = Chart.defaults.line;
        Chart.controllers.lineWithShadow = Chart.controllers.line.extend({
          draw(ease) {
            Chart.controllers.line.prototype.draw.call(this, ease);
            const chartCtx = this.chart.ctx;
            chartCtx.save();
            chartCtx.shadowColor = "rgba(0,0,0,0.15)";
            chartCtx.shadowBlur = 10;
            chartCtx.shadowOffsetX = 0;
            chartCtx.shadowOffsetY = 10;
            chartCtx.responsive = true;
            chartCtx.stroke();
            Chart.controllers.line.prototype.draw.apply(this, arguments);
            chartCtx.restore();
          },
        });
      }

      const max = _.max(this.data);

      const _max = Math.ceil(max / 10) * 10; // Round up to the nearest multiple of 10
      const _stepSize = max <= 10 ? 2 : Math.round(_max / (max / 10));

      // this.areaChartOptions.scales.yAxes[0].ticks.stepSize = _stepSize;
      // this.areaChartOptions.scales.yAxes[0].ticks.max = _max;

      !!this.labels && (this.areaChartData.labels = this.labels);
      !!this.data && (this.areaChartData.datasets[0].data = this.data);

      const ctx = this.$refs[this.refCanvas];
      const myChart = new Chart(ctx, {
        type: this.shadow ? "lineWithShadow" : "line",
        data: this.areaChartData,
        options: this.areaChartOptions,
      });
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    labels (n, o) {
      this.init()
    },
    data (n, o) {
      this.init()
    }
  },
  beforeMount() {
    this.refCanvas = `canvas${this.generateIdRef()}`;
  },
};
</script>
