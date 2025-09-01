<template>
  <div class="page-container">
    <el-card class="password-history">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane :label="$t('用户日志')" name="first">
          <el-card class="password-history">
            <el-row align="center" class="">
              <el-col :span="18" class="u-flex u-flex-items-center">
                <span class="font-size-13">{{$t('日志信息')}}</span>
              </el-col>
              <el-col :span="6" class="u-flex u-flex-items-center u-flex-end">
                <el-button type="" icon="refresh">{{$t('刷新')}}</el-button>
              </el-col>
            </el-row>
            <el-row align="center" class="">
              <el-col class="u-flex u-flex-items-center u-flex-end">
                <el-table
                  v-loading="loading"
                  :data="tableData"
                  style="width: 100%"
                  class="m-b-10"
                  size="small"
                  border
                >
                  <el-table-column prop="DateTime" label="DateTime" />
                  <el-table-column prop="Module" label="Module" />
                  <el-table-column prop="Content" label="Content" />
                  <el-table-column prop="Params" label="Params" /> </el-table
              ></el-col>
            </el-row>
            <div class="u-flex u-flex-end m-t-10">
              <el-pagination
                :current-page="currentPage"
                :page-size="pageSize"
                :background="true"
                :layout="'total, sizes, prev, pager, next, jumper'"
                :total="totalRecords"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]"
                @size-change="handleSizeChange"
              />
            </div> </el-card
        ></el-tab-pane>
        <el-tab-pane :label="$t('指令日志')" name="second">Config</el-tab-pane>
      </el-tabs>
      <el-row class="top" justify="space-between" align="center">
        <el-col :span="6" class="u-flex u-flex-items-center"> </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const loading = ref(false);
const state = reactive({
  dialogVisible: false, // 控制弹窗显示
  fileList: [], // 存储上传的文件列表
  fullscreen: false, // 控制弹窗是否全屏
  groupTitle: "",
  followUp: false, //新增弹窗
  modalMode: "add", //新增
  groupId: null, //组id
});

//分页
const currentPage = ref(1);
const pageSize = ref(10);
const totalRecords = ref(0);
const handleCurrentChange = (page) => {
  currentPage.value = page;
  console.log("跳转到第", currentPage.value, "页");
  getIpWhite(page); // 获取新的数据
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1; // 重置到第一页
  getIpWhite(); // 获取新的数据
};

const tableData = ref([
  {
    DateTime: "aaaaaaa",
    Content: "内容",
  },
  { DateTime: "aaaaaaa", Content: "内容" },
]);
</script>
<style scoped lang="scss">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.page-container {
  display: flex;
  justify-content: space-between;
}

.password-history {
  //   flex: 1;
  width: 100%;
  .middle {
    font-size: 12px;
    border: 1px solid #ddd;
    background-color: #fafafc;

    .item {
      padding: 5px;
      text-align: center;
      border-right: 1px solid #ddd;
    }

    .item:last-child {
      border-right: none;
    }
  }
}

.bank-history {
  margin-left: 10px;
}

.el-row {
  margin-bottom: 10px;
}

.el-row:last-child {
  margin-bottom: 0;
}
</style>
