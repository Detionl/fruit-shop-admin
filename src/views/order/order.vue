<template>
  <div class="order-container">
    <div style="margin: 20px;">
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="el-icon-document"
        @click="handleDownload"
      >导出 Excel</el-button>
    </div>
    <!-- 表格 -->
    <el-card class="box-card" style="padding: 10px;">
      <el-table
        :border="true"
        ref="singleTable"
        :data="list"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="id" label="订单号" width="150" align="center"></el-table-column>
        <el-table-column property="addressName" label="收货人" width="120" align="center"></el-table-column>
        <el-table-column property="address" label="收货地址" min-width="150" align="center"></el-table-column>
        <el-table-column property="tel" label="收货手机" width="120" align="center"></el-table-column>
        <el-table-column property="createDate" label="下单时间" width="100" align="center"></el-table-column>
        <el-table-column property="productName" label="购买商品" width="120" align="center"></el-table-column>

        <el-table-column property="buyNum" label="购买数量" width="130" align="center"></el-table-column>

        <el-table-column property="price" label="购买价格" align="center" width="160"></el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryOrder.skip"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { switchTime } from "../../utils/index";
import { getOrder } from "@/api/order.js";
import FilenameOption from "./components/FilenameOption";
import AutoWidthOption from "./components/AutoWidthOption";
import BookTypeOption from "./components/BookTypeOption";
export default {
  data() {
    return {
      list: [],
      listLoading: true,
      downloadLoading: false,
      filename: "",
      autoWidth: true,
      bookType: "xlsx",
      queryOrder: {
        skip: 0,
        limit: 10
      },
      tableData: [],
      labelPosition: "right",
      total: 1
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log("当前页码十多" + val);
      this.queryOrder.skip = val;
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      getOrder(this.queryOrder).then(res => {
        console.log(res.data);
        this.total = res.total;
        let listArray = [];

        if (res.data instanceof Array) {
          res.data.forEach((item, index) => {
            // let a = switchTime(item.createDate, "YYYY-MM-DD hh:mm:ss");
            // console.log("转化前" + a);
            let order = {
              id: item._id,
              addressName: item.addressId.name,
              address: item.addressId.address,
              tel: item.addressId.tel,
              productName: item.productId.name,
              buyNum: item.buyNum,
              price: item.productId.price,
              createDate: switchTime(item.createDate, "YYYY-MM-DD hh:mm:ss")
            };
            listArray.push(order);
          });
          this.list = listArray;
        }
        this.listLoading = false;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "订单号",
          "收货人",
          "收货地址",
          "收货手机",
          "下单时间",
          "购买商品",
          "购买数量",
          "购买价格"
        ];
        const filterVal = [
          "id",
          "addressName",
          "address",
          "tel",
          "createDate",
          "productName",
          "buyNum",
          "price"
        ];
        const list = this.list;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    onSubmit() {}
  },
  components: {
    FilenameOption,
    AutoWidthOption,
    BookTypeOption
  }
};
</script>

<style lang="scss" scoped></style>
