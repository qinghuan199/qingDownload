<template>
  <el-config-provider :locale="elementLocale">
    <router-view :key="$route.fullPath" />
  </el-config-provider>
</template>

<script setup>
import useSettingsStore from "@/store/modules/settings";
import { handleThemeStyle } from "@/utils/theme";

const { elementLocale } = useSettingsStore();
onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(useSettingsStore().theme);
  });
  if (!sessionStorage.getItem("reloaded")) {
    sessionStorage.setItem("reloaded", "true");
    window.location.reload();
  }
});
</script>
