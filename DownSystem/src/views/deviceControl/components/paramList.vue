<template>
  <el-card class="menu-card" :body-style="{ padding: '0px' }">
    <div class="menu-list">
      <el-row
        v-for="item in menuItems"
        :key="item.id"
        class="menu-item"
        :class="{ 'has-children': item.hasChildren }"
        @click="handleItemClick(item)"
      >
        <el-col :span="4" class="icon-col">
          <el-icon class="item-icon">
            <component :is="item.icon" />
          </el-icon>
        </el-col>

        <el-col :span="14" class="label-col">
          <span class="item-label">{{ item.label }}</span>
        </el-col>

        <el-col :span="6" class="controls-col">
          <!-- <el-checkbox
            v-if="item.checkable"
            v-model="item.checked"
            @click.stop="handleCheckboxClick(item)"
          /> -->
          <el-image
            v-if="item.checkable"
            style="width: 12px; height: 12px"
            :src="
              item.checked == true ? '/images/check2.png' : '/images/check3.png'
            "
            fit="fill"
          />

          <el-popover
            v-if="item.hasChildren"
            v-model:visible="popoverVisible[item.id]"
            placement="right"
            :width="300"
            trigger="click"
            @show="handlePopoverShow(item)"
          >
            <template #reference>
              <div class="arrow-wrapper" @click.stop>
                <el-icon class="arrow-icon">
                  <ArrowRight />
                </el-icon>
              </div>
            </template>
            <!-- 亮度调节 -->
            <template v-if="item.id === 'brightness'">
              <div class="brightness-popover">
                <div class="brightness-header">{{ $t("亮度") }}</div>
                <div class="brightness-content">
                  <el-slider
                    v-model="brightnessValue"
                    :min="0"
                    :max="100"
                    :show-tooltip="false"
                    @change="handleBrightnessChange"
                  />
                  <el-button class="float-button" @click="handleFloatWindow">
                    <template #icon>
                      <el-icon><Close /></el-icon>
                    </template>
                    <span>{{ $t("关闭亮度浮窗") }}</span>
                  </el-button>
                </div>
              </div>
            </template>
            <!-- 粘贴文本  -->
            <template v-else-if="item.id === 'paste-text'">
              <div class="paste-text-popover">
                <el-input
                  v-model="pasteText"
                  type="textarea"
                  :rows="4"
                  :placeholder="$t('请输入要粘贴的文本')"
                  resize="none"
                />
                <el-button
                  type="primary"
                  class="paste-btn m-t-10"
                  @click="handlePasteText(item)"
                >
                  {{ $t("粘贴") }}
                </el-button>
              </div>
            </template>
            <!--解锁手机屏幕  -->
            <template v-else-if="item.id === 'phone-unlock'">
              <div>
                <el-input
                  v-model="state.phonePassword"
                  :placeholder="$t('请输入屏幕密码')"
                  show-password
                ></el-input>
                <el-button
                  class="m-t-10"
                  type="primary"
                  @click="handleUnlock(item)"
                  >{{ $t("确定") }}</el-button
                >
              </div>
            </template>

            <template v-else>
              <div class="popover-content">
                <div class="range-input">
                  <el-input-number
                    v-model="rangeStart"
                    :min="1"
                    :max="rangeEnd"
                    controls-position="right"
                  />
                  <span class="separator">-</span>
                  <el-input-number
                    v-model="rangeEnd"
                    :min="rangeStart"
                    :max="2000"
                    controls-position="right"
                  />
                </div>
                <div class="popover-footer">
                  <el-button type="warning" @click="handleReset">{{
                    $t("重置")
                  }}</el-button>
                  <el-button type="primary" @click="handleConfirm(item)">{{
                    $t("确认")
                  }}</el-button>
                </div>
              </div>
            </template>
          </el-popover>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script setup>
import { ref, reactive } from "vue";
import {
  VideoCameraFilled,
  Monitor,
  PictureFilled,
  Unlock,
  Lock,
  Document,
  Plus,
  Mute,
  CircleCloseFilled,
  DocumentCopy,
  Sunny,
  Setting,
  Bell,
  VideoPlay,
  ArrowRight,
  Close,
  WarningFilled,
  Sort,
} from "@element-plus/icons-vue";

import { getUserId } from "@/utils/auth";
import Cookies from "js-cookie";
import phoneStore from "@/store/modules/controlPhone";
import { nanoid } from "nanoid";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const route = useRoute();

const state = reactive({
  phonePassword: "",
});

// 菜单数据
const menuItems = ref([
  {
    id: "close-background",
    label: t("关闭背景色"),
    icon: VideoCameraFilled,
    checkable: true,
    checked: false,
  },
  {
    id: "transmission-mode-http",
    label: t("传输模式:http"),
    icon: Sort,
    checkable: true,
    checked: false,
  },
  {
    id: "screen-record",
    label: t("屏幕录制"),
    icon: VideoCameraFilled,
    checkable: true,
    checked: false,
  },
  {
    id: "black-screen-assistant",
    label: t("黑屏助手"),
    icon: Monitor,
    checkable: true,
    checked: false,
  },
  {
    id: "black-screen-overlay",
    label: t("黑屏贴图"),
    icon: PictureFilled,
    checkable: true,
    checked: false,
  },
  {
    id: "screen-unlock",
    label: t("点亮屏幕") + ":" + t("解锁"),
    icon: Unlock,
    hasChildren: false,
  },
  {
    id: "phone-unlock",
    label: t("解锁手机屏幕"),
    icon: Lock,
    hasChildren: true,
  },
  {
    id: "screen-overlay",
    label: t("屏幕覆盖"),
    icon: Document,
    checkable: true,
    checked: false,
  },
  {
    id: "new-screen-overlay",
    label: t("新屏幕覆盖"),
    icon: Plus,
    checkable: true,
    hasChildren: false,
  },
  {
    id: "device-mute",
    label: t("设备静音"),
    icon: Mute,
    checkable: true,
    checked: false,
  },
  {
    id: "non-uninstallable",
    label: t("不可卸载"),
    icon: CircleCloseFilled,
    checkable: true,
    checked: false,
  },
  {
    id: "paste-text",
    label: t("粘贴文本"),
    icon: DocumentCopy,
    hasChildren: true,
  },
  {
    id: "brightness",
    label: t("亮度调节"),
    icon: Sunny,
    hasChildren: true,
    type: "brightness",
  },
  {
    id: "resolution",
    label: t("修改分辨率"),
    icon: Setting,
    hasChildren: true,
  },
  {
    id: "notification",
    label: t("发送通知"),
    icon: Bell,
    hasChildren: true,
  },
  {
    id: "screen-playback",
    label: t("录屏回放"),
    icon: VideoPlay,
    checkable: true,
    checked: false,
  },
  {
    id: "upload-error-message",
    label: t("上传错误信息"),
    icon: WarningFilled,
    hasChildren: false,
  },
]);

const popoverVisible = reactive({});
const rangeStart = ref(720);
const rangeEnd = ref(1600);
let routeQuery = JSON.parse(route.query.command);
// 分辨率默认值
const defaultRange = {
  start: 720,
  end: 1600,
};
const pasteText = ref("");

const baseParams = {
  terminal: 1,
  userId: routeQuery.deviceId,
  adminId: `${getUserId()}_${Cookies.get("UUID")}`,
  reqId: nanoid(),
};
// 粘贴文本
const handlePasteText = (item) => {
  phoneStore().setDynamicParams({
    ...baseParams,
    // terminal: 1, //终端类型1为管理终端  必传
    packType: 4, //必传
    // userId: route.query.deviceId, //发给哪个终端
    // // userId_uid: getUserId(),
    // adminId: `${getUserId()}_${Cookies.get("UUID")}`,
    // reqId: nanoid(), //必传
    strPack: pasteText.value,
  });
  // console.log("粘贴文本:", pasteText.value);
  pasteText.value = "";
  popoverVisible[item.id] = false;
};
//亮度调节
const brightnessValue = ref(50);
// const autoFloatWindow = ref(false);

// 添加亮度变化处理函数
const handleBrightnessChange = (value) => {
  console.log("亮度值改变:", value);
};
// 关闭浮窗
const handleFloatWindow = () => {
  console.log("关闭亮度浮窗");
};
// 处理整行点击事件
const handleItemClick = (item) => {
  if (item.hasChildren) {
    Object.keys(popoverVisible).forEach((key) => {
      if (key !== item.id) {
        popoverVisible[key] = false;
      }
    });
    popoverVisible[item.id] = !popoverVisible[item.id];
  } else if (item.checkable) {
    item.checked = !item.checked;
    // console.log(`${item.label} checked: ${item.checked}`);
  }
  // if (item.checked) {
  console.log("我是点击事件", item.checked);

  handleSwitch(item);
  // }

  if (item.action) {
    item.action();
  }
};

// 处理复选框点击事件
const handleCheckboxClick = (item) => {
  // if (!item.checked) {

  console.log(`Checkbox clicked: ${item.label} - ${!item.checked}`);

  handleSwitch(item);
  // }
};

//复选框相关
const handleSwitch = (item) => {
  switch (item.id) {
    // case "screen-record": // 屏幕录制
    //   phoneStore().setDynamicParams({
    //     ...baseParams,
    //     packType: 3,
    //     int32Pack: item.checked ? 1 : 0,
    //   });
    //   break;
    case "upload-error-message": //上传错误信息
      phoneStore().setDynamicParams({
        ...baseParams,
        packType: 70,
        isErrorMessage: true,
      });
      break;
    case "transmission-mode-http": //切换传输模式
      phoneStore().setDynamicParams({
        ...baseParams,
        packType: item.checked ? 71 : 72,
      });
      // phoneStore().setCheckStaus({ isModeHttp: item.checked });
      break;

    case "close-background": // 关闭背景色
      phoneStore().setDynamicParams({
        ...baseParams,
        packType: 70,
        isClose: item.checked,
      });
      break;

    case "black-screen-assistant": // 黑屏助手
      phoneStore().setDynamicParams({
        ...baseParams,
        packType: item.checked ? 5 : 5,
      });
      phoneStore().setCheckStaus({ isSwitch: item.checked });
      console.log("我的值受到改变", item.checked);

      break;

    // case "black-screen-overlay": // 黑屏贴图
    //   phoneStore().setDynamicParams({
    //     ...baseParams,
    //     packType: 6,
    //   });
    //   break;

    case "screen-unlock": // 点亮屏幕:解锁
      phoneStore().setDynamicParams({
        ...baseParams,
        packType: 19,
      });
      break;

    case "screen-overlay": // 屏幕覆盖
      console.log(`${item.label} checked: ${item.checked ? 12 : 65}`);
      phoneStore().setDynamicParams({
        ...baseParams,
        packType: item.checked ? 12 : 55,
      });
      break;

    case "new-screen-overlay": // 新屏幕覆盖
      // phoneStore().setDynamicParams({
      //   ...baseParams,
      //   packType: 13,
      // });
      break;

    case "device-mute": // 设备静音
      phoneStore().setDynamicParams({
        ...baseParams,
        packType: 63,
      });
      break;

    case "non-uninstallable": // 不可卸载
      // phoneStore().setDynamicParams({
      //   ...baseParams,
      //   packType: 64,
      //   int32Pack: item.checked ? 1 : 0,
      // });
      break;

    case "screen-playback": // 录屏回放
      phoneStore().setDynamicParams({
        ...baseParams,
        packType: 3,
        int32Pack: 3,
      });
      break;
  }
};

// Popover 相关处理函数
const handlePopoverShow = (item) => {
  // 关闭其他所有的 popover
  Object.keys(popoverVisible).forEach((key) => {
    if (key !== item.id) {
      popoverVisible[key] = false;
    }
  });
};

// 重置和确认处理函数
const handleReset = () => {
  rangeStart.value = defaultRange.start;
  rangeEnd.value = defaultRange.end;
};

const handleConfirm = (item) => {
  console.log(
    `${item.label} 设置范围: ${rangeStart.value} - ${rangeEnd.value}`
  );
  popoverVisible[item.id] = false;
};

// 解锁手机密码
const handleUnlock = (item) => {
  phoneStore().setDynamicParams({
    ...baseParams,
    // terminal: 1, //终端类型1为管理终端  必传
    packType: 9, //必传
    // userId: route.query.deviceId, //发给哪个终端
    // userId_uid: getUserId(),
    // adminId: `${getUserId()}_${Cookies.get("UUID")}`,
    // reqId: nanoid(), //必传
    strPack: state.phonePassword,
  });
  console.log("输入的文本是:", state.phonePassword);

  popoverVisible[item.id] = false;
};
</script>

<style scoped lang="scss">
.menu-card {
  .el-card__body {
    padding: 0px !important;
  }
}

.menu-list {
  .menu-item {
    height: 40px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #f5f7fa;
    }

    .icon-col {
      display: flex;
      align-items: center;

      .item-icon {
        font-size: 12px;
        color: #409eff;
      }
    }

    .label-col {
      .item-label {
        font-size: 10px;
        color: #303133;
      }
    }

    .controls-col {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;

      .arrow-icon {
        font-size: 12px;
        color: #909399;
      }
    }
  }
}

.popover-content {
  padding: 12px;

  .range-input {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;

    .separator {
      color: #606266;
      font-size: 14px;
    }
  }

  .popover-footer {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
  }
}

:deep(.el-input-number) {
  width: 110px;
}

:deep(.el-popover.el-popper) {
  padding: 12px;
  min-width: auto;
}
.arrow-wrapper {
  cursor: pointer;
  padding: 4px;
}
.brightness-popover {
  padding: 12px;

  .brightness-header {
    font-size: 14px;
    color: #333;
    margin-bottom: 16px;
  }

  .brightness-content {
    .auto-float {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
      font-size: 14px;
      color: #333;
    }
  }
}

:deep(.el-slider) {
  margin: 10px 0;
}

.paste-text-popover {
  .el-input {
    margin-bottom: 12px;
  }

  .paste-btn {
    width: 100%;
  }
}
</style>
