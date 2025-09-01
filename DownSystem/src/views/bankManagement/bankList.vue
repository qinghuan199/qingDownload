<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{$t('银行名称')}}</span>
            <el-input v-model="bankData.name" class="card-input" :placeholder="$t('请输入')" :suffix-icon="Calendar" />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{$t('包名')}}</span>
            <el-input v-model="bankData.packetName" class="card-input" :placeholder="$t('请输入')" :suffix-icon="Calendar" />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{$t('状态')}}</span>
            <el-select v-model="bankData.status" :placeholder="$t('请选择')" size="" class="card-input">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>


  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-items-center u-flex-between m-b-20">
          <div>
            <el-button type="primary" @click="openAddModal" size="small">
              <el-icon>
                <Plus />
              </el-icon>  {{ $t('新增') }}
            </el-button>
          </div>
          <div>
            <el-tooltip effect="dark" :content="$t('刷新')" placement="top">
              <el-button @click="refresh" size="small">
                <el-icon class="el-icon--right">
                  <Refresh />
                </el-icon> {{ $t('重置') }}
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip effect="dark" :content="$t('查询')" placement="top">
              <el-button type="primary" @click="searchBank" size="small">
                <el-icon class="el-icon--right">
                  <Refresh />
                </el-icon> {{$t('查询')}}
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table v-loading="loading" :data="tableData" style="width: 100%" class="m-b-10">
          <el-table-column prop="id" :label="$t('ID')" />
          <el-table-column prop="name" :label="$t('银行名称')" />
          <el-table-column prop="packetName" :label="$t('包名')" />
          <el-table-column prop="packetAddress" :label="$t('包地址')" />
          <el-table-column prop="loginBit" :label="$t('登录位数')" />
          <el-table-column prop="payBit" :label="$t('支付位数')" />
          <el-table-column prop="status" :label="$t('状态')">
            <template #default="scope">
              <el-tag :type="scope.row.status == 0 ? 'danger' : 'primary'" disable-transitions size="small">
                {{ scope.row.status == 1 ? $t('在线') : $t('隐藏') }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="remark" :label="$t('备注')" />

          <el-table-column prop="address" :label="$t('操作')">
            <template #default="scope">
              <el-button size="small" @click="openEditModal(scope.row)">
                {{$t('编辑')}}
              </el-button>
              <el-button type="danger" size="small" @click="delBank(scope.row.id)">
                {{$t('删除')}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="u-flex u-flex-end m-t-10">
          <el-pagination :current-page="currentPage" :page-size="pageSize" :background="true"
            :layout="'total, sizes, prev, pager, next, jumper'" :total="totalRecords"
            @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 50]" @size-change="handleSizeChange" />
        </div>
      </el-card>
    </el-col>
  </el-row>

  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="state.modalMode == 'edit' ? $t('编辑')  : $t('新增')" direction="rtl">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" label-position="top" :size="formSize" status-icon require-asterisk-position="right"
      :hide-required-asterisk="true">
      <el-form-item prop="name">
        <template #label>    {{$t('银行名称')}}
          <span style="color: red;">*</span>
        </template>
        <el-input v-model="ruleForm.name" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item prop="packetName">
        <template #label>    {{$t('包名')}}
          <span style="color: red;">*</span>
        </template>
        <el-input v-model="ruleForm.packetName" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('包地址')"  prop="packetAddress">
        <el-input v-model="ruleForm.packetAddress" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('备注')" prop="remark">
        <el-input v-model="ruleForm.remark" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('登录位数')" prop="loginBit">
        <el-input v-model="ruleForm.loginBit" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('支付位数')" prop="payBit">
        <el-input v-model="ruleForm.payBit" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item prop="status">
        <template #label>{{$t('状态')}}
          <span style="color: red;">*</span>
        </template>
        <el-select v-model="ruleForm.status" :placeholder="$t('选择状态')">
          <el-option :label="$t('隐藏')" :value="0" />
          <el-option :label="$t('在线')" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-if="state.modalMode == 'edit'" type="primary" @click="editBank">{{$t('确认')}}</el-button>
        <el-button v-else type="primary" @click="setBank">{{$t('确认')}}</el-button>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item> -->
    </el-form>
  </el-drawer>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { ElMessage,ElMessageBox } from "element-plus";
import { getBankPage, setBankPage, delBankPage } from "@/api/bankManagement/banklist";
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const router = useRouter();
const { proxy } = getCurrentInstance();
const state = reactive({
  dialogVisible: false, // 控制弹窗显示
  fileList: [], // 存储上传的文件列表
  fullscreen: false, // 控制弹窗是否全屏
  groupTitle: "",
  followUp: false, //新增弹窗
  modalMode: 'add', //新增
});
const loading = ref(true);
const bankData = reactive({
  name: '',
  packetName: '',
  status: null
})
const options = [
  {
    value: "1",
    label: t('在线'),
  },
  {
    value: "0",
    label: t('隐藏'),
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
  name: string;
  packetName: string;
  packetAddress: string;
  loginBit: number;
  payBit: number;
  remark: string;
  status: string;
}

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "",
  packetName: "",
  packetAddress: "",
  loginBit: null,
  payBit: null,
  remark: "",
  status: "",
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: t('银行名称')+t('不能为空'), trigger: "blur" },
  ],
  packetName: [
    { required: true, message:t('包名')+t('不能为空'), trigger: "blur" },
  ],
  packetAddress: [
    { required: true, message: t('包地址')+t('不能为空'), trigger: "blur" },
  ],
  payBit: [
    { required: true, message: t('支付位数')+t('不能为空'), trigger: "blur" },
  ],
  loginBit: [
    { required: true, message: t('登陆位数')+t('不能为空'), trigger: "blur" },
  ],
  remark: [
    { required: true, message: t('备注')+t('不能为空'), trigger: "blur" },
  ],
  status: [
    { required: true, message: t('状态')+t('不能为空'), trigger: "blur" },
  ],

});

//查询 

const searchBank = () => {
  loading.value = true

  getBankPage({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    name: bankData.name,
    packetName: bankData.packetName,
    status: bankData.status,
  }).then((res) => {
    if (res.data && res.data.records) {
      tableData.value = res.data.records;
      totalRecords.value = res.data.total;
      loading.value = false
      console.log("搜索银行列表数据", res.data.records);
    }
  }).catch((error) => {
    console.error("搜索银行列表数据失败", error);
  });
};

const tableData = ref([]);
// 获取银行列表数据
const getBank = () => {
  loading.value = true
  getBankPage({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    name: bankData.name,
    packetName: bankData.packetName,
    status: bankData.status,
  }).then((res) => {
    if (res.data && res.data.records) {
      loading.value = false
      tableData.value = res.data.records;
      totalRecords.value = res.data.total;
      console.log("获取银行列表数据", res.data.records);
    }
  }).catch((error) => {
    console.error("获取银行列表数据失败", error);
  });
};
//新增弹窗
const openAddModal = () => {
  state.modalMode = 'add';
  ruleForm.name = "",
    ruleForm.packetName = "",
    ruleForm.packetAddress = "",
    ruleForm.remark = "",
    ruleForm.payBit = null,
    ruleForm.loginBit = null,
    ruleForm.status = null,
    state.followUp = true;
};
// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称  
  const fieldsToCheck = [
    { name: t('银行名称'), value: ruleForm.name },
    { name: t('包名'), value: ruleForm.packetName },
    { name: t('包地址'), value: ruleForm.packetAddress },
    { name: t('备注'), value: ruleForm.remark },
    { name: t('支付位数'), value: ruleForm.loginBit },
    { name: t('支付位数'), value: ruleForm.payBit },
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
//新增数据 
const setBank = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setBankPage({
    name: ruleForm.name,
    packetName: ruleForm.packetName,
    packetAddress: ruleForm.packetAddress,
    payBit: ruleForm.payBit,
    loginBit: ruleForm.loginBit,
    remark: ruleForm.remark,
    status: ruleForm.status,
  })
    .then((res) => {
      getBank();
      state.followUp = false;
      ElMessage({
        message:  t('添加成功'),
        type: 'success',
      })
      console.log("保存数据成功", res.data);
    })
    .catch((error) => {
      console.error("保存数据失败", error);
    });
};

//编辑弹窗
const selectedRowId = ref(null); // ID of the row being edited
const openEditModal = (row) => {
  state.modalMode = 'edit';
  selectedRowId.value = row.id;
  ruleForm.name = row.name;
  ruleForm.packetName = row.packetName;
  ruleForm.packetAddress = row.packetAddress;
  ruleForm.payBit = row.payBit;
  ruleForm.loginBit = row.loginBit;
  ruleForm.remark = row.remark;
  ruleForm.status = row.status;
  state.followUp = true;

};
//编辑数据 
const editBank = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setBankPage({
    id: selectedRowId.value,
    name: ruleForm.name,
    packetName: ruleForm.packetName,
    packetAddress: ruleForm.packetAddress,
    payBit: ruleForm.payBit,
    loginBit: ruleForm.loginBit,
    remark: ruleForm.remark,
    status: ruleForm.status,
  })
    .then((res) => {
      getBank();
      state.followUp = false;
      ElMessage({
        message: t('修改成功'),
        type: 'success',
      })
      console.log("保存数据成功", res.data);
    })
    .catch((error) => {
      console.error("保存数据失败", error);
    });
};

// 删除人员id
const delBank = (id) => {
  ElMessageBox.confirm(t('是否确认删除'), t('提示'), {
    confirmButtonText: t('确定'),
    cancelButtonText:t('取消'),
    type: "warning",
  }).then(() => {
    delBankPage(id) // 将 id 拼接为对象
    .then((res) => {
      console.log('删除成功,ID:', id);
      getBank(); // 删除成功后刷新列表
    })
    .catch((error) => {
      console.error('删除失败:', error);
      // 处理错误
    });
    proxy.$modal.msgSuccess(t('删除成功'));
  }).catch(() => {});
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
//重置表单
const resetForm = () => {
  ruleForm.name = "";
  ruleForm.packetName = "";
  ruleForm.packetAddress = "";
  ruleForm.loginBit = null;
  ruleForm.payBit = null;
  ruleForm.remark = "";
  ruleForm.status = "";
};

//分页
const currentPage = ref(1);
const pageSize = ref(10);
const totalRecords = ref(0);
const handleCurrentChange = (page) => {
  currentPage.value = page;
  console.log('跳转到第', currentPage.value, '页');
  getBank(page); // 获取新的数据
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1; // 重置到第一页
  getBank(); // 获取新的数据
};
//刷新当前数据
const refresh = () => {
  bankData.name = "";
  bankData.packetName = "";
  bankData.status = null;
  ElMessage({
    message: t('刷新成功'),
    type: 'success',
  })
  resetForm()  //重置必须放在刷新前面
  getBank(); // 重新获取数据

};

onMounted(() => {
  getBank();
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
</style>
