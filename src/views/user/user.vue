<template>
  <div>
    <div style="margin: 20px;"></div>

    <el-form :label-position="labelPosition" :inline="true" label-width="80px" :model="queryUser">
      <el-form-item label="用户名">
        <el-input v-model="queryUser.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="queryUser.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="queryUser.sex" placeholder="请选择性别">
          <el-option label="全部" value="any"></el-option>
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-card class="box-card" style="padding: 10px;">
      <el-table
        :border="true"
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="userName" label="用户名" width="120" align="center"></el-table-column>
        <el-table-column property="password" label="密码" width="120" align="center"></el-table-column>
        <el-table-column property="phone" label="手机号" width="120" align="center"></el-table-column>
        <el-table-column property="sex" label="性别" width="60" align="center"></el-table-column>

        <el-table-column property="age" label="出生日期" width="130" align="center"></el-table-column>

        <el-table-column property="email" label="邮箱" align="center" width="160"></el-table-column>
        <el-table-column property="hobby" label="个人简介" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="button-container">
              <el-button
                size="mini"
                icon="el-icon-edit"
                type="primary"
                @click="editUser(scope.row)"
              >修改</el-button>
              <el-button
                size="mini"
                icon="el-icon-delete"
                type="danger"
                @click="handleDelete(scope.row._id)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryUser.skip"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 弹窗 -->
    <div class="dialog-box">
      <el-dialog
        title="修改用户信息"
        :visible.sync="dialogTableVisible3"
        top="15vh"
        :modal-append-to-body="false"
      >
        <el-form label-position="right" label-width="110px" class="throught-wrapper">
          <el-form-item label="用户名" class="all-wrapper">
            <!-- <div>{{diaData.problemType}}</div> -->
            <el-input v-model="diaData.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <!-- <div>{{diaData.departmentRespVO.departmentName}}</div> -->
            <el-input v-model="diaData.password"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <!-- <div>{{diaData.staffRespVO.staffName}}</div> -->
            <el-input v-model="diaData.phone"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <!-- {{diaData.distributeTime}} -->
            <el-select v-model="diaData.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
            <!-- <el-input v-model="diaData.sex"></el-input> -->
          </el-form-item>
          <el-form-item label="出生日期">
            <!-- {{diaData.distributeTime}} -->
            <el-input readonly v-model="diaData.age"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <!-- {{diaData.distributeTime}} -->
            <el-input v-model="diaData.email"></el-input>
          </el-form-item>
          <el-form-item label="个人简介">
            <!-- {{diaData.content}} -->
            <el-input
              type="textarea"
              resize="none"
              :autosize="{ minRows: 2, maxRows: 5 }"
              v-model="diaData.hobby"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="submitEditUser">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getUser, delUser, editUser } from "@/api/user.js";
export default {
  data() {
    return {
      dialogTableVisible3: false,
      queryUser: {
        name: "",
        phone: "",
        sex: "any",
        skip: 1,
        limit: 10
      },
      diaData: {
        userName: "",
        password: "",
        phone: "",
        sex: "",
        age: "",
        email: "",
        hobby: ""
      },
      total: 1,
      labelPosition: "right",
      // formLabelAlign: {
      //   name: "",
      //   region: "",
      //   type: "",
      // },
      tableData: []
    };
  },
  created() {
    this.onSubmit();
  },
  methods: {
    onSubmit() {
      this.queryUser.skip = 1;
      getUser(this.queryUser).then(
        res => {
          console.log("api tableData :", res);
          this.tableData = res.userInfo;
          this.total = res.total;
        },
        err => {
          console.log("err :", err);
        }
      );
    },
    submitEditUser() {
      console.log("打印修改用户的额数据");
      console.log(this.diaData);
      editUser(this.diaData).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.dialogTableVisible3 = false;
          this.$message.success("修改用户成功");
          getUser(this.queryUser).then(
            res => {
              console.log("api tableData :", res);
              this.tableData = res.userInfo;
              this.total = res.total;
            },
            err => {
              console.log("err :", err);
            }
          );
        }
      });
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log("当前页码十多" + val);
      this.queryUser.skip = val;
      getUser(this.queryUser).then(
        res => {
          console.log("api tableData :", res);
          this.tableData = res.userInfo;
        },
        err => {
          console.log("err :", err);
          this.total = res.total;
        }
      );
    },
    //删除用户
    handleDelete(_id) {
      console.log("打印id");
      console.log(_id);
      delUser(_id).then(
        res => {
          if (res.code == 200) {
            this.$message.success("删除用户成功");
            this.onSubmit();
          }
        },
        err => {
          console.log("err :", err);
        }
      );
    },
    //修改用户
    editUser(userdata) {
      this.diaData = JSON.parse(JSON.stringify(userdata));

      this.dialogTableVisible3 = true;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.button-container {
  min-width: 200px;
}
.dialog-box {
  /deep/ .el-select {
    width: 100% !important;
  }
}
</style>
