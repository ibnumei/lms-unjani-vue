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
      console.log('inittt')
      console.log(this.rawData)
      this.chartData.labels = ['Buku']
      const backgroundColor = ['#41B883', '#E46651', '#00D8FF', '#DD1B16']
      const datasets = []
      this.rawData.forEach((item, index) => {
        const data = []
        data.push(item.y)
        datasets.push({
            label: item.x,
            backgroundColor: backgroundColor[index],
            data
          })
      })
      this.chartData.datasets = datasets
      console.log(datasets)
      // this.chartData.labels = this.labels
      // this.chartData.datasets[0].data = this.data

      this.$refs.chart.renderChart(this.chartData, this.chartOptions)
    }
  },
  mounted() {
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
