<template>
  <div class="app-container">
    <div class="message-container">
      <el-card class="message-card">
        <template #header>
          <div class="card-header">
            <span>{{ $t('验证码消息发送') }}</span>
          </div>
        </template>

        <el-form ref="messageFormRef" :model="messageForm" :rules="rules" label-width="120px" class="message-form">
          <!-- 电报群组选择 -->
          <el-form-item :label="$t('选择群组')" prop="chatIdList">
            <el-select v-model="messageForm.chatIdList" multiple :placeholder="$t('请选择群组')" style="width: 100%"
              :loading="telegramGroupLoading" collapse-tags collapse-tags-tooltip :max-collapse-tags="3">
              <el-option v-for="group in telegramGroupList" :key="group.id" :value="group.chatId">
                <span style="float: left">{{ group.title }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">
                  {{ group.chatId }}
                </span>
              </el-option>
            </el-select>
          </el-form-item>

          <!-- 消息内容 -->
          <el-form-item :label="$t('消息内容')" prop="text">
            <el-input v-model="messageForm.text" type="textarea" :rows="6" :placeholder="$t('请输入要发送的消息内容')"
              maxlength="1000" show-word-limit />
          </el-form-item>

          <!-- 发送按钮 -->
          <el-form-item>
            <el-button type="primary" @click="sendMessage" :loading="sending" size="large">
              <el-icon class="el-icon--left">
                <ChatDotRound />
              </el-icon>
              {{ $t('发送消息') }}
            </el-button>
            <el-button @click="resetForm" size="large">
                   <el-icon class="el-icon--right">
                  <Refresh />
                </el-icon>
              {{ $t('重置') }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";
import { ChatDotRound } from "@element-plus/icons-vue";
import {getTelegramGroupListPage, setGroupMessagePage } from "@/api/message/codeMessage";

const { t } = useI18n();

// 响应式数据
const messageFormRef = ref();
const telegramGroupLoading = ref(false);
const sending = ref(false);
const telegramGroupList = ref([]);

// 表单数据
const messageForm = reactive({
  chatIdList: [],
  text: ""
});

// 表单验证规则
const rules = computed(() => ({
  chatIdList: [
    { required: true, message: t("请选择至少一个群组"), trigger: "blur" }
  ],
  text: [
    { required: true, message: t("请输入消息内容"), trigger: "blur" },
    { min: 1, max: 1000, message: t("消息内容长度在1到1000个字符之间"), trigger: "blur" }
  ]
}));

// 获取电报群组列表
const getTelegramGroupList = () => {
  telegramGroupLoading.value = true;
  getTelegramGroupListPage("CAPTCHA")
    .then((res) => {
      if (res.data) {
        telegramGroupList.value = Array.isArray(res.data) ? res.data : [res.data];
        console.log("获取电报群组列表成功", telegramGroupList.value);
      }
    })
    .catch((error) => {
      console.error("获取电报群组列表失败", error);
      ElMessage.error(t("获取电报群组列表失败"));
    })
    .finally(() => {
       telegramGroupLoading.value = false;
     });
};

// 发送消息
const sendMessage = () => {
  messageFormRef.value.validate((valid) => {
    if (valid) {
      sending.value = true;

      const params = {
        chatIdList: messageForm.chatIdList,
        text: messageForm.text
      };

      console.log("发送消息参数:", params);

      setGroupMessagePage(params)
        .then((res) => {
          ElMessage.success(t("消息发送成功"));
          console.log("消息发送成功", res);
          // 发送成功后重置表单
          resetForm();
        })
        .catch((error) => {
          console.error("消息发送失败", error);
          ElMessage.error(t("消息发送失败"));
        })
        .finally(() => {
          sending.value = false;
        });
    } else {
      ElMessage.warning(t("请检查表单填写是否正确"));
    }
  });
};

// 重置表单
const resetForm = () => {
  messageForm.chatIdList = [];
  messageForm.text = "";
  nextTick(() => {
    messageFormRef.value?.clearValidate();
  });
};

// 页面加载时获取电报群组列表
onMounted(() => {
  getTelegramGroupList();
});
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  min-height: calc(100vh - 120px);
}

.message-container {
  max-width: 800px;
  margin: 0 auto;
}

.message-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    color: #303133;
  }
}

.message-form {
  padding: 20px 0;

  :deep(.el-form-item__label) {
    font-weight: 500;
    color: #606266;
  }

  :deep(.el-textarea__inner) {
    resize: vertical;
    min-height: 120px;
  }

  :deep(.el-button--large) {
    padding: 12px 24px;
    font-size: 16px;
  }
}

:deep(.el-select .el-tag) {
  margin: 2px;
}

:deep(.el-form-item) {
  margin-bottom: 24px;
}

:deep(.el-form-item:last-child) {
  margin-bottom: 0;
  text-align: center;
  padding-top: 20px;
}
</style>
