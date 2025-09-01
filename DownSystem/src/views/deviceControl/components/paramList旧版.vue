<template>
  <!-- <el-aside class="sidebar"> -->
  <el-card>
    <div
      class="toolbar-item"
      v-for="(item, index) in toolbarItems"
      :key="index"
    >
      <el-row
        :gutter="10"
        class="clickable-row"
        align="middle"
        @click="handleRowClick(item)"
      >
        <el-col :span="4">
          <el-icon :size="10">
            <component :is="item.icon"></component>
          </el-icon>
        </el-col>
        <el-col :span="15">
          <span>{{ item.label }}</span>
        </el-col>
        <el-col :span="3">
          <template v-if="item.hasArrow">
            <el-popover
              v-if="item.label === '粘贴文本'"
              placement="top"
              width="200"
              hide-after="6000"
              v-model:visible="item.popoverVisible"
            >
              <div>
                <el-input
                  v-model="item.inputText"
                  placeholder="请输入文本"
                ></el-input>
                <el-button type="primary" @click="handleConfirm(item)"
                  >{{ $t('确定') }}</el-button
                >
              </div>
              <template #reference>
                <el-icon @click="showPopover(item)" :size="10">
                  <ArrowRight />
                </el-icon>
              </template>
            </el-popover>

            <!-- 其他项箭头 -->
            <el-icon v-else :size="10">
              <ArrowRight />
            </el-icon>
          </template>
          <template v-else>
            <!-- 解锁屏幕的弹出框 -->

            <el-popover
              v-if="item.label === '解锁手机屏幕'"
              placement="top"
              width="200"
              hide-after="6000"
              v-model:visible="item.popoverVisible"
            >
              <div>
                <el-input
                  v-model="item.password"
                  placeholder="请输入屏幕密码"
                  show-password
                ></el-input>
                <el-button type="primary" @click="handleUnlock(item)"
                  >{{ $t('确定') }}</el-button
                >
              </div>
              <template #reference>
                <!-- <el-icon @click="showPopover(item)" :size="10">
                  <ArrowRight />
                </el-icon> -->
              </template>
            </el-popover>
            <!-- @change="handleCheckboxChange(item.label, item.checked)" -->
            <el-checkbox class="width-30" v-model="item.checked"></el-checkbox>
          </template>
        </el-col>
      </el-row>
    </div>
  </el-card>

  <!-- </el-aside> -->
</template>

<script setup>
import {
  VideoCamera,
  Cellphone,
  Picture,
  Unlock,
  Lock,
  Mute,
  CloseBold,
  CopyDocument,
  Sunny,
  Bell,
  Refresh,
} from "@element-plus/icons-vue";

import { getUserId } from "@/utils/auth";
import { ref } from "vue";
import { ElMessage } from "element-plus";

import Cookies from "js-cookie";
import phoneStore from "@/store/modules/controlPhone";
import { nanoid } from "nanoid";
const route = useRoute();
const toolbarItems = ref([
  { icon: VideoCamera, label: "屏幕录制", checked: false, hasArrow: false },
  { icon: Cellphone, label: "黑屏助手", checked: false, hasArrow: false },
  { icon: Picture, label: "黑屏贴图", checked: false, hasArrow: false },
  { icon: Unlock, label: "点亮屏幕", checked: false, hasArrow: false },
  {
    icon: Lock,
    label: "解锁手机屏幕",
    checked: false,
    hasArrow: false,
    popoverVisible: false,
    password: "",
  },
  { icon: CloseBold, label: "屏幕覆盖", checked: false, hasArrow: false },
  {
    icon: Lock,
    label: "新屏幕覆盖",
    checked: false,
    hasArrow: false,
  },
  { icon: Mute, label: "设备静音", checked: false, hasArrow: false },
  { icon: CloseBold, label: "不可卸载", checked: false, hasArrow: false },
  {
    icon: CopyDocument,
    label: "粘贴文本",
    checked: false,
    hasArrow: true,
    popoverVisible: false,
    inputText: "",
  },
  { icon: Sunny, label: "亮度调节", checked: false, hasArrow: true },
  {
    icon: CopyDocument,
    label: "修改分辨率",
    checked: false,
    hasArrow: true,
  },
  { icon: Bell, label: "发送通知", checked: false, hasArrow: true },
  { icon: Refresh, label: "录屏回放", checked: false, hasArrow: true },
  { icon: Refresh, label: "获取屏幕", checked: false, hasArrow: true },
]);
let PackType = ref({
  terminal: 1, //终端类型1为管理终端
  packType: 5,
  userId: route.query.deviceId, //发给哪个终端
  userId_uid: getUserId(),
  // INIT: 3, // 初始化
  adminId: "fde454f620881c9543",
  reqId: nanoid(),
  // int32Pack: ,
  // 返回按钮：1
  // 桌面按钮：2
  // 菜单按钮：3
  // 显示通知：4
  // 显示快捷设置：5
  // 屏幕锁屏：8
  // 屏幕截图：9
  // touchXY: ,//2.屏幕触摸，需传参

  // str_pack: "我是测试文本", //3.填入文本，需传参

  // strPack: 1234569, //4.唤醒屏幕，需传参  14789

  // input_password: "123456", //5.输入密码，需传参

  // str_pack:'',//6.点击文本，需传参

  // sms: "我是测试短信1627", //7.发送短信，需传参

  // scriptType.number,req_id :'',//8.运行脚本，需传参

  // LOGIN_ADMIN: 1, // 管理端登录
  // TOUCH: 2, // 触摸事件
  // ACCESSIBLE_GLOBAL: 3, // 无障碍全局动作
  // INPUT_TEXT: 4, // 填入文本
  // START_RECORD_SCREEN: 5, // 启动录屏
  // STOP_RECORD_SCREEN: 6, // 停止录屏
  // USER_TERMINAL_STATE: 7, // 上传用户端状态
  // OPERATIONAL_LOG: 8, // 上传操作日志
  // UNLOCK_SCREEN: 9, // 解锁屏幕
  // INPUT_PASSWORD: 10, // 输入密码
  // CLICK_TEXT: 11, // 点击文本
  // OPEN_BLACK_MASK: 12, // 开启黑屏遮罩
  // LAYOUT_READER: 13, // 布局数据
  // PING: 14, // Ping
  // PONG: 15, // Pong
});

const handleRowClick = (item) => {
  if (item.hasArrow) {
    if (item.label === "粘贴文本") {
      console.log("item", item.label);
      showPopover(item);
    } else {
      handleArrowClick(item);
    }
  } else {
    switch (item.label) {
      case "解锁手机屏幕":
        console.log("item", item.label);
        item.popoverVisible = !item.checked;
        // showPopover(item);
        break;
      case "屏幕覆盖":
        // console.log("我是", label);

        phoneStore().setDynamicParams({
          terminal: 1, //终端类型1为管理终端  必传
          packType: 12, //必传
          userId: route.query.deviceId, //发给哪个终端
          // userId_uid: getUserId(),
          adminId: `${getUserId()}_${Cookies.get("UUID")}`,
          reqId: nanoid(), //必传
          // int32Pack: 3, //1.全局事件，需传参
        });
        break;
      default:
        break;
    }
    item.checked = !item.checked;

    // if (item.checked == true) {
    console.log("勾选", item.checked);
    handleCheckboxChange(item.label, item.checked);
    // }
  }
};

// 处理复选框选中状态变化
const handleCheckboxChange = (label, checked) => {
  console.log(`"${label}" 的选中状态变为: ${checked}`);
  // item.checked = !item.checked;
  if (!checked) {
    return;
  }
  switch (label) {
    case "点亮屏幕":
      // console.log("我是", label);

      phoneStore().setDynamicParams({
        terminal: 1, //终端类型1为管理终端  必传
        packType: 19, //必传
        userId: route.query.deviceId, //发给哪个终端
        // userId_uid: getUserId(),
        adminId: `${getUserId()}_${Cookies.get("UUID")}`,
        reqId: nanoid(), //必传
        // int32Pack: 3, //1.全局事件，需传参
      });
      break;
    case "解锁手机屏幕":
      // console.log("我是", label);
      phoneStore().setDynamicParams({
        terminal: 1, //终端类型1为管理终端  必传
        packType: 19, //必传
        userId: route.query.deviceId, //发给哪个终端
        // userId_uid: getUserId(),
        adminId: `${getUserId()}_${Cookies.get("UUID")}`,
        reqId: nanoid(), //必传
        // int32Pack: 3, //1.全局事件，需传参
      });
      break;
    case "黑屏助手":
      phoneStore().setDynamicParams({
        terminal: 1, //终端类型1为管理终端  必传
        packType: 5, //必传
        userId: route.query.deviceId, //发给哪个终端
        // userId_uid: getUserId(),
        adminId: `${getUserId()}_${Cookies.get("UUID")}`,
        reqId: nanoid(), //必传
        // int32Pack: 3, //1.全局事件，需传参
      });
      break;
      showPopover(item);

    case "设备静音":
      // console.log("我是", label);

      phoneStore().setDynamicParams({
        terminal: 1, //终端类型1为管理终端  必传
        packType: 63, //必传
        userId: route.query.deviceId, //发给哪个终端
        // userId_uid: getUserId(),
        adminId: `${getUserId()}_${Cookies.get("UUID")}`,
        reqId: nanoid(), //必传
        // int32Pack: 3, //1.全局事件，需传参
      });
      break;

    default:
      break;
  }
};

// 显示弹出层
const showPopover = (item) => {
  console.log("showPopover-item", item);

  item.popoverVisible = true;
};
// 处理箭头点击的函数
const handleArrowClick = (item) => {
  ElMessage({
    message: "消息已发送",
    type: "success",
  });
  switch (item.label) {
    case "粘贴文本":
      break;
    case "录屏回放":
      phoneStore().setDynamicParams({
        terminal: 1, //终端类型1为管理终端  必传
        packType: 3, //必传
        userId: route.query.deviceId, //发给哪个终端
        // userId_uid: getUserId(),
        adminId: `${getUserId()}_${Cookies.get("UUID")}`,
        reqId: nanoid(), //必传
        int32Pack: 3, //1.全局事件，需传参
      });
      break;

    default:
      break;
  }
};
// 处理粘贴文本确定按钮点击
const handleConfirm = (item) => {
  phoneStore().setDynamicParams({
    terminal: 1, //终端类型1为管理终端  必传
    packType: 4, //必传
    userId: route.query.deviceId, //发给哪个终端
    // userId_uid: getUserId(),
    adminId: `${getUserId()}_${Cookies.get("UUID")}`,
    reqId: nanoid(), //必传
    strPack: item.inputText,
  });
  console.log("输入的文本是:", item.inputText);

  item.popoverVisible = false;
};
// 处理解锁手机密码确定按钮点击
const handleUnlock = (item) => {
  phoneStore().setDynamicParams({
    terminal: 1, //终端类型1为管理终端  必传
    packType: 9, //必传
    userId: route.query.deviceId, //发给哪个终端
    // userId_uid: getUserId(),
    adminId: `${getUserId()}_${Cookies.get("UUID")}`,
    reqId: nanoid(), //必传
    strPack: item.password,
  });
  console.log("输入的文本是:", item.password);

  item.popoverVisible = false;
};
</script>

<style scoped>
.sidebar {
  background-color: #f9f9f9;
  padding: 10px;
  width: 100%;
}

.toolbar-item {
  margin-bottom: 0px;
}

.toolbar-item span {
  font-size: 10px;
}

.el-icon-arrow-right {
  text-align: right;
  cursor: pointer;
}

/* 为 el-row 添加点击效果的小手 */
.clickable-row {
  cursor: pointer; /* 鼠标悬停时显示小手 */
}

.clickable-row:hover {
  background-color: #f0f0f0; /* 鼠标悬停时可以加点背景色 */
}
</style>
