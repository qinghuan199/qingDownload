<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-items-center u-flex-between m-b-20">
          <div></div>
          <div>
            <el-button type="success" @click="setOssList" size="small">
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
            <!-- <el-button type="danger" @click="delOssList(ruleForm.id)" size="small">
              <el-icon>
                <Delete />
              </el-icon>
              {{$t('删除')}}
            </el-button> -->
          </div>
        </div>
        <div>
          <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="120"
            class="demo-ruleForm" label-position="left" :size="formSize" status-icon require-asterisk-position="right"
            :hide-required-asterisk="true">
            <el-form-item label="url" prop="url">
              <el-input v-model="ruleForm.url" :placeholder="$t('请输入')" />
            </el-form-item>

            <el-form-item label="bucket" prop="bucket">
              <el-input v-model="ruleForm.bucket" :placeholder="$t('请输入')" />
            </el-form-item>
            <el-form-item label="endpoint" prop="endpoint">
              <el-input v-model="ruleForm.endpoint" :placeholder="$t('请输入')" />
            </el-form-item>
            <el-form-item label="access_key" prop="accessKey">
              <el-input v-model="ruleForm.accessKey" :placeholder="$t('请输入')" />
            </el-form-item>
            <el-form-item label="access_secret" prop="accessSecret">
              <el-input v-model="ruleForm.accessSecret" :placeholder="$t('请输入')" />
            </el-form-item>
            <!-- <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              Create
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item> -->
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="$t('修改')" direction="rtl">
  </el-drawer>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { getOssPage, setOssPage, delOssPage } from "@/api/system/oss";
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
const tableList = ref([])
//获取OSS列表
const getOssList = () => {
  getOssPage({}).then((res) => {
    if (!res.data || res.data.length === 0) {
      ruleForm.id = ""
      ruleForm.url = ""
      ruleForm.endpoint = ""
      ruleForm.bucket = ""
      ruleForm.accessKey = ""
      ruleForm.accessSecret = ""
      return; // 结束函数执行
    }
    tableList.value = res.data[0];
    const data = tableList.value;
    ruleForm.id = data.id;
    ruleForm.url = data.url;
    ruleForm.endpoint = data.endpoint;
    ruleForm.bucket = data.bucket;
    ruleForm.accessKey = data.accessKey;
    ruleForm.accessSecret = data.accessSecret;
    console.log("OSS列表数据", res.data);
  });
}
// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称  
  const fieldsToCheck = [
    { name: t('url'), value: ruleForm.url },
    { name: t('bucket'), value: ruleForm.bucket },
    { name: t('endpoint'), value: ruleForm.endpoint },
    { name: t('accessKey'), value: ruleForm.accessKey },
    { name: t('accessSecret'), value: ruleForm.accessSecret },
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
// 新增OSS数据
const setOssList = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setOssPage([
    {
      id: ruleForm.id,
      url: ruleForm.url,
      bucket: ruleForm.bucket,
      endpoint: ruleForm.endpoint,
      accessKey: ruleForm.accessKey,
      accessSecret: ruleForm.accessSecret,
    },
  ]).then((res) => {
    getOssList()
    ElMessage({
      message: t('保存成功'),
      type: 'success',
    })
    console.log("保存OSS数据", res.data);
  });
};
// 删除OSS列表id
const delOssList = (id) => {
  if(!id) return  ElMessage({message:t('没有要删除的数据'),})
  delOssPage(id) // 将 id 拼接为对象
    .then((res) => {
      ElMessage({
        message: t('删除成功'),
        type: 'success',
      })
      getOssList(); // 重新获取数据
      console.log('删除成功,ID:', id);
      // 处理成功后的逻辑
    })
    .catch((error) => {
      console.error('删除失败:', error);
      // 处理错误
    });
};


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


interface RuleForm {
  id: string;
  url: string;
  endpoint: string;
  accessKey: string;
  accessSecret: string;
  bucket: string;

}

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  id: "",
  url: "",
  endpoint: "",
  accessKey: "",
  bucket: "",
  accessSecret: ''

});

const rules = reactive<FormRules<RuleForm>>({

  url: [
    { required: true, message: t('url') + t('不能为空'), trigger: "blur" },
  ],
  endpoint: [
    { required: true, message: t('endpoint') + t('不能为空'), trigger: "blur" },
  ],
  accessKey: [
    { required: true, message: t('accessKey') + t('不能为空'), trigger: "blur" },
  ],
  bucket: [
    { required: true, message: t('bucket') + t('不能为空'), trigger: "blur" },
  ],
  accessSecret: [
    { required: true, message: t('accessSecret') + t('不能为空'), trigger: "blur" },
  ],

});

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
//刷新
const refresh = () => {
  ElMessage({
    message: t('刷新成功'),
    type: 'success',
  })
  getOssList(); // 重新获取数据
};
onMounted(() => {
  getOssList();
});
</script>
<style lang="scss"></style>
