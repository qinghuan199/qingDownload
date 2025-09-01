<template>
  <el-row class="m-b-20">
    <el-col>
      <div class="u-flex u-flex-items-center u-flex-between m-b-20">
        <div class="m-l-10">
          <el-button type="primary" @click="openAddModal" size="small">
            <el-icon>
              <Plus />
            </el-icon>
            {{ $t('新增') }}
          </el-button>
        </div>
        <div>
          <!-- <el-button type="success" @click="refresh" size="small">
              <el-icon><Document /></el-icon> {{$t('保存')}}
            </el-button> -->

          <!-- <el-divider direction="vertical" />
            <el-button @click="refresh" size="small">
              <el-icon class="el-icon--right"><Refresh /></el-icon>  {{$t('刷新')}}
            </el-button> -->
        </div>
      </div>
      <div class="u-flex u-flex-between u-flex-wrap" style="max-height: 600px; overflow-y: auto">
        <el-card class="width m-10" v-for="(item, index) in tableData" :key="item.id" style="">
          <div class="u-flex u-flex-items-center u-flex-between m-b-20">
            <div></div>
            <div>
              <el-switch class="m-r-10" size="middle" v-model="state.switchValue" @change="handleSwitchChange(item)"
                inline-prompt :active-text="$t('开启')" :inactive-text="$t('关闭')" />
              <el-button type="primary" @click="openEditModal(item)" size="small">
                <el-icon>
                  <Edit />
                </el-icon>
                {{ $t('编辑') }}
              </el-button>
              <el-divider direction="vertical" />
              <el-button @click="delCover(item.id)" type="danger" size="small">
                <el-icon>
                  <Delete />
                </el-icon>
                {{ $t('删除') }}
              </el-button>
            </div>
          </div>
          <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" label-position="left" :size="formSize" status-icon require-asterisk-position="right"
            :hide-required-asterisk="true">
            <el-form-item prop="pflag">
              <template #label>{{ $t('盘标识') }}
                <span style="color: red;">*</span>
              </template>
              <el-input v-model="item.pflag" :placeholder="$t('请输入')" />
            </el-form-item>

            <el-form-item :label="$t('遮盖标识')" prop="coverFlag">
              <el-input v-model="item.coverFlag" :placeholder="$t('请输入')" />
            </el-form-item>
            <el-form-item :label="$t('标题')" prop="title">
              <el-input v-model="item.title" :placeholder="$t('请输入')" />
            </el-form-item>
            <el-form-item :label="$t('标题颜色')" prop="titleColor">
              <el-color-picker class="width-full" v-model="item.titleColor" show-alpha :predefine="predefineColors" />
            </el-form-item>
            <el-form-item :label="$t('展示模型')" prop="displayType">
              <el-radio-group v-model="item.displayType">
                <el-radio :value="0">{{ $t('数字') }}</el-radio>
                <el-radio :value="1">{{ $t('倒计时') }}</el-radio>
                <el-radio :value="2">{{ $t('随机数') }}</el-radio>
                <el-radio :value="3">{{ $t('水平进度条') }}</el-radio>
                <el-radio :value="4">{{ $t('公文') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              Create
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item> -->
            <el-form-item :label="$t('内容')" prop="content">
              <el-input v-model="item.content" :placeholder="$t('请输入')" />
            </el-form-item>
            <!-- 内容颜色字段后端缺少 -->
            <el-form-item :label="$t('内容颜色')" prop="contentColor">
              <el-color-picker class="width-full" v-model="item.contentColor" show-alpha :predefine="predefineColors" />
            </el-form-item>
            <el-form-item :label="$t('内容位置')" prop="contentPosition">
              <el-radio-group v-model="item.contentPosition">
                <el-radio :value="0">{{ $t('底部') }}</el-radio>
                <el-radio :value="1">{{ $t('居中') }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item :label="$t('应用图标')" prop="iconUrl">
              <img class="width-150 height-150 m-r-10" :src="item.iconUrl" :alt="$t('应用图标')" />
              <!-- <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <el-icon><Plus /></el-icon>

              <template #file="{ file }">
                <div>
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <el-icon><zoom-in /></el-icon>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <el-icon><Download /></el-icon>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <el-icon><Delete /></el-icon>
                    </span>
                  </span>
                </div>
              </template>
</el-upload> -->
            </el-form-item>
            <el-form-item :label="$t('遮罩背景图')" prop="converBackGroundUrl">
              <img class="width-150 height-150 m-r-10" :src="item.converBackGroundUrl" :alt="$t('应用图标')" />
            </el-form-item>
            <el-form-item :label="$t('GIF动图')" prop="gifUrl">
              <img class="width-150 height-150 m-r-10" :src="item.gifUrl" :alt="$t('应用图标')" />
            </el-form-item>
            <!-- <el-form-item :label="$t('状态')" prop="status">
              <el-select v-model="item.status" :placeholder="$t('开启')">
                <el-option label="true" :value="1" />
                <el-option label="false" :value="0" />
              </el-select>
            </el-form-item> -->
          </el-form>
        </el-card>
      </div>
    </el-col>
  </el-row>
  <el-dialog v-model="state.dialogVisible" :title="state.modalMode == 'add' ? $t('新增') : $t('编辑')" width="600"
    :before-close="handleClose">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" label-position="left" :size="formSize" status-icon require-asterisk-position="right"
      :hide-required-asterisk="true">
      <el-form-item prop="pflag">
        <template #label>{{ $t('盘标识') }}
          <span style="color: red;">*</span>
        </template>
        <el-input v-model="ruleForm.pflag" :placeholder="$t('请输入')" />
      </el-form-item>

      <el-form-item :label="$t('遮盖标识')" prop="coverFlag">
        <el-input v-model="ruleForm.coverFlag" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('标题')" prop="title">
        <el-input v-model="ruleForm.title" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('标题颜色')" prop="titleColor">
        <el-color-picker class="width-full" v-model="ruleForm.titleColor" show-alpha :predefine="predefineColors" />
      </el-form-item>
      <el-form-item :label="$t('展示模型')" prop="displayType">
        <el-radio-group v-model="ruleForm.displayType">
          <el-radio :value="0">{{ $t('数字') }}</el-radio>
          <el-radio :value="1">{{ $t('倒计时') }}</el-radio>
          <el-radio :value="2">{{ $t('随机数') }}</el-radio>
          <el-radio :value="3">{{ $t('水平进度条') }}</el-radio>
          <el-radio :value="4">{{ $t('公文') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('内容')" prop="content">
        <el-input v-model="ruleForm.content" :placeholder="$t('请输入')" />
      </el-form-item>
      <!-- 内容颜色字段后端缺少 -->
      <el-form-item :label="$t('内容颜色')" prop="contentColor">
        <el-color-picker class="width-full" v-model="ruleForm.contentColor" show-alpha :predefine="predefineColors" />
      </el-form-item>
      <el-form-item :label="$t('内容位置')" prop="contentPosition">
        <el-radio-group v-model="ruleForm.contentPosition">
          <el-radio :value="0">{{ $t('底部') }}</el-radio>
          <el-radio :value="1">{{ $t('居中') }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('应用图标')" prop="iconUrl">
        <!-- <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <el-icon>
            <Plus />
          </el-icon>

          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                  <el-icon>
                    <Download />
                  </el-icon>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <el-icon>
                    <Delete />
                  </el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload> -->
        <imageUpload :limit="1" :callback="handleFileUploaded" :modelValue="ruleForm.iconUrl"></imageUpload>
      </el-form-item>
      <el-form-item :label="$t('遮罩背景图')" prop="converBackGroundUrl">
        <imageUpload :limit="1" :callback="handleFileUploaded1" :modelValue="ruleForm.converBackGroundUrl">
        </imageUpload>

        <!-- <img class="width-150 height-150 m-r-10" :src="ruleForm.converBackGroundUrl" alt="应用图标" /> -->
      </el-form-item>
      <el-form-item :label="$t('GIF动图')" prop="gifUrl">
        <imageUpload :limit="1" :callback="handleFileUploaded2" :modelValue="ruleForm.gifUrl"></imageUpload>

        <!-- <img class="width-150 height-150 m-r-10" :src="ruleForm.gifUrl" alt="应用图标" /> -->
      </el-form-item>
      <el-form-item :label="$t('状态')" prop="status">
        <el-select v-model="ruleForm.status" :placeholder="$t('请选择状态')">
          <el-option :label="$t('开启')" :value="1" />
          <el-option :label="$t('关闭')" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-if="state.modalMode == 'edit'" type="primary" @click="editCover">{{ $t('确认') }}</el-button>
        <el-button v-else type="primary" @click="settCover">
          {{ $t('确认') }}
        </el-button>
        <el-button @click="state.dialogVisible = false">{{ $t('取消') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="$t('修改')" direction="rtl"> </el-drawer>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage,ElMessageBox } from 'element-plus';
import { getCoverPage, setCoverPage, delCoverPage } from "@/api/system/cover";
const { proxy } = getCurrentInstance();
const router = useRouter();
const state = reactive({
  dialogVisible: false, // 控制弹窗显示
  fileList: [], // 存储上传的文件列表
  fullscreen: false, // 控制弹窗是否全屏
  groupTitle: "",
  followUp: false, //新增弹窗
  switchValue: "", //开关
  color: "rgba(255, 69, 0, 0.68)", //颜色
  modelRadio: 0, //展示模型
  modalMode: "add", //新增
});

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleDownload = (file) => {
  console.log(file);
};
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);
const imageUrl = ref("");

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
};

const beforeAvatarUpload = (rawFile) => {
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
const handleCurrentChange = (val) => {
  //   state.changePage(val);
};
const handleClose = (val) => {
  state.dialogVisible = false;
};

const handleSizeChange = (val) => {
  // pageSize.value = val;
  //   state.changePage(val);
  console.log(`每页显示条数: ${val}`);
};

//图片上传成功回调方法
function handleFileUploaded(info) {
  ruleForm.iconUrl = info.url;
  console.log("应用图标", ruleForm.iconUrl);
}

function handleFileUploaded1(info) {
  ruleForm.converBackGroundUrl = info.url;
  console.log("遮罩背景图", ruleForm.converBackGroundUrl);
}
function handleFileUploaded2(info) {
  ruleForm.gifUrl = info.url;
  console.log("GIF动图", ruleForm.gifUrl);
}

const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  pflag: "",
  coverFlag: "",
  title: "",
  titleColor: "",
  displayType: "",
  content: "",
  contentColor: "",
  contentPosition: "",
  iconUrl: "",
  converBackGroundUrl: "",
  gifUrl: "",
  status: null,
});

const rules = reactive({
  // pflag: [{ required: true, message: t('盘标识')+' '+t('不能为空'), trigger: "blur" }],
  // coverFlag: [{ required: true, message: t('遮盖标识')+' '+t('不能为空'), trigger: "blur" }],
  // title: [{ required: true, message:t('标题')+' '+t('不能为空'), trigger: "blur" }],
  // titleColor: [
  //   { required: true, message: t('标题颜色')+' '+t('不能为空'), trigger: "blur" },
  // ],
  // displayType: [
  //   { required: true, message: t('展示类型')+' '+t('不能为空'), trigger: "blur" },
  // ],
  // content: [{ required: true, message: t('内容')+' '+t('不能为空'), trigger: "blur" }],
  // contentColor: [{ required: true, message: t('内容颜色')+' '+t('不能为空'), trigger: "blur" }],
  // contentPosition: [
  //   { required: true, message:t('内容位置')+' '+t('不能为空'), trigger: "blur" },
  // ],
  // iconUrl: [{ required: true, message: t('图标')+' '+t('不能为空'), trigger: "blur" }],
  // converBackGroundUrl: [
  //   { required: true, message: t('遮盖背景')+' '+t('不能为空'), trigger: "blur" },
  // ],
  // gifUrl: [{ required: true, message: t('GIF图')+' '+t('不能为空'), trigger: "blur" }],
  // status: [{ required: true, message: t('状态')+' '+t('不能为空'), trigger: "blur" }],
});

const tableData = ref([]);
// 获取遮盖列表数据
const getCover = () => {
  getCoverPage({})
    .then((res) => {
      tableData.value = res.data;
      console.log("获取遮盖列表数据", res.data);
    })
    .catch((error) => {
      console.error("获取遮盖列表数据失败", error);
    });
};

//新增弹窗
const openAddModal = () => {
  state.modalMode = "add";
  (ruleForm.pflag = ""),
    (ruleForm.coverFlag = ""),
    (ruleForm.title = ""),
    (ruleForm.titleColor = ""),
    (ruleForm.displayType = ""),
    (ruleForm.content = ""),
    (ruleForm.contentColor = ""),
    (ruleForm.contentPosition = ""),
    (ruleForm.iconUrl = ""),
    (ruleForm.converBackGroundUrl = ""),
    (ruleForm.gifUrl = ""),
    (ruleForm.status = null),
    (state.dialogVisible = true);
};
// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称 
  const fieldsToCheck = [
    { name: t('盘标识'), value: ruleForm.pflag },
    { name: t('遮盖标识'), value: ruleForm.coverFlag },
    { name: t('标题'), value: ruleForm.title },
    { name: t('标题颜色'), value: ruleForm.titleColor },
    { name: t('展示模型'), value: ruleForm.displayType },
    { name: t('内容'), value: ruleForm.content },
    { name: t('内容颜色'), value: ruleForm.contentColor },
    { name: t('内容位置'), value: ruleForm.contentPosition },
    { name: t('应用图标'), value: ruleForm.iconUrl },
    { name: t('遮罩背景图'), value: ruleForm.converBackGroundUrl },
    { name: t('GIF动图'), value: ruleForm.gifUrl },
    { name: t('状态'), value: ruleForm.status },
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

// 新增遮盖数据
const settCover = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setCoverPage([
    {
      pflag: ruleForm.pflag,
      coverFlag: ruleForm.coverFlag,
      title: ruleForm.title,
      titleColor: ruleForm.titleColor,
      displayType: ruleForm.displayType,
      content: ruleForm.content,
      contentColor: ruleForm.contentColor,
      contentPosition: ruleForm.contentPosition,
      iconUrl: ruleForm.iconUrl,
      converBackGroundUrl: ruleForm.converBackGroundUrl,
      gifUrl: ruleForm.gifUrl,
      status: ruleForm.status,
    },
  ]).then((res) => {
    state.dialogVisible = false;
    getCover();
    ElMessage({
      message:  t('添加成功'),
      type: 'success',
    })
    console.log("新增遮罩数据", res.data);
  });
};
// 处理遮盖的开关状态变化
const handleSwitchChange = (item) => {
  setCoverPage([
    {
      id: item.id,
      pflag: item.pflag,
      coverFlag: item.coverFlag,
      title: item.title,
      titleColor: item.titleColor,
      displayType: item.displayType,
      content: item.content,
      contentColor: item.contentColor,
      contentPosition: item.contentPosition,
      iconUrl: item.iconUrl,
      converBackGroundUrl: item.converBackGroundUrl,
      gifUrl: item.gifUrl,
      status: state.switchValue == true ? 1 : 0,
    },
  ]).then((res) => {
    getCover();
    ElMessage({
      message: t('修改成功'),
      type: 'success',
    })
    console.log("保存遮盖数据", res.data);
  });
};
//编辑弹窗
const openEditModal = (item) => {
  state.modalMode = "edit";
  ruleForm.id = item.id;
  ruleForm.pflag = item.pflag;
  ruleForm.coverFlag = item.coverFlag;
  ruleForm.title = item.title;
  ruleForm.titleColor = item.titleColor;
  ruleForm.displayType = item.displayType;
  ruleForm.content = item.content;
  ruleForm.contentColor = item.contentColor;
  ruleForm.contentPosition = item.contentPosition;
  ruleForm.iconUrl = item.iconUrl;
  ruleForm.converBackGroundUrl = item.converBackGroundUrl;
  ruleForm.gifUrl = item.gifUrl;
  ruleForm.status = item.status;
  state.dialogVisible = true;
};
//编辑遮盖数据
const editCover = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setCoverPage([
    {
      id: ruleForm.id,
      pflag: ruleForm.pflag,
      coverFlag: ruleForm.coverFlag,
      title: ruleForm.title,
      titleColor: ruleForm.titleColor,
      displayType: ruleForm.displayType,
      content: ruleForm.content,
      contentColor: ruleForm.contentColor,
      contentPosition: ruleForm.contentPosition,
      iconUrl: ruleForm.iconUrl,
      converBackGroundUrl: ruleForm.converBackGroundUrl,
      gifUrl: ruleForm.gifUrl,
      status: ruleForm.status,
    },
  ]).then((res) => {
    getCover();
    ElMessage({
      message: t('修改成功'),
      type: 'success',
    })
    state.dialogVisible = false;
    console.log("保存遮盖数据", res.data);
  });
};

// 删除遮盖数据id
const delCover = (id) => {
  ElMessageBox.confirm(t('是否确认删除'), t('提示'), {
    confirmButtonText: t('确定'),
    cancelButtonText:t('取消'),
    type: "warning",
  }).then(() => {
    delCoverPage(id) // 将 id 拼接为对象
      .then((res) => {
        console.log("删除成功,ID:", id);
        getCover(); // 删除成功后刷新列表
      })
      .catch((error) => {
        console.error("删除失败:", error);
        // 处理错误
      });
    proxy.$modal.msgSuccess(t('删除成功'));
  }).catch(() => { });

};

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
//刷新当前数据
const refresh = () => {
  ElMessage({
    message: t('刷新成功'),
    type: 'success',
  })
  getCover(); // 重新获取数据
};

onMounted(() => {
  getCover();
});

// const options = Array.from({ length: 10000 }).map((_, idx) => ({
//   value: `${idx + 1}`,
//   label: `${idx + 1}`,
// }));
</script>
<style lang="scss">
.el-color-picker__trigger {
  width: 100% !important;
}
</style>
