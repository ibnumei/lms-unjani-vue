<template>
  <LineChartGenerator
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
import _ from 'lodash'
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'

export default {
  name: 'LineChart',
  components: {
    LineChartGenerator
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
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
    useRaw: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chartData: {
        labels: [
          'January',
          'February',
        ],
        datasets: [
          [
    {
        "id": "y",
        "label": "Peminjaman",
        "backgroundColor": "#a09978",
        "data": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            2,
            4,
            2,
            0
        ]
    },
    {
        "id": "y1",
        "label": "Pengembalian",
        "backgroundColor": "#327faf",
        "data": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            4,
            0
        ]
    }
]
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
      if (this.useRaw) {
        console.log(this.rawData)
        let labels = []
        let labelsDs = []
        let datasets = []
        this.rawData.forEach((item) => {
          const itemLabels = _.get(item, 'labels', '');
          const splittedLabels = itemLabels.split(',')
          labelsDs = splittedLabels

          for (let key in item) {
            if (key.includes('y')) {
              const indexDs = _.findIndex(datasets, { id: key });
              if (indexDs === -1) {
                datasets.push({
                  id: key,
                  label: 'label',
                  backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16),
                  data: [Number(item[key])]
                })
              } else {
                datasets[indexDs].data.push(Number(item[key]))
                datasets[indexDs].label = labelsDs[indexDs]
              }
            }
            if (key === 'x') {
              labels.push(item[key])
            }
          }
        })

        console.log(datasets)
        this.chartData.labels = labels
        this.chartData.datasets = datasets
        return this.$refs.chart.renderChart(this.chartData, this.chartOptions)
      }

      this.chartData.labels = this.labels
      this.chartData.datasets[0].data = this.data

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
