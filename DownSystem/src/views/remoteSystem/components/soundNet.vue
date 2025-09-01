<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-items-center u-flex-between m-b-20">
          <div></div>
          <div>
            <el-button type="success" @click="setSoundNet(ruleForm.id)" size="small">
              <el-icon>
                <Document />
              </el-icon> {{ $t('保存') }}
            </el-button>

            <el-divider direction="vertical" />
            <el-button @click="refresh" size="small">
              <el-icon class="el-icon--right">
                <Refresh />
              </el-icon>  {{$t('刷新')}}
            </el-button>
          </div>
        </div>
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="80"
          class="demo-ruleForm" label-position="left" :size="formSize" status-icon require-asterisk-position="right"
          :hide-required-asterisk="true">
          <el-form-item :label="$t('appid')" prop="appId">
            <el-input v-model="ruleForm.appId" :placeholder="$t('请输入')" />
          </el-form-item>

          <el-form-item :label="$t('证书')" prop="certificate">
            <el-input v-model="ruleForm.certificate" :placeholder="$t('请输入')" />
          </el-form-item>
          <el-form-item :label="$t('api_appid')" prop="apiAppid">
            <el-input v-model="ruleForm.apiAppid" :placeholder="$t('请输入')" />
          </el-form-item>
          <el-form-item :label="$t('api_cert')" prop="apiCert">
            <el-input v-model="ruleForm.apiCert" :placeholder="$t('请输入')" />
          </el-form-item>
          <el-form-item :label="$t('渠道')" prop="chanel">
            <el-input v-model="ruleForm.chanel" :placeholder="$t('请输入')" />
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
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { getSoundPage, setSoundPage } from "@/api/system/soundnet";
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus';
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

const imageUrl = ref("");

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
const handleFileChange = (file, fileList) => {
  state.fileList = fileList;
};
const handleRemove = (file, fileList) => {
  state.fileList = fileList;
};
const submitUpload = () => {
  state.dialogVisible = false; // 关闭弹窗
};

const toggleFullScreen = () => {
  state.fullscreen = !state.fullscreen;
};
const minimize = () => {
  state.fullscreen = false;
};
const handleCurrentChange = (val: number) => {
  //   state.changePage(val);
};
const handleSizeChange = (val) => {
  // pageSize.value = val;
  //   state.changePage(val);
  console.log(`每页显示条数: ${val}`);
};

const tableData = [
  {
    appId: "",
    apiAppid: "",
    apiCert: "",
    certificate: "",
    chanel: "",
  },
];

interface RuleForm {
  appId: string;
  apiAppid: string;
  apiCert: string;
  certificate: string;
  chanel: string;
}

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  appId: "",
  apiAppid: "",
  certificate: "",
  apiCert: "",
  chanel: "",
});

const rules = reactive<FormRules<RuleForm>>({
  appId: [
    { required: true, message:t('appId') + t('不能为空'), trigger: "blur" },
  ],
  apiAppid: [
    { required: true, message: t('apiAppid') + t('不能为空'), trigger: "blur" },
  ],
  certificate: [
    { required: true, message: t('证书') + t('不能为空'), trigger: "blur" },
  ],
  apiCert: [
    { required: true, message: t('apiCert') + t('不能为空'), trigger: "blur" },
  ],
  chanel: [
    { required: true, message: t('渠道') + t('不能为空'), trigger: "blur" },
  ],


});

//获取声网数据
const getSoundNet = () => {
  getSoundPage({
  }).then((res) => {
    const data = res.data
    ruleForm.appId = data.appId;
    ruleForm.apiAppid = data.apiAppid;
    ruleForm.certificate = data.certificate;
    ruleForm.apiCert = data.apiCert;
    ruleForm.chanel = data.chanel;
    ruleForm.id = data.id;
    console.log("获取声网列表数据", res.data);
  }).catch((error) => {
    console.error("获取声网列表数据失败", error);
  });
};
// 添加声网数据
const setSoundNet = (id) => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setSoundPage(
    {
      id: id,
      appId: ruleForm.appId,
      apiAppid: ruleForm.apiAppid,
      certificate: ruleForm.certificate,
      apiCert: ruleForm.apiCert,
      chanel: ruleForm.chanel,
    },
  ).then((res) => {
    ElMessage({
      message: t('保存成功'),
      type: 'success',
    })
    console.log("保存成功", res.data);
  }).catch((error) => {
    console.error("保存失败", error);
  });;
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称  
  const fieldsToCheck = [
    { name: t('appid'), value: ruleForm.appId },
    { name: t('证书'), value: ruleForm.certificate },
    { name: t('api_appid'), value: ruleForm.apiAppid },
    { name: t('api_cert'), value: ruleForm.apiCert },
    { name:t('渠道'), value: ruleForm.chanel },
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
  getSoundNet(); // 重新获取数据
};
//挂载
onMounted(() => {
  getSoundNet();
});

// const options = Array.from({ length: 10000 }).map((_, idx) => ({
//   value: `${idx + 1}`,
//   label: `${idx + 1}`,
// }));
</script>
<style lang="scss"></style>
