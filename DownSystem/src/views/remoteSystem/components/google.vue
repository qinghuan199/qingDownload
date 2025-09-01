<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card style="height: 100%; overflow: hidden">
        <div class="u-flex u-flex-items-center u-flex-between m-b-20">
          <div>
            <el-button type="primary" @click="openAddModal" size="small">
              <el-icon>
                <Plus />
              </el-icon>
              {{ $t('新增') }}
            </el-button>
          </div>
          <div class="u-flex u-flex-end m-t-10">
            <el-pagination :current-page="currentPage" :page-size="pageSize" :background="true"
              :layout="'total, sizes, prev, pager, next, jumper'" :total="totalRecords"
              @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" @size-change="handleSizeChange" />
          </div>
          <div>
            <el-button type="success" @click="refresh" size="small">
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
              {{ $t('刷新') }}
            </el-button>
          </div>
        </div>

        <div class="u-flex u-flex-between u-flex-wrap" style="max-height: 600px; overflow-y: auto">
          <el-card class="width-550 m-10" v-for="(item, index) in tableList" :key="item.id">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="item" :rules="rules" label-width="auto"
              class="demo-ruleForm" label-position="left" :size="formSize" status-icon require-asterisk-position="right"
              :hide-required-asterisk="true">
              <div class="u-flex u-flex-end m-b-10">
                <el-button type="primary" @click="openEditModal(item)" size="small">
                  <el-icon>
                    <Edit />
                  </el-icon>
                  {{ $t('编辑') }}
                </el-button>
                <el-button type="danger" @click="delGoogleList(item.id)" size="small">
                  <el-icon>
                    <Delete />
                  </el-icon>
                  {{ $t('删除') }}
                </el-button>
              </div>
              <el-form-item :label="$t('来源标识')" prop="sourceFlag">
                <el-input v-model="item.sourceFlag" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item :label="$t('地址')" prop="address">
                <el-input v-model="item.address" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item :label="$t('包名')" prop="packetName">
                <el-input v-model="item.packetName" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item :label="$t('TTB地址')" prop="ttbAddress">
                <el-input v-model="item.ttbAddress" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item :label="$t('TTB包名')" prop="ttbPacketName">
                <el-input v-model="item.ttbPacketName" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item :label="$t('谷歌密钥')" prop="keyUrl">
                <FileUpload :limit="1" :callback="handleFileUploaded" :modelValue="item.keyUrl"></FileUpload>
              </el-form-item>
              <el-form-item :label="$t('备注')" prop="remark">
                <el-input v-model="item.remark" :placeholder="$t('请输入')" />
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <!-- dialog弹窗 -->
  <el-dialog title="111" v-model="state.dialogVisible" width="600px" append-to-body>
    <div>{{ $t('测试') }}</div>
  </el-dialog>

  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="state.modalMode === 'edit' ? $t('编辑') : $t('新增')" direction="rtl">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" label-position="left" :size="formSize" status-icon require-asterisk-position="right"
      :hide-required-asterisk="true">
      <el-form-item :label="$t('来源标识')" prop="sourceFlag">
        <el-input v-model="ruleForm.sourceFlag" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('地址')" prop="address">
        <el-input v-model="ruleForm.address" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('包名')" prop="packetName">
        <el-input v-model="ruleForm.packetName" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('TTB地址')" prop="ttbAddress">
        <el-input v-model="ruleForm.ttbAddress" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('TTB包名')" prop="ttbPacketName">
        <el-input v-model="ruleForm.ttbPacketName" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('谷歌密钥')" prop="keyUrl">
        <FileUpload :limit="1" :callback="handleFileUploaded" :modelValue="ruleForm.keyUrl"></FileUpload>
      </el-form-item>
      <el-form-item :label="$t('备注')" prop="remark">
        <el-input v-model="ruleForm.remark" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item>
        <el-button v-if="state.modalMode === 'edit'" type="primary" @click="editGoogleList">{{ $t('确认') }}</el-button>
        <el-button v-else type="primary" @click="setGoogleList">{{ $t('确认') }}</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage,ElMessageBox } from 'element-plus';
import {
  getGooglePage,
  setGooglePage,
  delGooglePage,
} from "@/api/system/google";
import { useRouter } from "vue-router";
// import { Right } from "@element-plus/icons-vue/dist/types";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { proxy } = getCurrentInstance();
const router = useRouter();
const state = reactive({
  dialogVisible: false, // 控制弹窗显示
  fileList: [], // 存储上传的文件列表
  fullscreen: false, // 控制弹窗是否全屏
  groupTitle: "",
  followUp: false, //新增弹窗
  switchValue: "", //开关
  modalMode: 'add', //新增

});
const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  ip: "", //id
  remark: "", //备注
  sourceFlag: "",
  address: "",
  ttbAddress: "",
  keyUrl: "",
  packetName: "",
  ttbPacketName: "",
});

const rules = {
  sourceFlag: [
    { required: true, message: t('来源标识') + t('不能为空'), trigger: "blur" },
  ],
  address: [{ required: true, message: t('地址') + t('不能为空'), trigger: "blur" }],
  packetName: [{ required: true, message: t('包名') + t('不能为空'), trigger: "blur" }],
  ttbAddress: [{ required: true, message:  t('TTB地址') + t('不能为空'), trigger: "blur" }],
  ttbPacketName: [
    { required: true, message:  t('TTB包名') + t('不能为空'), trigger: "blur" },
  ],
  keyUrl: [{ required: true, message:  t('谷歌密钥') + t('不能为空'), trigger: "blur" }],
  remark: [{ required: true, message:  t('备注') + t('不能为空'), trigger: "blur" }],
};
const tableList = ref([]);


// 获取google列表数据
const getGoogleList = () => {
  getGooglePage({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        totalRecords.value = res.data.total;
        tableList.value = res.data.records; // 将records存储到响应式变量中
        console.log("获取google列表数据", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取google列表数据失败", error);
    });
};
// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称  
  const fieldsToCheck = [
    { name: t('来源标识'), value: ruleForm.sourceFlag },
    { name: t('地址'), value: ruleForm.address },
    { name: t('包名'), value: ruleForm.packetName },
    { name: t('TTB地址'), value: ruleForm.ttbAddress },
    { name: t('TTB包名'), value: ruleForm.ttbPacketName },
    { name: t('谷歌密钥'), value: ruleForm.keyUrl },
    { name: t('备注'), value: ruleForm.remark },
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
//新增弹窗
const openAddModal = () => {
  state.modalMode = 'add';
  ruleForm.sourceFlag = "",
    ruleForm.ttbAddress = "",
    ruleForm.address = "",
    ruleForm.keyUrl = "",
    ruleForm.remark = "",
    ruleForm.packetName = "",
    ruleForm.ttbPacketName = "",
    state.followUp = true;
};
// 新增google数据
const setGoogleList = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setGooglePage([
    {
      sourceFlag: ruleForm.sourceFlag,
      ttbAddress: ruleForm.ttbAddress,
      address: ruleForm.address,
      keyUrl: ruleForm.keyUrl,
      remark: ruleForm.remark,
      packetName: ruleForm.packetName,
      ttbPacketName: ruleForm.ttbPacketName,
    },
  ]).then((res) => {
    state.followUp = false;
    ElMessage({
      message: t('添加成功'),
      type: 'success',
    })
    getGoogleList();
    console.log("保存Google数据", res);
  });
};

//编辑弹窗
const selectedItemId = ref(null); // ID of the row being edited
const openEditModal = (item) => {
  state.modalMode = 'edit';
  state.followUp = true;
  selectedItemId.value = item.id;
  ruleForm.sourceFlag = item.sourceFlag;
  ruleForm.ttbAddress = item.ttbAddress;
  ruleForm.address = item.address;
  ruleForm.keyUrl = item.keyUrl;
  ruleForm.remark = item.remark;
  ruleForm.packetName = item.packetName;
  ruleForm.ttbPacketName = item.ttbPacketName;
};
// 编辑google数据
const editGoogleList = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setGooglePage([
    {
      id: selectedItemId.value,
      sourceFlag: ruleForm.sourceFlag,
      ttbAddress: ruleForm.ttbAddress,
      address: ruleForm.address,
      keyUrl: ruleForm.keyUrl,
      remark: ruleForm.remark,
      packetName: ruleForm.packetName,
      ttbPacketName: ruleForm.ttbPacketName,
    },
  ]).then((res) => {
    state.followUp = false;
    ElMessage({
      message: t('修改成功'),
      type: 'success',
    })
    getGoogleList();
    console.log("保存Google数据", res);
  });
};


// 删除google数据id
const delGoogleList = (id) => {
  ElMessageBox.confirm(t('是否确认删除'), t('提示'), {
    confirmButtonText: t('确定'),
    cancelButtonText:t('取消'),
    type: "warning",
  }).then(() => {
    delGooglePage(id) // 将 id 拼接为对象
      .then((res) => {
        console.log("删除成功,ID:", id);
        getGoogleList(); // 删除成功后刷新列表
        resetForm(); // 如果需要重置表单，可以在这里调用
      })
      .catch((error) => {
        state.followUp = false;
        console.error("删除失败:", error);
        // 处理错误
      });
    proxy.$modal.msgSuccess(t('删除成功'));
  }).catch(() => { });

};



//   重置表单
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const upload = ref();

// 处理文件超出限制的函数
const handleExceed = (files) => {
  upload.value.clearFiles(); // 清空已选择的文件
  const file = files[0]; // 获取第一个文件
  console.log("文件", file); // 打印文件
  file.uid = genFileId(); // 设置文件唯一标识
  upload.value.handleStart(file); // 开始上传文件
};

// 处理文件状态变化的函数
const handleChange = (file, fileList) => {
  console.log("文件状态变化", file);
};
const handleSuccess = (response, file) => {
  console.log("上传成功", response);
  // 这里可以处理上传成功后的逻辑，比如更新状态、提示用户等
};
const handleError = (err, file) => {
  console.error("上传失败", err);
  // 处理上传失败的情况
};

//文件上传成功回调方法
const handleFileUploaded = (info) => {
  ruleForm.keyUrl = info.url;
  console.log("图片", ruleForm.keyUrl);
};
//分页
const currentPage = ref(1);
const pageSize = ref(10);
const totalRecords = ref(0);
const handleCurrentChange = (page) => {
  currentPage.value = page;
  console.log("跳转到第", currentPage.value, "页");
  getGoogleList(page); // 获取新的数据
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1; // 重置到第一页
  getGoogleList(); // 获取新的数据
};

//刷新当前数据
const refresh = () => {
  ElMessage({
    message: t('刷新成功'),
    type: 'success',
  })
  getGoogleList(); // 重新获取数据
};

onMounted(() => {
  getGoogleList();
});
</script>
<style lang="scss"></style>
