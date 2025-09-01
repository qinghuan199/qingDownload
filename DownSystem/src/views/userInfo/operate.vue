<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{ $t("设备号") }}</span>
            <el-input
              v-model="state.deviceNo"
              class="card-input"
              :placeholder="$t('请输入')"
            />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{ $t("系统") }}</span>
            <el-select
              v-model="state.os"
              :placeholder="$t('请选择')"
              size=""
              class="card-input"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{ $t("用户名") }}</span>
            <el-input
              v-model="state.userName"
              class="card-input"
              :placeholder="$t('请输入')"
            />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{ $t("手机号") }}</span>
            <el-input
              v-model="state.tel"
              class="card-input"
              :placeholder="$t('请输入')"
            />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{ $t("系统版本") }}</span>
            <el-input
              v-model="state.androidVersion"
              class="card-input"
              :placeholder="$t('请输入')"
            />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{ $t("备注") }}</span>
            <el-input
              v-model="state.remark"
              class="card-input"
              :placeholder="$t('请输入')"
            />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{ $t("安装时间") }}</span>
            <el-date-picker
              v-model="state.installTime"
              type="date"
              :placeholder="$t('选择日期')"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            />
          </div>
          <!-- <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{ $t("今日授权") }}</span>
            <el-date-picker
              v-model="state.installTime"
              type="date"
              :placeholder="$t('选择日期')"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
            />
          </div> -->
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{ $t("账户状态") }}</span>
            <el-input
              v-model="state.status"
              class="card-input"
              :placeholder="$t('请输入')"
            />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{ $t("状态") }}</span>
            <el-input
              v-model="state.status"
              class="card-input"
              :placeholder="$t('请输入')"
            />
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-items-center u-flex-between">
          <div></div>
          <div>
            <el-tooltip effect="dark" :content="$t('刷新')" placement="top">
              <el-button type="primary" @click="refreshTable" size="small">
                <el-icon class="el-icon--right"><Refresh /></el-icon>
                {{ $t("重置") }}
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" :content="$t('查询')" placement="top">
              <el-button type="primary" @click="onlineDevicePage" size="small">
                <el-icon class="el-icon--right"><Refresh /></el-icon>
                {{ $t("查询") }}
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip effect="dark" :content="$t('今日授权')" placement="top">
              <el-button type="primary" @click="todayLicense" size="small">
                <el-icon class="el-icon--right"><Refresh /></el-icon>
                {{ $t("今日授权") }}
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table
          :data="state.tableData"
          style="width: 100%"
          class="m-b-10"
          size="small"
          v-loading="loading"
        >
          <el-table-column prop="deviceNo" :label="$t('设备号')" />
          <el-table-column prop="customerAccount" :label="$t('归属客服')" />
          <el-table-column prop="id" :label="$t('ID')" />
          <el-table-column prop="os" :label="$t('系统')" />
          <el-table-column prop="source" :label="$t('来源')" />
          <el-table-column prop="userName" :label="$t('用户名')" />
          <el-table-column prop="tel" :label="$t('手机号')" />
          <el-table-column prop="phoneModel" :label="$t('手机型号')" />
          <el-table-column prop="oemVersion" :label="$t('系统版本')" />
          <el-table-column prop="status" :label="$t('在线状态')">
            <template #default="scope">
              <el-tag
                :type="scope.row.status == 0 ? 'danger' : 'success'"
                disable-transitions
                size="small"
                >{{
                  scope.row.status == 0 ? "A" + $t("离线") : $t("在线")
                }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="" :label="$t('A包权限')">
            <!-- <template #default="scope">
              <el-tag
                :type="false ? 'danger' : 'success'"
                disable-transitions
                size="small"
                >无障碍权限</el-tag
              >
              <el-tag
                :type="true ? 'danger' : 'success'"
                disable-transitions
                size="small"
                >相册权限</el-tag
              >
            </template> -->
          </el-table-column>
          <el-table-column prop="" :label="$t('B包权限')" />
          <el-table-column prop="homeLocation" :label="$t('归属地')" />
          <el-table-column prop="androidVersion" :label="$t('Apk版本')" />
          <el-table-column prop="remark" :label="$t('备注')" />
          <el-table-column prop="installTime" :label="$t('安装时间')" />
          <el-table-column :label="$t('账户状态')">
            <template #default="scope">
              <el-tag
                :type="scope.row.status == 2 ? 'danger' : 'success'"
                disable-transitions
                size="small"
                >{{ scope.row.status == 2 ? $t("冻结") : $t("正常") }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="$t('状态')">
            <template #default="scope">
              <el-tag
                :type="scope.row.status == 0 ? 'danger' : 'success'"
                disable-transitions
                size="small"
                >{{ scope.row.status == 0 ? $t("离线") : $t("在线") }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column :label="$t('操作')">
            <template #default="scope">
              <el-dropdown @command="handleCommand" v-if="scope.row.showOp">
                <el-button type="primary" size="small">
                  <el-icon><Operation /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <!-- <router-link
                      :to="{
                        path: '/deviceControl/index',
                        query: {
                          deviceId: command.deviceId,
                          resolution: command.resolution,
                        },
                      }"
                    >  -->
                    <el-dropdown-item
                      :command="{
                        id: 'operate',
                        operate: scope.row,
                      }"
                    >
                      <el-icon><Operation /></el-icon>
                      {{ $t("操作端") }}
                    </el-dropdown-item>
                    <!-- </router-link> -->
                    <!-- <el-dropdown-item>
                      <el-icon><Operation /></el-icon>
                       {{$t('日记跟踪')}}</el-dropdown-item
                    >
                    <el-dropdown-item>
                      <el-icon><Operation /></el-icon>
                      {{$t('编辑')}}</el-dropdown-item
                    >
                    <el-dropdown-item>
                      <el-icon><Operation /></el-icon>
                        {{$t('录屏回放')}}</el-dropdown-item
                    > -->
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="state.paginationPages"
          :page-size="state.paginationSize"
          :background="true"
          :size="size"
          :layout="'total, sizes,prev, pager, next,jumper'"
          :total="state.paginationTotal"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 50]"
          @size-change="handleSizeChange"
        />
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import {
  getOnlineDevicePage,
  checkControlDevice,
} from "../../api/userInfo/operation";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { getUserId } from "@/utils/auth";
import Cookies from "js-cookie";
import { ElMessage } from "element-plus";

const { t } = useI18n();
const loading = ref(true);
const router = useRouter();
const state = reactive({
  paginationTotal: 10,
  paginationSize: 10,
  paginationPages: 1,
  tableData: [],

  deviceNo: "",
  os: "",
  userName: "",
  tel: "",
  androidVersion: "",
  remark: "",
  installTime: "",
  status: "",
  customerAccount: "",
  id: "",
  source: "",
});
const onlineDevicePage = () => {
  loading.value = true;
  getOnlineDevicePage({
    pageIndex: state.paginationPages,
    pageSize: state.paginationSize,
    deviceNo: state.deviceNo || "",
    os: state.os || "",
    userName: state.userName || "",
    tel: state.tel || "",
    androidVersion: state.androidVersion || "",
    remark: state.remark || "",
    installTime: state.installTime || "",
    status: state.status || "",
    onlyShowInstalled: true,
  }).then((res) => {
    loading.value = false;
    // console.log("我是在线终端", res);
    state.tableData = res.data.records;
    state.paginationTotal = res.data.total;
  });
};
const refreshTable = () => {
  state.deviceNo = "";
  state.os = "";
  state.userName = "";
  state.tel = "";
  state.androidVersion = "";
  state.remark = "";
  state.installTime = "";
  state.status = "";
  // state.customerAccount = "";
  // state.source = "";
  onlineDevicePage();
};
const handleCommand = (command) => {
  // console.log("我被点击了", command.operate);
  let data = JSON.stringify(command.operate);
  switch (command.id) {
    case "operate":
      checkControlDevice({
        deviceId: command.operate.deviceId,
        // adminId: `${getUserId()}_${Cookies.get("UUID")}`,
      }).then((res) => {
        console.log("我是checkControlDevice", res);
        if (res.data.isSuccess) {
          // router.push({
          //   // path: "/deviceControl/index",
          //   name: "deviceControl",
          //   params: { id: command.operate.deviceId },
          //   // query: { deviceId: command.deviceId, resolution: command.resolution },
          //   query: { command: data },
          //   meta: {
          //     title: `${command.operate.deviceId}`,
          //   },
          // });

          const routePath = router.resolve({
            path: "/deviceControl/index",
            query: {
              // token,
              command: data,
              _t: Date.now(),
            },
          });

          // 在新标签页打开
          window.open(routePath.href, "_blank");
        } else {
          ElMessage({
            message: res.data.message,
            type: "error",
          });
        }
      });
      // router.push(`//index/${}`);
      break;

    default:
      break;
  }
};

// 当前页码变化的事件
const handleCurrentChange = (val) => {
  //   state.changePage(val);
  state.paginationPages = val;
  onlineDevicePage();
  // console.log("页码变化", val, state.paginationPages);
};
// 处理页面大小更改
const handleSizeChange = (val) => {
  // pageSize.value = val;
  //   state.changePage(val);
  state.paginationSize = val;
  onlineDevicePage();
  // console.log(`每页显示条数: ${val}`);
};
const todayLicense = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  state.installTime = year + "-" + month + "-" + day;
  onlineDevicePage();
};

onMounted(() => {
  onlineDevicePage();
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
