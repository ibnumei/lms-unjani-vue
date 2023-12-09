<template>
  <div>
    <component
      :is="componentName"
      :data="data"
      :labels="labels"
      :rawData="rawData"
      :useRaw="useRaw"
      ref="charts"
      :customLabel="customLabel"
    />
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import Area from "@/components/Customs/Charts/ChartArea";
import Bar from "@/components/Customs/Charts/ChartBar";
import Pie from "@/components/Customs/Charts/ChartPie";
import { apiBackend } from "@/constants/config";
import FormTool from "@/components/Customs/FormTool";

export default {
  props: {
    containerClass: {
      type: String,
      default: "chart-container",
    },
    type: {
      type: String,
      default: "area",
    },
    shadow: {
      type: Boolean,
      default: false,
    },
    picker: { type: String, required: true, default: null },
    filters: { type: Array, required: false, default: () => [] },
    useRaw: {
      type: Boolean,
      default: false,
    },
    customLabel: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      labels: [],
      data: [],
      currentComponent: 'area',
      rawData: []
    };
  },
  components: {
    'chart-area': Area,
    'chart-pie': Pie,
    'chart-bar': Bar
  },
  methods: {
    async fetchData() {
      if (!this.picker) {
        return;
      }
      try {
        const response = await axios.post(apiBackend + "/paging/dropdown", {
          picker: this.picker,
          filters: this.filters
        });
        const rawData = _.get(response, "data.rows", []);
        this.rawData = rawData;
        const labels = [];
        const data = [];
        rawData.forEach((element) => {
          labels.push(element.x);
          data.push(element.y);
        });
        this.labels = labels;
        this.data = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    componentName () {
      return `chart-${this.type}`
    }
  },
  mounted() {
    this.fetchData();
  },
};
</script>