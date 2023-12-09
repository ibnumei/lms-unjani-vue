<template>
  <div>
    <Pie
      v-if="!isEmpty"
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
    <div v-if="isEmpty">
      <hr />
      <h6>Data Tidak Terserdia</h6>
      <hr />
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs/legacy'

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart'
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
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      isEmpty: false,
    }
  },
  methods: {
    init () {
      this.chartData.labels = this.labels
      this.isEmpty = false;
      let dataFilled = false;
      const backgroundColor = []
      this.data.forEach((item) => {
        dataFilled = dataFilled || (item !== 0)
        const color = '#' + Math.floor(Math.random()*16777215).toString(16);
        backgroundColor.push(color)
      })
      this.chartData.datasets[0] = {
        backgroundColor,
        data: this.data
      }

      this.isEmpty = !dataFilled

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
