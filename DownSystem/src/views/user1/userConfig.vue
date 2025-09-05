<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t("用户名") }}</span>
            <el-input v-model="personData.userName" class="card-input" @keyup.enter="searchPerson"
              :placeholder="$t('请输入')" />
          </div>

          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t("角色") }}</span>
            <el-select v-model="personData.roleId" :placeholder="$t('请选择')" style="width: 240px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t("状态") }}</span>
            <el-select v-model="personData.status" :placeholder="$t('请选择')" style="width: 240px">
              <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t("Telegram用户名") }}</span>
            <el-input v-model="personData.telegramUserName" class="card-input" @keyup.enter="searchPerson"
              :placeholder="$t('请输入')" />
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
            <el-button v-if="roles != 'user'" type="primary" @click="openAddModal" size="small">
              <el-icon>
                <Plus />
              </el-icon>
              {{ $t("新增") }}
            </el-button>
          </div>
          <div>
            <el-tooltip effect="dark" :content="$t('刷新')" placement="top">
              <el-button @click="refresh" size="small">
                <el-icon class="el-icon--right">
                  <Refresh />
                </el-icon>
                {{ $t("重置") }}
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip effect="dark" :content="$t('查询')" placement="top">
              <el-button type="primary" @click="searchPerson" size="small">
                <el-icon class="el-icon--right">
                  <Search />
                </el-icon>
                {{ $t("查询") }}
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table v-loading="loading" :data="tableData" style="width: 100%" class="m-b-10" size="small">
          <el-table-column prop="id" :label="$t('ID')" />
          <el-table-column prop="userName" :label="$t('用户名')" />
          <el-table-column prop="adminName" :label="$t('所属管理员')" />
          <el-table-column prop="roleName" :label="$t('角色')">
            <template #default="scope">
              <el-tag :type="scope.row.roleName == $t('超级管理员')
                ? 'success'
                : scope.row.roleName == $t('管理员')
                  ? 'primary'
                  : 'info'
                " disable-transitions size="small">
                {{
                  scope.row.roleName == $t("超级管理员")
                    ? $t("超级管理员")
                    : scope.row.roleName == $t("管理员")
                      ? $t("管理员")
                      : $t("业务员")
                }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="$t('状态')">
            <template #default="scope">
              <el-tag :type="scope.row.status == 'Y' ? 'success' : scope.row.status == 'N' ? 'primary' : 'danger'"
                disable-transitions plain size="small">
                {{ scope.row.status == "Y" ? $t("正常") : scope.row.status == 'N' ? $t("停用") : $t("已删除") }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('关联国家')">
            <template #default="scope">
              <el-tag v-for="countryName in scope.row.countryNameList" :key="countryName" type="primary" size="small"
                class="m-r-5 m-b-5">
                {{ countryName }}
              </el-tag>
              <span v-if="!scope.row.countryNameList || scope.row.countryNameList.length === 0" class="text-gray-400">{{
                $t('暂无关联国家') }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('操作')">
            <template #default="scope">
              <!-- 编辑按钮 - 所有用户都可以看到 -->
              <el-button size="small" @click="openEditModal(scope.row)">
                {{ $t("编辑") }}
              </el-button>
              
              <!-- 修改状态按钮 - 根据角色和权限显示 -->
              <el-button v-if="shouldShowStatusButton(scope.row)" type="primary" class="" size="small" @click="updateModal(scope.row)">
                {{ $t("修改状态") }}
              </el-button>
              <br />
              
              <!-- 删除按钮 - 管理员看到自己的删除按钮时禁用 -->
              <el-button v-if="shouldShowDeleteButton(scope.row)" 
                :disabled="isAdminSelf(scope.row)"
                type="danger" 
                class="m-t-5 m-l-0" 
                size="small"
                @click="delPerson(scope.row)">
                {{ $t("删除") }}
              </el-button>
              
              <!-- 获取验证码按钮 - 非普通用户且针对业务员，或管理员针对其他管理员 -->
              <el-button class="m-t-5" 
                v-if="shouldShowVerifyCodeButton(scope.row)" 
                type="primary" 
                size="small"
                @click="getVerifyCode(scope.row.id)">
                {{ $t("获取验证码") }}
              </el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div class="u-flex u-flex-end m-t-10">
        <el-pagination :current-page="currentPage" :page-size="pageSize" :background="true"
          :layout="'total, sizes, prev, pager, next, jumper'" :total="totalRecords"
          @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 50]" @size-change="handleSizeChange" />
      </div>
    </el-col>
  </el-row>
  <!-- 验证码弹出 -->
  <el-dialog title="验证码" v-model="state.dialogVisible" width="400px" center append-to-body>
    <div class="u-flex u-flex-items-center box-card-input u-flex-center">
      <div class="">
        <span class="font-size-35">
          {{ state.verifyCode }}
        </span>
      </div>
    </div>
    <div class="u-flex u-flex-items-center box-card-input  u-flex-center">
      <span class=""> {{ $t("有效时间") }}: {{ state.effectiveDuration }}{{ $t("秒") }} </span>
    </div>
    <div class="u-flex u-flex-items-center box-card-input u-flex-center">
      <el-button type="primary" @click="copyToClipboard(state.verifyCode)" class="">{{
        $t("复制")
      }}</el-button>
    </div>

  </el-dialog>

  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="state.modalMode == 'edit' ? $t('编辑') : $t('添加')" direction="rtl">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" label-position="top" :size="formSize" status-icon require-asterisk-position="right"
      :hide-required-asterisk="true">
      <el-form-item prop="userName">
        <template #label>{{ $t("用户名") }}
          <span style="color: red">*</span>
        </template>
        <el-input v-model="ruleForm.userName" :disabled="state.modalMode == 'edit' ? true : false" />
      </el-form-item>
      <el-form-item :label="$t('Telegram用户名(多用户用,隔开)')" prop="telegramUserName">
        <el-input v-model="ruleForm.telegramUserName">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('密码')" prop="password">
        <el-input v-model="ruleForm.password">
          <template #prefix>
            <el-icon>
              <Warning />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="roleId">
        <template #label>{{ $t("角色") }}
          <span style="color: red">*</span>
        </template>
        <el-select v-model="ruleForm.roleId" :placeholder="$t('请选择')">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <!-- 国家选择 - 只有普通用户才显示 -->
      <el-form-item v-if="ruleForm.roleId === '3'" :label="$t('关联国家')" prop="countryIdList">
        <el-select v-model="ruleForm.countryIdList" multiple :placeholder="$t('请选择关联国家')" style="width: 100%"
          :loading="countryLoading" collapse-tags collapse-tags-tooltip :max-collapse-tags="5">
          <el-option v-for="country in countryList" :key="country.id" :label="country.name" :value="country.id" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button v-if="state.modalMode === 'edit'" type="primary" @click="editPerson">{{ $t("确认") }}</el-button>
        <el-button v-else type="primary" @click="setPerson">{{
          $t("确认")
        }}</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
  <el-drawer v-model="state.followUpUser" :title="$t('修改')" direction="rtl">
    <div class="m-b-10">{{ $t('状态') }}</div>
    <el-select v-model="state.status" :placeholder="$t('请选择')" size="large" class="card-input">
      <el-option v-for="item in statusEdit" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-button class="m-t-30" type="primary" size="small" @click="updateStatus">
      {{ $t('确认') }}
    </el-button>
  </el-drawer>

</template>
<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import useUserStore from "@/store/modules/user";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getPersonPage,
  setPersonPage,
  delPersonPage,
  editPersonPage,
  updateStatusPage,
  getVerifyCodePage
} from "@/api/system/personlist";
import { getCountryListPage } from "@/api/handicapManagement/countryList";
import { uploadFile } from "@/api/upload";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { proxy } = getCurrentInstance();
const router = useRouter();
const loading = ref(true);
const state = reactive({
  dialogVisible: false, // 控制弹窗显示
  fileList: [], // 存储上传的文件列表
  fullscreen: false, // 控制弹窗是否全屏
  groupTitle: "",
  followUp: false, //新增弹窗
  modalMode: "add", //新增
  followUpUser: false,  //用户状态
  status: "",
  verifyCode: null,
  effectiveDuration: ''
});
const userStore = useUserStore()
const personData = reactive({
  userName: "",
  telegramUserName: "",
  roleId: "",
  status: null,
});

const formatLabel = (value) => {
  return value === 0 ? t("启用") : t("禁用");
};
//图片上传成功回调方法
function handleFileUploaded(info) {
  ruleForm.avatar = info.url;
  console.log("图片", ruleForm.avatar);
}

const options = [
  {
    value: "1",
    label: t("超级管理员"),
  },
  {
    value: "2",
    label: t("管理员"),
  },
  {
    value: "3",
    label: t("业务员"),
  },
  // {
  //   value: "0",
  //   label: t("客服"),
  // },
];

const options1 = [
  {
    value: "1",
    label: t("超级管理员"),
  },
  {
    value: "2",
    label: t("管理员"),
  },
  {
    value: "3",
    label: t("业务员"),
  },
];
const status = [
  {
    value: "Y",
    label: t("正常"),
  },
  {
    value: "N",
    label: t("停用"),
  },
  // {
  //   value: "X",
  //   label: t("已删除"),
  // },
];
const statusEdit = [
  {
    value: "Y",
    label: t("正常"),
  },
  {
    value: "N",
    label: t("停用"),
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

const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  userName: "",
  telegramUserName: "",
  roleId: "",
  roleName: "",
  password: "",
  status: "",
  countryIdList: [], // 关联国家ID列表
});

const rules = reactive({
  userName: [
    { required: true, message: t("用户名") + t("不能为空"), trigger: "blur" },
  ],
  // telegramUserName: [
  //   { required: true, message: t("Telegram用户名") + t("不能为空"), trigger: "blur" },
  // ],
  roleId: [{ required: true, message: t('角色') + t('不能为空'), trigger: "blur" }],
  // password: [
  //   { required: true, message: t("密码") + t("不能为空"), trigger: "blur" },
  // ],
  // status: [
  //   { required: true, message: t("状态") + t("不能为空"), trigger: "blur" },
  // ],
});
const roles = ref('');
const currentUserId = ref('');
const currentUserName = ref('');

// 国家相关数据
const countryList = ref([]);
const countryLoading = ref(false);

const getUserInfo = () => {
  userStore.getInfo()
    .then((res) => {
      roles.value = res.roles[0]
      currentUserId.value = userStore.id
      currentUserName.value = userStore.name
      console.log("获取角色", roles.value);
      console.log("当前用户ID", currentUserId.value);
      console.log("当前用户名", currentUserName.value);
    })
    .catch((error) => {
      console.error("获取角色失败", error);
    });
};

// 获取国家列表
const getCountryList = () => {
  countryLoading.value = true;
  return getCountryListPage({
    currentPage: 1,
    pageSize: 100, // 获取所有国家
    name: ""
  })
    .then((res) => {
      if (res.data && res.data.records) {
        countryList.value = res.data.records;
        console.log("获取国家列表成功", res.data.records);
      }
      return res;
    })
    .catch((error) => {
      console.error("获取国家列表失败", error);
      throw error;
    })
    .finally(() => {
      countryLoading.value = false;
    });
};

// 判断是否显示删除按钮
// 判断是否为管理员自己
const isAdminSelf = (row) => {
  return roles.value === 'admin' && (row.id === currentUserId.value || row.userName === currentUserName.value);
};

// 判断是否显示修改状态按钮
const shouldShowStatusButton = (row) => {
  // root超管显示所有修改状态按钮
  if (roles.value === 'root') {
    return true;
  }

  // 普通用户不显示修改状态按钮
  if (roles.value === 'user') {
    return false;
  }

  // 管理员角色
  if (roles.value === 'admin') {
    // 管理员可以修改业务员和其他管理员的状态（包括自己）
    if (row.roleId === '3' || row.roleId === '2') {
      return true;
    }
    // 不能修改超级管理员的状态
    return false;
  }

  return false;
};

// 判断是否显示获取验证码按钮
const shouldShowVerifyCodeButton = (row) => {
  // 普通用户不显示获取验证码按钮
  if (roles.value === 'user') {
    return false;
  }

  // 超管可以看到所有用户的获取验证码按钮（包括管理员和业务员）
  if (roles.value === 'root') {
    return row.roleId === '2' || row.roleId === '3';
  }

  // 非普通用户且针对业务员显示
  if (row.roleId === '3') {
    return true;
  }

  // 管理员针对其他管理员也显示获取验证码按钮
  if (roles.value === 'admin' && row.roleId === '2') {
    return true;
  }

  return false;
};

const shouldShowDeleteButton = (row) => {
  // root超管显示所有删除按钮
  if (roles.value === 'root') {
    return true;
  }

  // 下级员工(业务员)不显示删除按钮
  if (roles.value === 'user') {
    return false;
  }

  // 管理员角色
  if (roles.value === 'admin') {
    // 管理员可以看到业务员和其他管理员的删除按钮（包括自己，但会被禁用）
    if (row.roleId === '3' || row.roleId === '2') {
      return true;
    }
    // 不能删除超级管理员
    return false;
  }

  return false;
};

//获取验证码
const getVerifyCode = (id) => {
  getVerifyCodePage(
    id
  )
    .then((res) => {
      state.dialogVisible = true
      state.verifyCode = res.data.verifyCode
      state.effectiveDuration = res.data.effectiveDuration
      // ElMessage({
      //   message: t("获取成功"),
      //   type: "success",
      // });
    })
    .catch((error) => {
      console.error("获取失败:", error);
    });
};

// 复制到剪贴板的函数
const copyToClipboard = (text) => {
  // 创建一个隐藏的 textarea 元素
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);

  // 选择文本并执行复制
  textArea.select();
  document.execCommand('copy');

  // 删除临时的 textarea 元素
  document.body.removeChild(textArea);
  ElMessage({
    message: t("复制成功"),
    type: "success",
  });
  submitUpload();
  console.log('链接已复制到剪贴板:', text);
};

//查询用户信息

const searchPerson = () => {
  loading.value = true;
  getPersonPage({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    userName: personData.userName,
    telegramUserName: personData.telegramUserName,
    roleId: personData.roleId,
    status: personData.status,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        loading.value = false;
        console.log("查询用户列表成功", res.data.records);
      }
    })
    .catch((error) => {
      console.error("查询用户列表数据失败", error);
    });
};

const tableData = ref([]);
// 获取用户列表数据
const getPerson = () => {
  loading.value = true;
  getPersonPage({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    roleId: personData.roleId,
    roleName: personData.roleName,
    userName: personData.userName,
    telegramUserName: personData.telegramUserName,
    id: personData.id,
    status: personData.status,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        loading.value = false;
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        console.log("获取用户列表数据", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取用户列表数据失败", error);
    });
};
//新增弹窗
const openAddModal = () => {
  state.modalMode = "add";
  ruleForm.userName = "";
  ruleForm.telegramUserName = "";
  ruleForm.roleId = "";
  ruleForm.roleName = "";
  ruleForm.password = "";
  ruleForm.status = null;
  ruleForm.countryIdList = []; // 重置国家选择
  getCountryList(); // 获取国家列表
  state.followUp = true;
};
// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称
  const fieldsToCheck = [
    { name: t("用户名"), value: ruleForm.userName },
    // { name: t("Telegram用户名"), value: ruleForm.telegramUserName },
    // { name: t('头像'), value: ruleForm.avatar },
    { name: t("密码"), value: ruleForm.password },
    { name: t("角色"), value: ruleForm.roleId },
    // { name: t("状态"), value: ruleForm.status },
  ];
  // 检查字段是否为空
  for (const field of fieldsToCheck) {
    if (
      field.value === undefined ||
      field.value === null ||
      field.value === ""
    ) {
      ElMessage(`${field.name} ` + t("不能为空"));
      return false; // 返回 false 表示检查失败
    }
  }
  return true; // 所有字段都已填写
};
//新增用户
const setPerson = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setPersonPage({
    userName: ruleForm.userName,
    telegramUserName: ruleForm.telegramUserName,
    roleId: ruleForm.roleId,
    roleName: ruleForm.roleName,
    status: ruleForm.status,
    password: ruleForm.password,
    countryIdList: ruleForm.countryIdList, // 添加国家ID列表
  })
    .then((res) => {
      ElMessage({
        message: t("添加成功"),
        type: "success",
      });
      getPerson();
      console.log("新增用户数据", res.data);
      state.followUp = false;
    })
    .catch((error) => {
      console.error("新增失败:", error);
    });
};

//编辑
const selectedRowId = ref(null); // ID of the row being edited
const openEditModal = (row) => {
  state.modalMode = "edit";
  selectedRowId.value = row.id;
  ruleForm.userName = row.userName;
  ruleForm.telegramUserName = row.telegramUserName;
  ruleForm.password = row.password;
  ruleForm.roleName = row.roleName;
  ruleForm.roleId = row.roleId;
  ruleForm.countryIdList = row.countryIdList || []; // 设置用户的国家选择
  getCountryList(); // 获取国家列表
  state.followUp = true;
};

const editPerson = () => {
  // if (!checkIn()) {
  //   return; // 如果字段检查失败，则不继续执行
  // }
  editPersonPage({
    id: selectedRowId.value,
    userName: ruleForm.userName,
    telegramUserName: ruleForm.telegramUserName,
    password: ruleForm.password,
    roleName: ruleForm.roleName,
    roleId: ruleForm.roleId,
    countryIdList: ruleForm.countryIdList, // 添加国家ID列表
  })
    .then((res) => {
      ElMessage({
        message: t("修改成功"),
        type: "success",
      });
      state.followUp = false;
      getPerson();
      console.log("保存用户列表数据成功", res.data);
    })
    .catch((error) => {
      console.error("编辑失败:", error);
    });
};
const updateModal = (row) => {
  selectedRowId.value = row.id;
  ruleForm.userName = row.userName;
  state.status = row.status;
  state.followUpUser = true;
};
// 修改用户状态
const updateStatus = () => {
  updateStatusPage({
    userId: selectedRowId.value,
    userName: ruleForm.userName,
    roleName: ruleForm.roleName,
    status: state.status,
  })
    .then((res) => {
      ElMessage({
        message: t("修改成功"),
        type: "success",
      });
      state.followUpUser = false;
      getPerson();
      console.log("保存用户列表数据成功", res.data);
    })
    .catch((error) => {
      console.error("编辑失败:", error);
    });
};

// 删除用户id
const delPerson = (row) => {
  ElMessageBox.confirm(t("是否确认删除"), t("提示"), {
    confirmButtonText: t("确定"),
    cancelButtonText: t("取消"),
    type: "warning",
  })
    .then(() => {
      updateStatusPage({
        userId: row.id,
        status: "X",
        userName: row.userName,
      })
        .then((res) => {
          getPerson();
          proxy.$modal.msgSuccess(t("删除成功"));
        })
        .catch((error) => {
          console.error("删除失败:", error);
        });
    })
    .catch(() => { });
};


// 重置 ruleForm 的内容
const resetRuleForm = () => {
  Object.keys(ruleForm).forEach((key) => {
    ruleForm[key] = ""; // 将每个属性清空
  });
};

//分页
const currentPage = ref(1);
const pageSize = ref(10);
const totalRecords = ref(0);
const handleCurrentChange = (page) => {
  currentPage.value = page;
  console.log("跳转到第", currentPage.value, "页");
  getPerson(page); // 获取新的数据
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1; // 重置到第一页
  getPerson(); // 获取新的数据
};
//刷新当前数据
const refresh = () => {
  personData.roleId = "";
  personData.userName = "";
  personData.telegramUserName = "";
  personData.status = null;
  currentPage.value = 1;
  pageSize.value = 10;
  ElMessage({
    message: t("刷新成功"),
    type: "success",
  });
  resetRuleForm(); //重置放在前面 提前情况status的状态再刷新数据
  getPerson(); // 重新获取数据
};

// 监听角色变化，当选择管理员角色时清空国家选择，并设置roleName
watch(() => ruleForm.roleId, (newRoleId) => {
  // 如果选择的不是普通用户（roleId !== '3'），则清空国家选择
  if (newRoleId !== '3') {
    ruleForm.countryIdList = [];
  }

  // 根据roleId设置对应的roleName
  const roleMap = {
    '1': '超级管理员',
    '2': '管理员',
    '3': '业务员'
  };
  ruleForm.roleName = roleMap[newRoleId] || '';
});

onMounted(() => {
  getPerson();
  getUserInfo();
});
</script>
<style lang="scss">
.box-card-input {
  // width:300px;
  margin-bottom: 10px;

  .card-title {
    width: 120px;
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

.el-dialog:not(.is-fullscreen) {
  margin-top: 30vh !important
}
</style>