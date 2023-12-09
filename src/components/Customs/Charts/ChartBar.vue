<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
    ref="chart"
  />
</template>

<script>
import { Bar } from 'vue-chartjs/legacy'

export default {
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: []
    },
    labels: {
      type: Array,
      default: []
    },
    rawData: {
      type: Array,
      default: []
    },
    customLabel: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      chartData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }
    }
  },
  methods: {
    init () {
      let labels = ['Data']
      if (!!this.customLabel) {
        labels[0] = this.customLabel
      }
      this.chartData.labels = labels
      const datasets = []
      this.rawData.forEach((item, index) => {
        const data = []
        data.push(item.y)
        const color = '#' + Math.floor(Math.random()*16777215).toString(16);
        datasets.push({
            label: item.x,
            backgroundColor: color,
            data
          })
      })
      this.chartData.datasets = datasets

      this.$refs.chart.renderChart(this.chartData, this.chartOptions)
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    labels (n, o) {
      this.init()
    },
    data (n, o) {
      this.init()
    }
  },
}
</script>
