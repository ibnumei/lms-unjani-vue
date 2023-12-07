<template>
  <div :class="containerClass">
    <canvas ref="chart"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
import {
  ThemeColors
} from "@/utils";

const colors = ThemeColors();

export default {
  props: {
    data: {
      type: Array,
    },
    labels: {
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
      barChartOptions: {
        legend: {
          position: "bottom",
          labels: {
            padding: 30,
            usePointStyle: true,
            fontSize: 12,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
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
                stepSize: 10,
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
        tooltips: {
          backgroundColor: colors.foregroundColor,
          titleFontColor: colors.primaryColor,
          borderColor: colors.separatorColor,
          borderWidth: 0.5,
          bodyFontColor: colors.primaryColor,
          bodySpacing: 10,
          xPadding: 15,
          yPadding: 15,
          cornerRadius: 0.15
        },
      },
      barChartData: {
        labels: [''],
        datasets: [
          {
            label: '',
            borderColor: colors.themeColor1,
            backgroundColor: colors.themeColor1_10,
            data: [''],
            borderWidth: 2
          },
        ]
      }
    };
  },
  methods: {
    init () {
      if (this.shadow) {
      Chart.defaults.global.datasets.barWithShadow =
      Chart.defaults.global.datasets.bar;
      Chart.defaults.barWithShadow = Chart.defaults.bar;
      Chart.controllers.barWithShadow = Chart.controllers.bar.extend({
        draw(ease) {
          Chart.controllers.bar.prototype.draw.call(this, ease);
          const chartCtx = this.chart.ctx;
          chartCtx.save();
          chartCtx.shadowColor = "rgba(0,0,0,0.2)";
          chartCtx.shadowBlur = 7;
          chartCtx.shadowOffsetX = 5;
          chartCtx.shadowOffsetY = 7;
          chartCtx.responsive = true;
          Chart.controllers.bar.prototype.draw.apply(this, arguments);
          chartCtx.restore();
        },
      });
      }

      const datasets = []
      this.data.forEach((element, index) => {
        datasets.push({
          label: this.labels[index],
          borderColor: colors.themeColor1,
          backgroundColor: colors.themeColor1_10,
          data: [element],
          borderWidth: 2
        })
      });

      this.barChartData.datasets = datasets

      const ctx = this.$refs.chart;
      const myChart = new Chart(ctx, {
        type: this.shadow ? "barWithShadow" : "bar",
        data: this.barChartData,
        options: this.barChartOptions,
      });
    },
  },
  mounted() {
  },
  watch: {
    labels (n, o) {
      this.init()
    }
  },
};
</script>

