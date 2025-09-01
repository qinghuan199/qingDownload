<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-items-center u-flex-between m-b-20">
          <div>
            <el-switch v-model="state.switchValue" size="middle" @change="handleSwitchChange" inline-prompt
              :active-text="$t('开启')" :inactive-text="$t('关闭')" />
          </div>
          <div>
            <el-button type="success" @click="saveBlack" size="small">
              <el-icon>
                <Collection />
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
        <div class="u-flex u-flex-items-center">
          <div class="m-r-10">{{$t('封号时间')}}({{$t('天')}})</div>
          <el-space>
            <el-input-number v-model="state.num"  controls-position="right">
                <template #decrease-icon>
                <el-icon>
                  <Minus />
                </el-icon>
              </template>
              <template #increase-icon>
                <el-icon>
                  <Plus />
                </el-icon>
              </template>
             
            </el-input-number>
          </el-space>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="$t('修改')" direction="rtl">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" label-position="top" :size="formSize" status-icon require-asterisk-position="right">
      <el-form-item :label="$t('名称')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item :label="$t('头像')" prop="name">
        <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('密码')" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item :label="$t('状态')" prop="region">
        <el-select v-model="ruleForm.region" :placeholder="$t('选择状态')">
          <el-option :label="$t('显示')" :value="1" />
          <el-option :label="$t('隐藏')" :value="0" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          {{$t('新增')}}
        </el-button>
        <el-button @click="resetForm(ruleFormRef)"> {{$t('重置')}}</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { ElMessage } from 'element-plus'
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { getBlackPage, setBlackPage } from "@/api/system/blacklist";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter();
const state = reactive({
  dialogVisible: false, // 控制弹窗显示
  fileList: [], // 存储上传的文件列表
  fullscreen: false, // 控制弹窗是否全屏
  groupTitle: "",
  followUp: false, //新增弹窗
  num: 10,
  switchValue: false,  //是否封号
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
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

interface RuleForm {
  name: string;
  region: string;
  count: string;
  date1: string;
  date2: string;
  delivery: boolean;
  location: string;
  type: string[];
  resource: string;
  desc: string;
}

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "Hello",
  region: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  location: "",
  type: [],
  resource: "",
  desc: "",
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: t('apk名称')+' '+t('不能为空'), trigger: "blur" },
  ],
  region: [
    {
      required: true,
      message: t('apk地址')+' '+t('不能为空'),
      trigger: "change",
    },
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
//获取封号设置
const getBlack = () => {
  getBlackPage({
  }).then((res) => {
    const data = res.data
    state.switchValue = data;
    console.log("获取封号设置", res.data);
  }).catch((error) => {
    console.error("获取封号设置失败", error);
  });
};

// 保存封号状态
const setBlack = (value) => {
  setBlackPage(
    value
  )
    .then((res) => {

      console.log("保存成功", res);
    })
    .catch((error) => {
      console.error("保存失败", error);
    });
};

// 处理开关状态变化
const handleSwitchChange = (value) => {
  if (value == true) {
    setBlack(1)
    ElMessage({
      message: t('开启')+' '+t('成功'),
      type: 'success',
    })
  } else {
    setBlack(0)
    ElMessage({
      message: t('关闭')+' '+t('成功'),
      type: 'success',
    })
  }
  console.log("开关状态", value);
};
//刷新当前数据
const refresh = () => {
  ElMessage({
    message: t('刷新成功'),
    type: 'success',
  })
  getBlack(); // 重新获取数据
};
//保存当前数据
const saveBlack = () => {
  ElMessage({
    message: t('保存成功'),
    type: 'success',
  })
  getBlack(); // 保存当前数据
};
//挂载
onMounted(() => {
  getBlack();
});

// const options = Array.from({ length: 10000 }).map((_, idx) => ({
//   value: `${idx + 1}`,
//   label: `${idx + 1}`,
// }));
</script>
<style lang="scss">
.box-card-input {
  // width:300px;
  margin-bottom: 10px;

  .card-title {
    width: 100px;
    text-align: right;
    margin-right: 10px;
  }

  .card-input {
    width: 220px;
  }
}

.avatar-uploader .avatar {
  width: 78px;
  height: 78px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  text-align: center;
}
</style>
