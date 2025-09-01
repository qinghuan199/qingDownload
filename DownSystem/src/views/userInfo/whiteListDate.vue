<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{$t('手机号')}}</span>
            <el-input v-model="whiteListData.tel" class="card-input" :placeholder="$t('请输入')" />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{$t('跟进状态')}}</span>
            <el-select v-model="whiteListData.traceStatus" :placeholder="$t('请选择')" size="" class="card-input">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{$t('登录状态')}}</span>
            <el-select v-model="whiteListData.loginStatus" :placeholder="$t('请选择')" size="" class="card-input">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
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
            <el-button @click="openAddModal" type="primary" size="small">
              <el-icon>
                <Plus />
              </el-icon> {{ $t('新增') }}
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
              <el-button @click="searchWhiteUser" type="primary" size="small">
                <el-icon class="el-icon--right">
                  <Refresh />
                </el-icon> {{$t('查询')}}
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table v-loading="loading" :data="tableData" style="width: 100%" class="m-b-10">
          <el-table-column prop="groupName" :label="$t('组名')" />
          <el-table-column prop="tel" :label="$t('手机号')" />
          <el-table-column prop="realName" :label="$t('用户名称')" />
          <el-table-column prop="idNo" :label="$t('身份证')" />
          <el-table-column prop="registerTime" :label="$t('注册时间')" />
          <el-table-column prop="traceStatus" :label="$t('跟进状态')">
            <template #default="scope">
              <el-tag :type="scope.row.traceStatus == 0 ? 'primary' : 'success'" disable-transitions size="small">{{
                scope.row.traceStatus == 0 ? $t('未处理') : $t('已处理') }}</el-tag>
              <!-- <el-tag
                :type="true ? 'danger' : 'success'"
                disable-transitions
                size="small"
                >未处理</el-tag
              > -->
            </template>
          </el-table-column>
          <el-table-column prop="loginStatus" :label="$t('登录状态')">
            <template #default="scope">
              <el-tag :type="scope.row.loginStatus == 0 ? 'danger' : 'success'" disable-transitions size="small">{{
                scope.row.loginStatus == 0 ? $t('离线') : $t('在线') }}</el-tag>
              <!-- <el-tag
                :type="true ? 'danger' : 'success'"
                disable-transitions
                size="small"
                >未登录</el-tag
              > -->
            </template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('操作')">
            <template #default="scope">
              <el-button type="primary" size="small" @click="openEditModalStatus(scope.row)">
                    {{$t('跟进')}}
              </el-button>
              <el-button type="primary" size="small" @click="openEditModal(scope.row)">
                {{$t('编辑')}}
              </el-button>
              <el-button @click="delWhiteListDate(scope.row.id)" type="danger" size="small"> {{$t('删除')}} </el-button>
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

  <el-drawer v-model="state.followUp" :title="$t('修改')" direction="rtl">
    <div class="m-b-10">{{$t('跟进状态')}}</div>
    <el-select v-model="state.traceStatus" :placeholder="$t('请选择')" size="large" class="card-input">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-button class="m-t-30" type="primary" size="small" @click="updateTraceStatus">
      {{$t('确认')}}
    </el-button>
  </el-drawer>
  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUpUser" :title="state.modalMode == 'edit' ? $t('编辑')  :  $t('添加')" direction="rtl">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" label-position="top" :size="formSize" status-icon require-asterisk-position="right"
      :hide-required-asterisk="true">
      <el-form-item prop="userName">
        <template #label>{{$t('用户账号')}}
          <span style="color: red;">*</span>
        </template>
        <el-input v-model="ruleForm.userName" />
      </el-form-item>
      <el-form-item :label="$t('用户名称')" prop="realName">
        <!-- <template #label>{{$t('用户名称')}}
          <span style="color: red;">*</span>
        </template> -->
        <el-input v-model="ruleForm.realName" />
      </el-form-item>
      <el-form-item prop="tel">
        <template #label>{{$t('手机号')}}
          <span style="color: red;">*</span>
        </template>
        <el-input v-model="ruleForm.tel" />
      </el-form-item>
      <el-form-item :label="$t('身份证')" prop="idNo">
        <!-- <template #label>{{$t('身份证')}}
          <span style="color: red;">*</span>
        </template> -->
        <el-input v-model="ruleForm.idNo" />
      </el-form-item>
      <el-form-item :label="$t('跟进状态')" prop="traceStatus">
        <!-- <template #label>{{$t('跟进状态')}}
          <span style="color: red;">*</span>
        </template> -->
        <el-select v-model="ruleForm.traceStatus" :placeholder="$t('请选择')">
          <el-option :label="$t('已处理')" :value="1" />
          <el-option :label="$t('未处理')" :value="0" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item prop="loginStatus">
        <template #label>{{$t('登录状态')}}
          <span style="color: red;">*</span>
        </template>
        <el-select v-model="ruleForm.loginStatus" :placeholder="$t('请选择')">
          <el-option :label="$t('在线')" :value="1" />
          <el-option :label="$t('离线')" :value="0" />
        </el-select>
      </el-form-item> -->

      <el-form-item>
        <el-button v-if="state.modalMode === 'edit'" type="primary" @click="editWhiteUser">{{$t('确认')}}</el-button>
        <el-button v-else type="primary" @click="setWhiteUser">{{$t('确认')}}</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { ElMessage,ElMessageBox } from "element-plus";
import {
  getWhiteListDatePage,
  setWhiteListDatePage,
  delWhiteListDatePage,
  updateTraceStatusPage,
} from "@/api/userInfo/whitelistdate";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const route = useRoute();
const state = reactive({
  phone: "",
  loginState: "",
  followUp: false,
  followUpUser: false,
  traceStatus: '',
  modalMode: "add", //新增
});
const { proxy } = getCurrentInstance();
const loading = ref(true);
// 搜索列表
const whiteListData = reactive({
  tel: "",
  traceStatus: "",
  loginStatus: "",
});
//跟进状态
const options = [
  {
    value: "0",
    label: t('未处理'),
  },
  {
    value: "1",
    label: t('已处理'),
  }
];
//登录状态
const options1 = [
  {
    value: "0",
    label:  t('离线'),
  },
  {
    value: "1",
    label: t('在线'),
  }
];

const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  // groupId: "",
  userName: "",
  tel: "",
  realName: "",
  idNo: "",
  traceStatus: "",
  // loginStatus:"",
});

const rules = reactive({
  // groupId: [{ required: true, message: "组名不能为空", trigger: "blur" }],
  // userName: [{ required: true, message: "用户账户不能为空", trigger: "blur" }],
  // tel: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
  // realName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }],
  // idNo: [{ required: true, message: "身份证不能为空", trigger: "blur" }],
  // traceStatus: [{ required: true, message: "跟进状态不能为空", trigger: "blur" }],
  // loginStatus: [{ required: true, message: "登录状态不能为空", trigger: "blur" }],
});

//新增弹窗
const openAddModal = () => {
  state.modalMode = "add";
  (ruleForm.userName = ""),
    (ruleForm.realName = ""),
    (ruleForm.tel = ""),
    (ruleForm.idNo = ""),
    // (ruleForm.loginStatus = ""),
    (ruleForm.traceStatus = ""),
    (state.followUpUser = true);
};
// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称  
  const fieldsToCheck = [
    { name: t('用户账号'), value: ruleForm.userName },
    // { name: '用户名称', value: ruleForm.realName }, // 这一项暂时注释
    { name: t('手机号'), value: ruleForm.tel },
    // { name: '身份证', value: ruleForm.idNo },
    // { name: '跟进状态', value: ruleForm.traceStatus },
  ];

  // 检查字段是否为空  
  for (const field of fieldsToCheck) {
    // 判断某一组字段是否至少有一个填写了
    if (field.name === t('用户账号') || field.name === t('手机号')) {
      // 如果其中一个字段有值，则跳过检查
      if (!ruleForm.userName && !ruleForm.tel) {
        ElMessage(t('用户账号')+t('或')+t('手机号')+t('不能为空'));
        return false; // 返回 false 表示检查失败
      }
    } else if (field.value === undefined || field.value === null || field.value === '') {
      ElMessage(`${field.name} `+t('不能为空'));
      return false; // 返回 false 表示检查失败
    }
  }

  return true; // 所有字段都已填写
}

//新增新用户
const setWhiteUser = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setWhiteListDatePage({
    userName: ruleForm.userName,
    realName: ruleForm.realName,
    tel: ruleForm.tel,
    idNo: ruleForm.idNo,
    traceStatus: ruleForm.traceStatus,
    // loginStatus: ruleForm.loginStatus,
    groupId: groupId.value
  })
    .then((res) => {
      ElMessage({
        message: t('添加成功'),
        type: 'success',
      })
      getWhiteUser()
      console.log("添加用户成功", res.data);
      state.followUpUser = false;
    })
    .catch((error) => {
      console.error("添加用户失败:", error);
      state.followUpUser = false;
    });
};

//编辑白名单组用户弹窗
const selectedRowId = ref(null); // ID必须要
const openEditModal = (row) => {
  state.modalMode = "edit";
  selectedRowId.value = row.id;
  ruleForm.userName = row.userName;
  ruleForm.tel = row.tel;
  ruleForm.realName = row.realName;
  ruleForm.idNo = row.idNo;
  ruleForm.traceStatus = row.traceStatus;
  // ruleForm.loginStatus = row.loginStatus;
  state.followUpUser = true;
  console.log("id", row.id);
  console.log("跟进状态", ruleForm.traceStatus);

};

//编辑白名单组用户
const editWhiteUser = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setWhiteListDatePage({
    userName: ruleForm.userName,
    groupId: groupId.value,
    userId: selectedRowId.value,
    realName: ruleForm.realName,
    tel: ruleForm.tel,
    idNo: ruleForm.idNo,
    traceStatus: ruleForm.traceStatus,
    // loginStatus: ruleForm.loginStatus,
  })
    .then((res) => {
      ElMessage({
        message: t('修改成功'),
        type: 'success',
      })
      getWhiteUser();
      console.log("编辑用户成功", res.data);
      state.followUpUser = false;
    })
    .catch((error) => {
      console.error("编辑用户失败:", error);
      state.followUpUser = false;
    });
};


const tableData = ref([]);
// 获取白名单组用户数据
const getWhiteUser = () => {
  loading.value = true;
  getWhiteListDatePage(groupId.value, {
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    tel: whiteListData.tel,
    traceStatus: whiteListData.traceStatus,
    // loginStatus: whiteListData.loginStatus,
  }).then((res) => {
    if (res.data && res.data.records) {
      loading.value = false;
      tableData.value = res.data.records;
      totalRecords.value = res.data.total;
      console.log("获取用户信息数据", res.data.records);
    }
  }).catch((error) => {
    console.error("获取用户信息数据失败", error);
  });
};

// 查询白名单组用户数据
const searchWhiteUser = () => {
  loading.value = true;
  getWhiteListDatePage(groupId.value, {
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    groupId: groupId.value,
    tel: whiteListData.tel,
    traceStatus: whiteListData.traceStatus,
    // loginStatus: whiteListData.loginStatus,
  }).then((res) => {
    if (res.data && res.data.records) {
      loading.value = false;
      tableData.value = res.data.records;
      totalRecords.value = res.data.total;
      console.log("查询用户信息数据", res.data.records);
    }
  }).catch((error) => {
    console.error("获取用户信息数据失败", error);
  });
};



const userId = ref('')
const status = ref('')
//编辑跟进状态弹窗
const openEditModalStatus = (row) => {
  state.traceStatus = row.traceStatus == 1 ? t('已处理') :t('未处理');
  userId.value = row.id;
  state.followUp = true;
  console.log("id", row.id);

};

//改变用户跟踪状态
const updateTraceStatus = (id, status) => {
  id = userId.value
  status = state.traceStatus;
  updateTraceStatusPage(id, status)
    .then((res) => {
      state.followUp = false;
      ElMessage({
        message: t('修改成功'),
        type: 'success',
      })
      getWhiteUser();
      console.log("编辑状态成功", res.data);
    })
    .catch((error) => {
      console.error("编辑失败:", error);
    });
}; // 改变白名单用户跟进状态数据



// 删除白名单用户
const delWhiteListDate = (id) => {
  ElMessageBox.confirm(t('是否确认删除'), t('提示'), {
    confirmButtonText: t('确定'),
    cancelButtonText:t('取消'),
    type: "warning",
  }).then(() => {
    delWhiteListDatePage(id) // 将 id 拼接为对象
      .then((res) => {
        console.log("删除成功,ID:", id);
        getWhiteUser(); // 删除成功后刷新列表
      })
      .catch((error) => {
        console.error("删除失败:", error);
        // 处理错误
      });
    proxy.$modal.msgSuccess(t('删除成功'));
  }).catch(() => { });

};

//分页
const currentPage = ref(1);
const pageSize = ref(10);
const totalRecords = ref(0);
const handleCurrentChange = (page) => {
  currentPage.value = page;
  console.log("跳转到第", currentPage.value, "页");
  getWhiteUser(page); // 获取新的数据
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1; // 重置到第一页
  getWhiteUser(); // 获取新的数据
};

// 重置 ruleForm 的内容
const resetRuleForm = () => {
  Object.keys(ruleForm).forEach((key) => {
    ruleForm[key] = ""; // 将每个属性清空
  });
};

//刷新当前数据
const refresh = () => {
  whiteListData.tel = "";
  whiteListData.traceStatus = "";
  whiteListData.loginStatus = "";
  currentPage.value = 1;
  pageSize.value = 10;
  ElMessage({
    message: t('刷新成功'),
    type: 'success',
  })
  resetRuleForm(); //重置放在前面 
  getWhiteUser(); // 重新获取数据
};

//获取 带过来的白名单组Id  groupId
const groupId = ref('');
onMounted(() => {
  groupId.value = route.query.id; // 获取路由参数中的 id
  console.log('id', groupId.value);
  getWhiteUser()
});
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