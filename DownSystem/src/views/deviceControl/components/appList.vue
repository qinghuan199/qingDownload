<template>
  <el-row>
    <!-- <el-col :span="24"> -->
    <div class="">
      <el-input
        v-model="state.appName"
        style="width: 240px"
        :placeholder="$t('搜索')"
        :prefix-icon="Search"
        @keyup.enter="onEnterPress"
      />
    </div>
    <!-- </el-col> -->
    <div class="m-l-30">
      <el-button
        icon="Lock"
        size="mini"
        @click="setOpenPackName('', $t('获取应用权限'))"
        >{{ $t("获取应用权限") }}</el-button
      >
      <el-button icon="Tickets" size="mini" class="m-l-30" @click="getApps();getAppsBank();appName=''">{{
        $t("获取应用列表")
      }}</el-button>
    </div>
    <el-col v-if="applist.length < 0" class="m-t-10">
      <el-alert
        :title="$t('未开启app列表权限或者app未上传')"
        type="warning"
        show-icon
      />
    </el-col>
    <div class="u-flex u-flex-between" v-else>
      <el-col :span="12">
        <el-card class="bankApp">
          <div>快捷APP</div>
          <div class="u-flex u-flex-wrap">
            <div class="item" v-for="(item, index) in appbanklist">
              <img :src="item.iconUrl" />
              <span>{{ item.appName }}</span>
              <div class="btn">
                <el-button
                  class="button"
                  type="danger"
                  size="mini"
                  @click="setOpenPackName(item, $t('卸载'))"
                  >{{ $t("卸载") }}</el-button
                >
                <el-button
                  class="button"
                  type="primary"
                  size="mini"
                  @click="setOpenPackName(item, $t('打开'))"
                  >{{ $t("打开") }}</el-button
                >
              </div>
            </div>
          </div>
          <div class="u-flex u-flex-end m-t-10">
            <el-pagination :current-page="currentPage" :page-size="pageSize" :background="true"
              :layout="'total, sizes, prev, pager, next, jumper'" :total="totalRecords"
              @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" @size-change="handleSizeChange" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="otherApp">
          <div>APP</div>
          <div class="u-flex u-flex-wrap">
            <div class="item" v-for="(item, index) in applist">
              <img :src="item.iconUrl" />
              <span>{{ item.appName }}</span>
              <div class="btn">
                <el-button
                  class="button"
                  type="danger"
                  size="mini"
                  @click="setOpenPackName(item, $t('卸载'))"
                  >{{ $t("卸载") }}</el-button
                >
                <el-button
                  class="button"
                  type="primary"
                  size="mini"
                  @click="setOpenPackName(item, $t('打开'))"
                  >{{ $t("打开") }}</el-button
                >
              </div>
            </div>
          </div>
          <div class="u-flex u-flex-end m-t-10">
            <el-pagination :current-page="currentPage1" :page-size="pageSize1" :background="true"
              :layout="'total, sizes, prev, pager, next, jumper'" :total="totalRecords1"
              @current-change="handleCurrentChange1" :page-sizes="[10, 20, 30, 40]" @size-change="handleSizeChange1" />
          </div>
        </el-card>
      </el-col>
    </div>
  </el-row>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";

import { nanoid } from "nanoid";
import Cookies from "js-cookie";
import { getUserId } from "@/utils/auth";
import phoneStore from "@/store/modules/controlPhone";
import { OnlineDeviceGetApps } from "@/api/operatingApi/index";
import { useI18n } from "vue-i18n";
// import { el } from "element-plus/es/locale";
const { t } = useI18n();
// const input = ref("");
const route = useRoute();
const applist = ref([]);
const appbanklist = ref([]);
const state = reactive({
  appName: "",
  packName: "",
});

let routeQuery = JSON.parse(route.query.command);
const baseParams = {
  terminal: 1,
  userId: routeQuery.deviceId,
  adminId: `${getUserId()}_${Cookies.get("UUID")}`,
  reqId: nanoid(),
};
const getApps = (appType) => {
  let data = {
    deviceId: routeQuery.deviceId,
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    appName: state.appName,
    appType:0
  };
  OnlineDeviceGetApps(data).then((res) => {
    // applist.value.length = 0;
    appbanklist.value.length = 0;
    totalRecords.value = res.data.total;
    res.data.records.forEach((item) => {
      if (item.appType == 0){
        appbanklist.value.push(item);
      }
    });
    // console.log("appbanklist.value", appbanklist.value);
    // console.log("applist.value", applist.value);
  });
};
const getAppsBank = (appType) => {
  let data = {
    deviceId: routeQuery.deviceId,
    pageIndex: currentPage1.value,
    pageSize: pageSize1.value,
    appName: state.appName,
    appType:1
  };
  OnlineDeviceGetApps(data).then((res) => {
    applist.value.length = 0;
    // appbanklist.value.length = 0;
    totalRecords1.value = res.data.total;
    res.data.records.forEach((item) => {
        applist.value.push(item);
    });
    // console.log("appbanklist.value", appbanklist.value);
    // console.log("applist.value", applist.value);
  });
};
const setOpenPackName = (item, i) => {
  switch (i) {
    case t("卸载"):
      phoneStore().setDynamicParams({
        ...baseParams,
        packType: 64, //必传
        strPack: item.packName,
      });
      break;
    case t("打开"):
      phoneStore().setDynamicParams({
        ...baseParams,
        packType: 62, //必传
        strPack: item.packName,
        // int32Pack: 3, //1.全局事件，需传参
      });
      break;
    case t("获取应用权限"):
      // console.log(t("获取应用权限"));

      phoneStore().setDynamicParams({
        ...baseParams,
        packType: 67, //必传
      });
      break;

    default:
      break;
  }

  // console.log("state.packName", state.packName);
};

const onEnterPress = () => {
  getApps();
  getAppsBank();
  currentPage.value = 1; // 重置到第一页
  currentPage1.value = 1; // 重置到第一页

};
//分页
const currentPage = ref(1);
const pageSize = ref(10);
const totalRecords = ref(0);
const handleCurrentChange = (page) => {
  currentPage.value = page;
  console.log("跳转到第", currentPage.value, "页");
  getApps(page); // 获取新的数据
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1; // 重置到第一页
  getApps();
};
//分页1
const currentPage1 = ref(1);
const pageSize1 = ref(10);
const totalRecords1 = ref(0);
const handleCurrentChange1 = (page) => {
  currentPage1.value = page;
  console.log("跳转到第", currentPage1.value, "页");
  getAppsBank(page); // 获取新的数据

};

const handleSizeChange1 = (size) => {
  pageSize1.value = size;
  currentPage1.value = 1; // 重置到第一页
  getAppsBank(); // 获取新的数据

};
onMounted(() => {
  // console.log("操作端");
  onEnterPress()

});
</script>
<style scoped>
.bankApp {
  /* width: 400px; */
  margin: 10px 10px 0 0;
}

.otherApp {
  margin-top: 10px;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 180px;
  /* background-color: #ddd; */
  margin: 8px 5px 0 0;
  border-radius: 5px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    padding: 10px;
    background-color: #f6f6f6;
  }

  span {
    margin: 10px 0;
  }

  .btn {
    display: flex;

    .button {
      width: 40px;
      height: 25px;
      font-size: 12px;
    }
  }
}
</style>
