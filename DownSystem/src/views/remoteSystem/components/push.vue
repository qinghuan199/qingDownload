<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-items-center u-flex-between m-b-20">
          <div></div>
          <div>
            <el-button type="success" @click="setPush(ruleForm.id)" size="small">
              <el-icon>
                <Document />
              </el-icon>
              {{ $t('保存') }}
            </el-button>

            <el-divider direction="vertical" />
            <el-button @click="refresh" size="small">
              <el-icon class="el-icon--right">
                <Refresh />
              </el-icon>
              {{$t('刷新')}}
            </el-button>
          </div>
        </div>
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
          class="demo-ruleForm" label-position="left" :size="formSize" status-icon require-asterisk-position="right"
          :hide-required-asterisk="true">
          <el-form-item :label="$t('标题')" prop="title">
            <el-input v-model="ruleForm.title" :placeholder="$t('请输入')" />
          </el-form-item>

          <el-form-item :label="$t('内容')" prop="content">
            <el-input v-model="ruleForm.content" :placeholder="$t('请输入')" />
          </el-form-item>
          <el-form-item :label="$t('密钥')" prop="name">
            <FileUpload :limit="1" :callback="handleFileUploaded" :modelValue="ruleForm.keyUrl"></FileUpload>

          </el-form-item>

          <!-- <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              Create
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item> -->
        </el-form>
      </el-card>
    </el-col>
  </el-row>

  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="$t('修改')" direction="rtl"> </el-drawer>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { genFileId, ElMessage } from "element-plus";
import { getPushPage, setPushPage } from "@/api/system/push";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter();
const state = reactive({
  dialogVisible: false, // 控制弹窗显示
  fileList: [], // 存储上传的文件列表
  fullscreen: false, // 控制弹窗是否全屏
  groupTitle: "",
  followUp: false, //新增弹窗
  switchValue: "", //开关
});
interface RuleForm {
  id: string;
  title: string;
  keyUrl: string;
  content: string;
}
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  id: "",
  title: "",
  keyUrl: "",
  content: "",
});
const rules = reactive<FormRules<RuleForm>>({
  title: [{ required: true, message:t('标题') + t('不能为空'), trigger: "blur" }],
  keyUrl: [{ required: true, message: t('密钥') + t('不能为空'), trigger: "blur" }],
  content: [{ required: true, message:t('内容') + t('不能为空'), trigger: "blur" }],
});
const upload = ref();
const handleExceed = (files) => {
  upload.value!.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const submitUpload = () => {
  upload.value!.submit();
};
//获取推送数据
const getPush = () => {
  getPushPage({})
    .then((res) => {
      const data = res.data;
      ruleForm.id = data.id;
      ruleForm.keyUrl = data.keyUrl;
      ruleForm.content = data.content;
      ruleForm.title = data.title;
      console.log("获取声网列表数据", res.data);
    })
    .catch((error) => {
      console.error("获取声网列表数据失败", error);
    });
};

// 保存推送数据
const setPush = (id) => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setPushPage({
    id: id,
    keyUrl: ruleForm.keyUrl,
    content: ruleForm.content,
    title: ruleForm.title,
  })
    .then((res) => {
      ElMessage({
        message: t('保存成功'),
        type: 'success',
      })
      console.log("保存成功", res.data);
    })
    .catch((error) => {
      console.error("保存失败", error);
    });
};
//文件上传成功回调方法
function handleFileUploaded(info) {
  ruleForm.keyUrl = info.url;
  console.log("图片", ruleForm.keyUrl);
}

// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称  
  const fieldsToCheck = [
    { name: t('标题'), value: ruleForm.title },
    { name: t('内容'), value: ruleForm.content },
    { name: t('密钥'), value: ruleForm.keyUrl },
  ];
  // 检查字段是否为空  
  for (const field of fieldsToCheck) {
    if (field.value === undefined || field.value === null || field.value === '') {
      ElMessage(`${field.name} `+t('不能为空'));
      return false; // 返回 false 表示检查失败
    }
  }
  return true; // 所有字段都已填写
}

//刷新当前数据
const refresh = () => {
  ElMessage({
    message: t('刷新成功'),
    type: 'success',
  })
  getPush(); // 重新获取数据
};
//挂载
onMounted(() => {
  getPush();
});
</script>
<style lang="scss"></style>
