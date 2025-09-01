<template>
  <el-header height="60px" class="header">
    <div class="header-left">
      <!-- <el-icon class="icon highlight-text2"><Iphone /></el-icon>
      <span class="brand highlight-text2">REDMI</span> -->
      <el-divider direction="vertical" />
      <span class="small-text"
        >{{ $t("手机") }}: {{ state.phoneInfo.phoneModel }}
      </span>
      <el-divider direction="vertical" />
      <span class="small-text"
        >{{ $t("提示") }}: {{ state.phoneInfo.tel }}</span
      >
      <el-tag class="small-text" type="success">{{ $t("在线") }}</el-tag>
    </div>
    <!-- <div class="header-right">
      <span class="small-text highlight-text2">{{ $t("系统已启动监控") }}</span>
      <el-divider direction="vertical" />

      <el-icon class="icon"><List /></el-icon>

      <span class="small-text"><span class="highlight-text">93%</span></span>
      <el-divider direction="vertical" />

      <span class="small-text"
        >{{ $t("在线时长") }}:<span class="highlight-text"
          >1{{ $t("时") }} 25{{ $t("分") }}</span
        ></span
      >
      <el-divider direction="vertical" />

      <span class="small-text"
        >{{ $t("无障碍时长") }}:<span class="highlight-text"
          >1 {{ $t("时") }} 5 {{ $t("分") }}</span
        ></span
      >
      <el-divider direction="vertical" />

      <span class="small-text"
        >{{ $t("离线时间") }}:
        <span class="highlight-text">{{ $t("未知") }}</span>
      </span>
      <el-divider direction="vertical" />

      <span class="small-text">{{ $t("加白状态") }}: {{ $t("未知") }}</span>
      <el-badge :value="1" class="notification-badge">
        <el-icon class="icon"><bell /></el-icon>
      </el-badge>
    </div> -->
  </el-header>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ElHeader, ElTag, ElBadge, ElIcon } from "element-plus";
import { Iphone, List, Bell } from "@element-plus/icons-vue";
const route = useRoute();
const state = reactive({
  phoneInfo: { ...JSON.parse(route.query.command) },
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #f5f5f5;
  align-items: center;
  height: 50px;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-left .brand {
  /* margin: 0 10px; */
  font-weight: bold;
}

.header-right span {
  /* margin: 0 10px; */
}

.notification-badge {
  margin-left: 20px;
}
.small-text {
  font-size: 10px;
}

.icon {
  font-size: 12px;
  margin-right: 5px;
}
.highlight-text {
  color: #099d6c;
}
.highlight-text2 {
  color: #096dd9;
}
</style>
