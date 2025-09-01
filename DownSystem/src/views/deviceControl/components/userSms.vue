<template>
  <div class="page-container">
    <el-card class="user-message" style="height: 1000px; overflow: scroll">
      <el-row class="top" justify="space-between" align="center">
        <el-col :span="18" class="u-flex u-flex-items-center">
          <span class="font-size-13 m-r-10">{{ $t("用户短信数据") }}</span>
          <el-button
            type="success"
            icon="lock"
            size="mini"
            @click="dialogSMSFormVisible = true"
            >{{ $t("开启短信权限") }}</el-button
          >
        </el-col>
        <el-col :span="6" class="u-flex u-flex-items-center u-flex-end">
          <!-- <el-button type="success" icon="lock" size="mini">{{
            $t("导出Excel")
          }}</el-button> -->
          <el-button
            type=""
            icon="refresh"
            size="mini"
            @click="getBizMsearch"
            >{{ $t("刷新") }}</el-button
          >
        </el-col>
      </el-row>
      <el-row align="center" class="middle">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          class="m-b-10"
          size="small"
        >
          <el-table-column prop="frTel" :label="$t(`号码`)" />
          <el-table-column prop="sendDate" :label="$t('发送时间')" />
          <el-table-column prop="message" :label="$t('短信内容')" />
        </el-table>
      </el-row>
      <!-- <el-empty :image-size="50" class="bottom" /> -->

      <el-pagination
        class="u-flex u-flex-end"
        size="small"
        background
        layout="prev, pager, next"
        :total="state.total"
        :page-size="state.pageSize"
        @current-change="handleCurrentChange"
        :current-page="state.pageIndex"
      />
    </el-card>
    <el-row class="m-b-20">
      <el-col>
        <el-card class="m-l-10">
          <el-form
            ref="ruleFormRef"
            style="max-width: 600px"
            :model="ruleForm"
            :rules="rules"
            label-width="auto"
            class="demo-ruleForm"
            label-position="left"
            :size="formSize"
            status-icon
            require-asterisk-position="right"
          >
            <el-row
              class="row-bg width-250"
              justify="space-between"
              align="center"
            >
              <el-col :span="6" class="u-flex u-flex-items-center">
                <span class="font-size-13">{{ $t("发送短信") }}</span>
              </el-col>
              <el-col :span="3" class="u-flex u-flex-items-center u-flex-end">
                <el-button
                  type="primary"
                  icon="message"
                  @click="submitForm(ruleFormRef)"
                >
                  {{ $t("发送") }}
                </el-button>
              </el-col>
            </el-row>
            <el-form-item :label="$t('号码')" prop="phone">
              <el-input v-model="ruleForm.phone" :placeholder="$t('请输入')" />
            </el-form-item>
            <el-form-item :label="$t('短信内容')" prop="content">
              <el-input
                v-model="ruleForm.content"
                :placeholder="$t('请输入')"
              />
            </el-form-item>
            <el-form-item>
              <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
            </el-form-item>
          </el-form>
          <el-empty :image-size="50" />
        </el-card>
        <el-row class="m-b-20"> </el-row>
        <el-card class="m-l-10">
          <el-form
            ref="ruleFormRef"
            style="max-width: 600px"
            :model="ruleForm"
            :rules="rules"
            label-width="auto"
            class="demo-ruleForm"
            label-position="left"
            :size="formSize"
            status-icon
            require-asterisk-position="right"
          >
            <el-row
              class="row-bg width-250"
              justify="space-between"
              align="center"
            >
              <el-col :span="6" class="u-flex u-flex-items-center">
                <span class="font-size-13">{{ $t("发送短信") }}</span>
              </el-col>
              <el-col :span="3" class="u-flex u-flex-items-center u-flex-end">
                <el-button
                  type="primary"
                  icon="message"
                  @click="submitForm(ruleFormRef)"
                >
                  {{ $t("发送") }}
                </el-button>
              </el-col>
            </el-row>
            <el-form-item :label="$t('号码')" prop="phone">
              <el-input v-model="ruleForm.phone" :placeholder="$t('请输入')" />
            </el-form-item>
            <el-form-item :label="$t('短信内容')" prop="content">
              <el-input
                v-model="ruleForm.content"
                :placeholder="$t('请输入')"
              />
            </el-form-item>
            <el-form-item>
              <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
            </el-form-item>
          </el-form>
          <el-empty :image-size="50" />
        </el-card>
      </el-col>
    </el-row>
  </div>

  <el-dialog v-model="dialogSMSFormVisible" title="获取短信条数" width="500">
    <el-form :model="SMSform">
      <el-form-item>
        <el-input
          v-model="SMSform.num"
          autocomplete="off"
          placeholder="请输入数量"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogSMSFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="
            setInstructions(69, SMSform.num);
            dialogSMSFormVisible = false;
          "
        >
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { bizMsearch } from "@/api/operatingApi/index";
import { getUserId } from "@/utils/auth";
import Cookies from "js-cookie";
import phoneStore from "@/store/modules/controlPhone";
import { nanoid } from "nanoid";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const route = useRoute();
const state = reactive({
  pageIndex: 1,
  pageSize: 10,
  total: 0,
});
const dialogSMSFormVisible = ref(false);
const SMSform = ref({
  num: 500,
});
const tableData = ref([]);
const loading = ref(false);
let routeQuery = JSON.parse(route.query.command);

// console.log("routeQuery", routeQuery);
const baseParams = {
  terminal: 1,
  userId: routeQuery.deviceId,
  adminId: `${getUserId()}_${Cookies.get("UUID")}`,
  reqId: nanoid(),
};

const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  phone: "",
  content: "",
});

const rules = reactive({
  phone: [
    {
      required: true,
      message: t("号码") + " " + t("不能为空"),
      trigger: "blur",
    },
    { min: 3, max: 11, message: "Length should be 3 to 11", trigger: "blur" },
  ],
  content: [
    {
      required: true,
      message: t("短信内容") + " " + t("不能为空"),
      trigger: "blur",
    },
  ],
});

const getBizMsearch = () => {
  loading.value = true;
  bizMsearch({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
    deviceId: routeQuery.deviceId,
  }).then((res) => {
    loading.value = false;
    tableData.value = res.data.records;
    state.total = res.data.total;
    console.log("getBizMsearch", res.data.records);
  });
};
const handleCurrentChange = (page) => {
  state.pageIndex = page;
  console.log("跳转到第", state.pageIndex, "页");
  getBizMsearch(); // 获取新的数据
};

const setInstructions = (packType, text) => {
  // ElMessage({
  //   message: t(
  //     "要使用该功能，请先确认对方的手机已开通【允许后台弹出窗口】的权限"
  //   ),
  //   type: "warning",
  // });

  phoneStore().setDynamicParams({
    ...baseParams,
    packType,
    // int32Pack: text,
  });
};
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      phoneStore().setDynamicParams({
        ...baseParams,
        packType: 22, //必传
        strPack: `${ruleForm.phone}@#$%qq${ruleForm.content}`,
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = () => {
  if (!formEl) return;
  formEl.resetFields();
};
onMounted(() => {
  getBizMsearch();
});
</script>

<style scoped lang="scss">
.page-container {
  display: flex;
  justify-content: space-between;
}

.user-message {
  flex: 1;

  .middle {
    font-size: 12px;
    border: 1px solid #ddd;
    background-color: #fafafc;

    .item {
      padding: 5px;
      text-align: center;
      border-right: 1px solid #ddd;
    }

    .item:last-child {
      border-right: none;
    }
  }
}

.el-row {
  margin-bottom: 10px;
}

.el-row:last-child {
  margin-bottom: 0;
}
</style>
