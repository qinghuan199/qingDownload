<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{ $t('手机型号') }}</span>
            <el-input v-model="MonitoringData.brand" class="card-input" :placeholder="$t('请输入')"
              :suffix-icon="Calendar" />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t('设备号') }}</span>
            <el-input v-model="MonitoringData.deviceId" class="card-input" :placeholder="$t('请输入')"
              :suffix-icon="Calendar" />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t('管理端号') }}</span>
            <el-input v-model="MonitoringData.adminId" class="card-input" :placeholder="$t('请输入')"
              :suffix-icon="Calendar" />
          </div>
          <!-- <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t('账号') }}</span>
            <el-select v-model="value" :placeholder="$t('请选择')" size="large" class="card-input">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div> -->
          <!--
         
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t('操作时间') }}</span>
            <el-date-picker
              v-model="value1"
              type="date"
              :placeholder="$t('选择日期')"
              :size="size"
            />
          </div> -->
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-items-center u-flex-between">
          <div>
            <!-- <el-button type="success" @click="refresh" size="small">
              <el-icon></el-icon>
              {{ $t('新增') }}
            </el-button> -->
          </div>
          <div>
            <el-tooltip effect="dark" :content="$t('刷新')" placement="top">
              <el-button type="" @click="refresh" size="small">
                <el-icon class="el-icon--right">
                  <Refresh />
                </el-icon> {{ $t('重置') }}
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip effect="dark" :content="$t('查询')" placement="top">
              <el-button type="primary" @click="searchMonitoringLog" size="small">
                <el-icon class="el-icon--right">
                  <Refresh />
                </el-icon> {{ $t('查询') }}
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table v-loading="loading" :data="tableData" style="width: 100%" class="m-10-0" size="small">
          <el-table-column prop="brand" :label="$t('手机型号')" />
          <el-table-column prop="deviceId" :label="$t('设备号')" />
          <el-table-column prop="adminId" :label="$t('管理端号')" />
          <el-table-column prop="androidVersion" :label="$t('安卓版本')" />
          <el-table-column prop="appVersion" :label="$t('APP版本')" />
          <el-table-column prop="errorMessage" :label="$t('错误信息')" />
          <el-table-column prop="createdDate" :label="$t('创建时间')" />
        </el-table>
        <div class="u-flex u-flex-end m-t-10">
          <el-pagination :current-page="currentPage" :page-size="pageSize" :background="true"
            :layout="'total, sizes, prev, pager, next, jumper'" :total="totalRecords"
            @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 50]" @size-change="handleSizeChange" />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import { reactive, ref } from "vue";
import { ElMessage,ElMessageBox } from 'element-plus'
import {
  getMonitoringLogPage,
} from "@/api/system/deviceLog";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const state = reactive({});
const loading = ref(true);
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
const MonitoringData = reactive({
  brand: "",
  deviceId: "",
  adminId: "",
});
const searchMonitoringLog = () => {
  loading.value = true;
  getMonitoringLogPage({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    brand: MonitoringData.brand,
    deviceId: MonitoringData.deviceId,
    adminId: MonitoringData.adminId,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        loading.value = false;
        console.log("查询日志列表成功", res.data.records);
      }
    })
    .catch((error) => {
      console.error("查询日志列表数据失败", error);
    });
};

const tableData = ref([]);
// 获取人员列表数据
const getMonitoringLog = () => {
  loading.value = true;
  getMonitoringLogPage({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    brand: MonitoringData.brand,
    deviceId: MonitoringData.deviceId,
    adminId: MonitoringData.adminId,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        loading.value = false;
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        console.log("获取日志列表数据", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取日志列表数据失败", error);
    });
};
//分页
const currentPage = ref(1);
const pageSize = ref(10);
const totalRecords = ref(0);
const handleCurrentChange = (page) => {
  currentPage.value = page;
  console.log("跳转到第", currentPage.value, "页");
  getMonitoringLog(page); // 获取新的数据
};
// 处理页面大小更改
const handleSizeChange = (val) => {
  // pageSize.value = val;
  //   state.changePage(val);
  console.log(`每页显示条数: ${val}`);
};
//刷新当前数据
const refresh = () => {
  MonitoringData.brand = "";
  MonitoringData.deviceId = "";
  MonitoringData.adminId = "";
  currentPage.value = 1;
  pageSize.value = 10;
  ElMessage({
    message: t('刷新成功'),
    type: 'success',
  })
  getMonitoringLog(); // 重新获取数据
};
onMounted(() => {
  getMonitoringLog();
});
</script>
<style lang="scss">
.box-card-input {
  // width:300px;
  margin-bottom: 10px;

  .card-title {
    width: 100px;
    text-align: right;
    margin-right: 10px;
  }

  .card-input {
    width: 220px;
  }
}
</style>
