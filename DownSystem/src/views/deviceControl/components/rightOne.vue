<template>
  <el-card>
    <el-row class="main-status">
      <el-col :span="24" class="top-box">
        <div class="u-flex u-flex-items-center">
          <span class="status-text">{{ $t("主线状态") }}:</span>
          <el-icon color="#18a058"><CircleCheckFilled /></el-icon>
        </div>
        <span class="status-text"
          >{{ $t("查询密码") }}:
          <span class="highlight">{{ state.searchPwd || "null" }}</span>
          <el-icon size="12"><Lock /></el-icon>
        </span>
        <span class="status-text"
          >{{ $t("安全密码") }}:
          <span class="highlight">{{ state.safetyPwd || "null" }}</span>
          <el-icon><Lock /></el-icon>
        </span>
        <span class="status-text"
          >{{ $t("登录密码") }}:
          <span class="highlight">{{ state.loginPwd || "null" }}</span></span
        >
      </el-col>

      <el-col :span="24" class="bottom-box">
        <el-button type="primary" size="small">{{ $t("刷新") }}</el-button>
        <el-button type="warning" size="small">{{ $t("反馈") }}</el-button>
        <el-button type="danger" size="small">{{ $t("审核失败") }}</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import phoneStore from "@/store/modules/controlPhone";
import { onMounted, reactive } from "vue";
import { nanoid } from "nanoid";
import Cookies from "js-cookie";
import { getUserId } from "@/utils/auth";
import { useI18n } from "vue-i18n";
import { getSearchPWD } from "@/api/operatingApi/index";

import { ElMessage } from "element-plus";
const { t } = useI18n();
const route = useRoute();

let routeQuery = JSON.parse(route.query.command);
const state = reactive({
  searchPwd: "", //查询密码
  safetyPwd: "", //安全密码
  loginPwd: "", //登录密码
});
const getPWD = () => {
  getSearchPWD(routeQuery.deviceId).then((res) => {
    console.log(res);
    state.searchPwd = res.data.searchPwd;
    state.safetyPwd = res.data.safetyPwd;
    state.loginPwd = res.data.loginPwd;
  });
};
onMounted(() => {
  getPWD();
});
</script>

<style scoped>
.main-status {
  /* padding: 10px; */
  /* background-color: #f5f5f5; */
  /* border: 1px solid #ebebeb; */
  /* border-radius: 8px; */
}

.top-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.bottom-box {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

.status-text {
  font-size: 12px;
  margin-right: 10px;
}

.status-tag {
  margin-right: 10px;
}

.highlight {
  font-weight: bold;
  color: #333;
}

.el-divider {
  height: 20px;
  margin: 0 10px;
}
</style>
