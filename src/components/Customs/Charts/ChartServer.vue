<template>
  <div>
    <component
      :is="componentName"
      :data="data"
      :labels="labels"
      ref="charts"
    />
  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import Area from "@/components/Customs/Charts/Area";
import Bar from "@/components/Customs/Charts/Bar";
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
  },
  data() {
    return {
      labels: [],
      data: [],
      currentComponent: 'area'
    };
  },
  components: {
    'chart-area': Area,
    'chart-bar': Bar
  },
  methods: {
    async fetchDropdown() {
      if (!this.picker) {
        return;
      }
      try {
        const response = await axios.post(apiBackend + "/paging/dropdown", {
          picker: this.picker,
        });
        const rawData = _.get(response, "data.rows", []);
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
    this.fetchDropdown();
  },
};
</script>