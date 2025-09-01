<template>
  <div class=" ">
    <el-row class="m-b-20">
      <el-col>
        <el-card class="height-500" style="overflow-y: auto;">
          <div class="u-flex u-flex-items-center u-flex-between m-b-10">
            <div>
              <el-switch v-model="state.switchValue" @change="handleSwitchChange" inline-prompt :active-text="$t('开启')"
                :inactive-text="$t('关闭')" />
            </div>
            <div>
              <el-button type="primary" @click="openAddModal" size="small">
                <el-icon>
                  <Plus />
                </el-icon>
                {{$t('新增')}}
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
          <el-table v-loading="loading" border :data="tableData" style="width: 100%" class="m-b-10" size="small">
            <el-table-column prop="ip" label="IP"  align="center"/>
            <el-table-column prop="remark" :label="$t('备注')"  align="center" width="180" />
            <el-table-column :label="$t('操作')"   align="center" width="180">
              <template #default="scope">
                <el-button size="small" @click="openEditModal(scope.row)">
                  {{$t('编辑')}}
                </el-button>
                <el-button type="danger" size="small" @click="delIpWhite(scope.row.id)">
                  {{$t('删除')}}
                </el-button>
                <!-- <el-button type="primary" size="small" @click="state.dialogVisible = true">
                查看验证码
              </el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <div class="u-flex u-flex-end m-t-10">
      <el-pagination :current-page="currentPage" :page-size="pageSize" :background="true"
        :layout="'total, sizes, prev, pager, next, jumper'" :total="totalRecords" @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]" @size-change="handleSizeChange" />
    </div>
  </div>
  <!-- 修改弹窗 -->
  <el-drawer v-model="state.followUp" :title="state.modalMode === 'edit' ? $t('编辑')  : $t('新增')" direction="rtl">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" label-position="top" :size="formSize" status-icon require-asterisk-position="right">
      <el-form-item :label="$t('名称')" prop="ip">
        <el-input v-model="ruleForm.ip" />
      </el-form-item>
      <el-form-item :label="$t('备注')" prop="remark">
        <el-input v-model="ruleForm.remark" />
      </el-form-item>
      <el-form-item :label="$t('Type类型')" prop="type">
        <el-select v-model="ruleForm.type" :placeholder="$t('选择')">
          <el-option :label="$t('app')" value="0" />
          <el-option :label="$t('管理后台')" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('是否白名单')" prop="isWhite">
        <el-select v-model="ruleForm.isWhite" :placeholder="$t('选择')">
          <el-option  :label="$t('是')" value="1" />
          <el-option :label="$t('否')" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('状态')" prop="status">
        <el-select v-model="ruleForm.status" :placeholder="$t('选择')">
          <el-option :label="$t('开启')" value="true" /> 
          <el-option :label="$t('关闭')" value="false" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-if="state.modalMode === 'edit'" type="primary" @click="editIpWhite">{{$t('确认')}}</el-button>
        <el-button v-else type="primary" @click="addIpWhite">{{$t('确认')}}</el-button>
        <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { ElMessage,ElMessageBox } from 'element-plus';
import {
  getIpWhitePage,
  setIpWhitePage,
  delIpWhitePage,
  getIpWhiteStatus,
  setIpWhiteStatus,
} from "@/api/system/ipwhite";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { proxy } = getCurrentInstance();
const loading = ref(true);
const router = useRouter();
const state = reactive({
  dialogVisible: false, // 控制弹窗显示
  fileList: [], // 存储上传的文件列表
  fullscreen: false, // 控制弹窗是否全屏
  groupTitle: "",
  modalMode: 'add', //新增
  followUp: false, //修改弹窗
  switchValue: false, //开关
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

interface RuleForm {
  ip: string;
  isWhite: string;
  remark: string;
  status: string;
  type: string;

}

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  ip: "",
  isWhite: '',
  type: '',
  status: "",
  remark: ''

});

const rules = reactive<FormRules<RuleForm>>({
  ip: [
    { required: true, message: t('ip')+t('不能为空'), trigger: "blur" },
  ],
  isWhite: [
    { required: true, message: t('白名单')+t('不能为空'), trigger: "blur" },
  ],
  type: [
    { required: true, message: t('Type类型')+t('不能为空'), trigger: "blur" },
  ],
  status: [
    { required: true, message: t('状态')+t('不能为空'), trigger: "blur" },
  ],
  remark: [
    { required: true, message: t('备注')+t('不能为空'), trigger: "blur" },
  ],

});
const tableData = ref([]);
// 获取白名单数据
const getIpWhite = () => {
  loading.value = true;
  getIpWhitePage({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        loading.value = false;
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        console.log("获取白名单数据", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取白名单数据失败", error);
    });
};
//新增弹窗
const openAddModal = () => {
    state.modalMode = 'add';
    ruleForm.ip = "",
    ruleForm.type = "",
    ruleForm.remark = "",
    ruleForm.isWhite = "",
    ruleForm.status = "",
    state.followUp = true;
};

// 检查字段是否填写并返回
const checkIn = () => {
   // 定义需要检查的字段及其显示名称  
   const fieldsToCheck = [
    { name: t('名称'), value: ruleForm.ip },
    { name:  t('备注'), value: ruleForm.remark },
    { name: t('Type类型'), value: ruleForm.type },
    { name:  t('白名单'), value: ruleForm.isWhite },
    { name:t('状态'), value: ruleForm.status },
  ];
  // 检查字段是否为空  
  for (const field of fieldsToCheck) {
    if (field.value === undefined || field.value === null || field.value === '') {
      ElMessage(`${field.name} `+t('不能为空'));
      return false
    }
  }
  return true; // 所有字段都已填写
}
//新增方法
const addIpWhite = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setIpWhitePage({
    ip: ruleForm.ip,
    type: ruleForm.type,
    remark: ruleForm.remark,
    isWhite: ruleForm.isWhite,
    status: ruleForm.status
  }).then((res) => {
    state.followUp = false;
    ElMessage({
      message:  t('添加成功'),
      type: 'success',
    })
    getIpWhite();
    getIpStatus();
    console.log("保存白名单数据成功", res.data);
  }).catch((error) => {
    console.error("添加失败:", error);

  });
};

// 删除白名单id
const delIpWhite = (id) => {
  ElMessageBox.confirm(t('是否确认删除'), t('提示'), {
    confirmButtonText: t('确定'),
    cancelButtonText:t('取消'),
    type: "warning",
  }).then(() => {
    delIpWhitePage(id) // 将 id 拼接为对象
    .then((res) => {
      console.log("删除成功,ID:", id);
      getIpWhite(); // 删除成功后刷新列表
    })
    .catch((error) => {
      console.error("删除失败:", error);
      // 处理错误

    });
    proxy.$modal.msgSuccess(t('删除成功'));
  }).catch(() => {});

};


//编辑
const selectedRowId = ref(null); // ID of the row being edited
const openEditModal = (row) => {
  state.modalMode = 'edit';
  selectedRowId.value = row.id;
  ruleForm.ip = row.ip;
  ruleForm.type = row.type;
  ruleForm.isWhite = row.isWhite;
  ruleForm.status = row.status==true?t('开启'):t('关闭');
  ruleForm.remark = row.remark;
  state.followUp = true;
};

const editIpWhite = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setIpWhitePage({
    id: selectedRowId.value,
    ip: ruleForm.ip,
    type: ruleForm.type,
    remark: ruleForm.remark,
    isWhite: ruleForm.isWhite,
    status: ruleForm.status==t('开启')?true:false,
  }).then((res) => {
    state.followUp = false;
    getIpWhite();
    getIpStatus();
    ElMessage({
      message: t('修改成功'),
      type: 'success',
    })
    console.log("保存白名单数据成功", res.data);
  }).catch((error) => {
    console.error("编辑失败:", error);

  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
//获取封号设置
const getIpStatus = () => {
  getIpWhiteStatus({})
    .then((res) => {
      const data = res.data;
      state.switchValue = data;
      console.log("获取封号设置", res.data);
    })
    .catch((error) => {
      console.error("获取封号设置失败", error);
    });
};
// 保存封号状态
const setIpStatus = (value) => {
  setIpWhiteStatus(value)
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
    setIpStatus(1);
    ElMessage({
        message: t('开启成功'),
        type: 'success',
      })
  } else {
    setIpStatus(0);
    ElMessage({
        message: t('关闭成功'),
        type: 'success',
      })
  }
  getIpWhite();
  console.log("开关状态", value);
};

//分页
const currentPage = ref(1);
const pageSize = ref(10);
const totalRecords = ref(0);
const handleCurrentChange = (page) => {
  currentPage.value = page;
  console.log("跳转到第", currentPage.value, "页");
  getIpWhite(page); // 获取新的数据
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1; // 重置到第一页
  getIpWhite(); // 获取新的数据
};
//刷新当前数据
const refresh = () => {
  ElMessage({
    message:t('刷新成功'),
    type: 'success',
  })
  getIpStatus(); // 重新获取数据
  getIpWhite();
};
//挂载
onMounted(() => {
  getIpWhite();
  getIpStatus();
});

// const options = Array.from({ length: 10000 }).map((_, idx) => ({
//   value: `${idx + 1}`,
//   label: `${idx + 1}`,
// }));
</script>
<style lang="scss">
.box-card-input {
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
