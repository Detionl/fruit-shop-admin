<template>
  <div class="shop-container">
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" :inline="true" label-width="80px" :model="queryShop">
      <el-form-item label="商品名">
        <el-input v-model="queryShop.name" placeholder="请输入商品名"></el-input>
      </el-form-item>
      <el-form-item label="商品类型">
        <el-select v-model="queryShop.typeId" placeholder="请选择性别">
          <el-option label="全部" value="any"></el-option>
          <el-option
            v-for="(item, index) in types"
            :key="index"
            :label="item.typeName"
            :value="item.typeId"
          ></el-option>
          <!-- <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card" style="padding: 10px;">
      <el-table
        :border="true"
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="name" label="水果名" width="120" align="center"></el-table-column>
        <el-table-column property="price" label="价格" width="120" align="center"></el-table-column>
        <el-table-column property="saleNum" label="销售量" width="120" align="center"></el-table-column>
        <el-table-column property="goodNum" label="库存" width="120" align="center"></el-table-column>
        <el-table-column label="评分" width="170" align="center">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.rate" disabled :max="5"></el-rate>
          </template>
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <div class="picture">
              <el-image
                v-for="(item, index) in scope.row.imgList"
                :key="index"
                style="width: 50px; height: 50px"
                :src="item.pic"
                :preview-src-list="item.pic.split()"
              ></el-image>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryShop.skip"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getUser, delUser } from "@/api/user.js";
import { getType, getShop } from "@/api/shop.js";
export default {
  data() {
    return {
      types: [],
      queryShop: {
        name: "",
        typeId: "any",
        skip: 1,
        limit: 10
      },
      total: 1,
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      tableData: []
    };
  },
  created() {
    this.onSubmit();
    getType().then(res => {
      // console.log("打印商品的类型");
      // console.log(res);
      this.types = res.data;
    });
  },
  methods: {
    onSubmit() {
      this.queryShop.skip = 1;
      getShop(this.queryShop).then(
        res => {
          console.log("api tableData :", res);
          this.tableData = res.data;
          this.total = res.total;
        },
        err => {
          console.log("err :", err);
        }
      );
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log("当前页码十多" + val);
      this.queryShop.skip = val;
      getShop(this.queryShop).then(
        res => {
          console.log("api tableData :", res);
          this.tableData = res.data;
          this.total = res.total;
        },
        err => {
          console.log("err :", err);
        }
      );
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.shop-container {
  .picture {
    display: flex;
    justify-content: space-around;
    min-width: 200px;
  }
}
</style>
