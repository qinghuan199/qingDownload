<template>
  <div>
    <el-row class="m-b-20">
      <el-col>
        <el-card>
          <el-tabs
            tab-position="left"
            style="height: 200px"
            class="demo-tabs height-600"
          >
            <el-tab-pane :label="$t('IP白名单')"><ipWhite></ipWhite></el-tab-pane>
            <el-tab-pane :label="$t('IP白名单')"><blackList></blackList></el-tab-pane>
            <el-tab-pane :label="$t('落地页配置')"><fallDown></fallDown></el-tab-pane>
            <el-tab-pane :label="$t('遮盖配置')"><cover></cover></el-tab-pane>
            <el-tab-pane :label="$t('google插件')"><google></google> </el-tab-pane>
            <el-tab-pane :label="$t('声网配置')"><soundNet></soundNet></el-tab-pane>
            <el-tab-pane :label="$t('推送配置')"><push></push></el-tab-pane>
            <el-tab-pane :label="$t('OSS配置')"><OSS></OSS></el-tab-pane>
            <el-tab-pane :label="$t('上报过滤时间')"></el-tab-pane>
            <el-tab-pane :label="$t('黑屏过滤时间')"></el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import ipWhite from "./components/ipWhite.vue";
import blackList from "./components/blackList.vue";
import soundNet from "./components/soundNet.vue";
import push from "./components/push.vue";
import OSS from "./components/OSS.vue";
import cover from "./components/cover.vue";
import fallDown from "./components/fallDown.vue";
import google from "./components/google.vue";
</script>
<style lang="scss">

</style>
