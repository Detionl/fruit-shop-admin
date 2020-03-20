<template>
  <div class="dashboard-editor-container">
    <panel-group :totalData="totalNum" @handleSetLineChartData="handleSetLineChartData" />
    <el-card class="box-card" style="padding: 10px;">
      <ve-histogram :data="chartData"></ve-histogram>
    </el-card>
  </div>
</template>

<script>
import { getCount } from "@/api/shop.js";
import { getOrderByTime } from "@/api/order.js";
import PanelGroup from "./components/PanelGroup";
export default {
  data() {
    return {
      totalNum: {},
      chartData: {
        columns: [],
        rows: []
      }
    };
  },
  created() {
    getCount().then(res => {
      console.log(res);
      this.totalNum = res.data;
    });
    getOrderByTime().then(res => {
      console.log(res);
      this.chartData = res.data;
    });
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    }
  },
  components: {
    PanelGroup
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  height: 100vh;
  position: relative;
}
</style>
