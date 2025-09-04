<template>
  <div class="app-container">
    <div class="message-container">
      <el-card class="message-card">
        <template #header>
          <div class="card-header">
            <span>{{ $t('下载群消息发送') }}</span>
          </div>
        </template>

        <el-form ref="messageFormRef" :model="messageForm" :rules="rules" label-width="120px" class="message-form">
          <!-- 盘口选择 -->
          <el-form-item :label="$t('选择盘口')" prop="handicapIdList">
            <el-select v-model="messageForm.handicapIdList" multiple :placeholder="$t('请选择盘口')" style="width: 100%"
              :loading="handicapLoading" collapse-tags collapse-tags-tooltip :max-collapse-tags="3">
              <el-option v-for="handicap in handicapList" :key="handicap.id" :value="handicap.id" :label="handicap.name">
                <span style="float: left">{{ handicap.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">
                  {{ handicap.telegramGroupId || '无群组ID' }}
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
import { getHandListPage } from "@/api/handicapManagement/handList";
import { setGroupMessagePage } from "@/api/message/downloadMessage";

const { t } = useI18n();

// 响应式数据
const messageFormRef = ref();
const handicapLoading = ref(false);
const sending = ref(false);
const handicapList = ref([]);

// 表单数据
const messageForm = reactive({
  handicapIdList: [],
  text: ""
});

// 表单验证规则
const rules = computed(() => ({
  handicapIdList: [
    { required: true, message: t("请选择至少一个盘口"), trigger: "blur" }
  ],
  text: [
    { required: true, message: t("请输入消息内容"), trigger: "blur" },
    { min: 1, max: 1000, message: t("消息内容长度在1到1000个字符之间"), trigger: "blur" }
  ]
}));

// 获取盘口列表
const getHandicapList = () => {
  handicapLoading.value = true;
  getHandListPage({
    currentPage: 1,
    pageSize: 100
  })
    .then((res) => {
      if (res.data && res.data.records) {
        handicapList.value = res.data.records;
        console.log("获取盘口列表成功", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取盘口列表失败", error);
      ElMessage.error(t("获取盘口列表失败"));
    })
    .finally(() => {
      handicapLoading.value = false;
    });
};

// 发送消息
const sendMessage = () => {
  messageFormRef.value.validate((valid) => {
    if (valid) {
      sending.value = true;

      const params = {
        handicapIdList: messageForm.handicapIdList,
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
  messageForm.handicapIdList = [];
  messageForm.text = "";
  nextTick(() => {
    messageFormRef.value?.clearValidate();
  });
};

// 页面加载时获取盘口列表
onMounted(() => {
  getHandicapList();
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
