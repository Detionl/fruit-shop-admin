<template>
  <div style="display:inline-block;" class="radio-container">
    <label class="radio-label">单元格是否自适应:</label>
    <el-radio-group v-model="autoWidth">
      <el-radio :label="true" border>True</el-radio>
      <el-radio :label="false" border>False</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    autoWidth: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.radio-container /deep/ .el-radio {
  margin-right: 0;
}
</style>
