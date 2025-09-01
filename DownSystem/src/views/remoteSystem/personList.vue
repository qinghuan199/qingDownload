<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t("账号") }}</span>
            <el-input
              v-model="personData.userName"
              class="card-input"
              :placeholder="$t('请输入')"
              :suffix-icon="Calendar"
            />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t("角色") }}</span>
            <el-select
              v-model="personData.roleId"
              :placeholder="$t('请选择')"
              style="width: 240px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t("状态") }}</span>
            <el-select
              v-model="personData.status"
              :placeholder="$t('请选择')"
              style="width: 240px"
            >
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
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
                  <Refresh />
                </el-icon>
                {{ $t("查询") }}
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          class="m-b-10"
          size="small"
        >
          <el-table-column prop="userId" :label="$t('ID')" />
          <el-table-column prop="userName" :label="$t('账号')" />
          <el-table-column prop="sourcePwd" :label="$t('密码')" />
          <el-table-column prop="createTime" :label="$t('创建时间')" />
          <el-table-column prop="loginIp" :label="$t('登录IP')" />
          <el-table-column prop="roleName" :label="$t('角色')">
            <template #default="scope">
              <el-tag
                :type="
                  scope.row.roleName == $t('超级管理员')
                    ? 'success'
                    : scope.row.roleName == $t('普通角色')
                    ? 'primary'
                    : 'default'
                "
                disable-transitions
                size="small"
              >
                {{
                  scope.row.roleName == $t("超级管理员")
                    ? $t("超级管理员")
                    : scope.row.roleName == $t("普通角色")
                    ? $t("普通角色")
                    : $t("客服")
                }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="$t('在线状态')">
            <template #default="scope">
              <el-tag
                :type="scope.row.status == 0 ? 'primary' : 'danger'"
                disable-transitions
                plain
                size="small"
              >
                {{ scope.row.status == 0 ? $t("启用") : $t("禁用") }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('操作')">
            <template #default="scope">
              <el-button size="small" @click="openEditModal(scope.row)">
                {{ $t("编辑") }}
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="delPerson(scope.row.userId)"
              >
                {{ $t("删除") }}
              </el-button>
              <el-button
                type="primary"
                size="small"
                @click="state.dialogVisible = true"
              >
                {{ $t("查看验证码") }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div class="u-flex u-flex-end m-t-10">
        <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
          :background="true"
          :layout="'total, sizes, prev, pager, next, jumper'"
          :total="totalRecords"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 50]"
          @size-change="handleSizeChange"
        />
      </div>
    </el-col>
  </el-row>

  <!-- 新增弹窗 -->
  <el-drawer
    v-model="state.followUp"
    :title="state.modalMode == 'edit' ? $t('编辑') : $t('添加')"
    direction="rtl"
  >
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      label-position="top"
      :size="formSize"
      status-icon
      require-asterisk-position="right"
      :hide-required-asterisk="true"
    >
      <el-form-item prop="userName">
        <template #label
          >{{ $t("账号") }}
          <span style="color: red">*</span>
        </template>
        <el-input
          v-model="ruleForm.userName"
          :disabled="state.modalMode == 'edit' ? true : false"
        />
      </el-form-item>
      <el-form-item :label="$t('头像')" prop="name">
        <!-- <el-upload
          class="avatar-uploader"
          :show-file-list="true"
          action="/resApi/sysPage/uploadFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload> -->
        <imageUpload
          :limit="1"
          :callback="handleFileUploaded"
          :modelValue="ruleForm.avatar"
        ></imageUpload>
      </el-form-item>
      <el-form-item :label="$t('密码')" prop="pwd">
        <el-input v-model="ruleForm.pwd">
          <template #prefix>
            <el-icon>
              <Warning />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="status">
        <template #label
          >{{ $t("状态") }}
          <span style="color: red">*</span>
        </template>
        <el-select v-model="ruleForm.status" :placeholder="$t('请选择')">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          v-if="state.modalMode === 'edit'"
          type="primary"
          @click="editPerson"
          >{{ $t("确认") }}</el-button
        >
        <el-button v-else type="primary" @click="setPerson">{{
          $t("确认")
        }}</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getPersonPage,
  setPersonPage,
  delPersonPage,
  getRolePage,
  editPersonPage,
} from "@/api/system/personlist";
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
});
const personData = reactive({
  userName: "",
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
    label: t("普通角色"),
  },
  {
    value: "0",
    label: t("客服"),
  },
];
const status = [
  {
    value: "1",
    label: t("禁用"),
  },
  {
    value: "0",
    label: t("启用"),
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
  avatar: "",
  pwd: "",
  status: "",
});

const rules = reactive({
  userName: [
    { required: true, message: t("名称") + t("不能为空"), trigger: "blur" },
  ],
  // avatar: [{ required: true, message:t('头像') + t('不能为空'), trigger: "blur" }],
  pwd: [
    { required: true, message: t("密码") + t("不能为空"), trigger: "blur" },
  ],
  status: [
    { required: true, message: t("状态") + t("不能为空"), trigger: "blur" },
  ],
});

//查询人员信息

const searchPerson = () => {
  loading.value = true;
  getPersonPage({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    userName: personData.userName,
    roleId: personData.roleId,
    status: personData.status,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        loading.value = false;
        console.log("查询人员列表成功", res.data.records);
      }
    })
    .catch((error) => {
      console.error("查询人员列表数据失败", error);
    });
};

const tableData = ref([]);
// 获取人员列表数据
const getPerson = () => {
  loading.value = true;
  getPersonPage({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    userName: personData.userName,
    roleId: personData.roleId,
    status: personData.status,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        loading.value = false;
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        console.log("获取人员列表数据", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取人员列表数据失败", error);
    });
};
//新增弹窗
const openAddModal = () => {
  state.modalMode = "add";
  (ruleForm.userName = ""),
    (ruleForm.pwd = ""),
    (ruleForm.status = null),
    (ruleForm.avatar = ""),
    (state.followUp = true);
};
// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称
  const fieldsToCheck = [
    { name: t("名称"), value: ruleForm.userName },
    // { name: t('头像'), value: ruleForm.avatar },
    { name: t("密码"), value: ruleForm.pwd },
    { name: t("状态"), value: ruleForm.status },
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
//新增员工
const setPerson = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setPersonPage({
    userName: ruleForm.userName,
    pwd: ruleForm.pwd,
    status: ruleForm.status,
    avatar: ruleForm.avatar,
  })
    .then((res) => {
      ElMessage({
        message: t("添加成功"),
        type: "success",
      });
      console.log("新增员工数据", res.data);
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
  selectedRowId.value = row.userId;
  ruleForm.userName = row.userName;
  ruleForm.avatar = row.avatar;
  ruleForm.pwd = row.pwd;
  ruleForm.status = row.status;
  state.followUp = true;
};

const editPerson = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  editPersonPage({
    userId: selectedRowId.value,
    userName: ruleForm.userName,
    pwd: ruleForm.pwd,
    avatar: ruleForm.avatar,
    status: ruleForm.status,
  })
    .then((res) => {
      ElMessage({
        message: t("修改成功"),
        type: "success",
      });
      state.followUp = false;
      getPerson();
      console.log("保存人员列表数据成功", res.data);
    })
    .catch((error) => {
      console.error("编辑失败:", error);
    });
};

// 删除人员id
const delPerson = (id) => {
  ElMessageBox.confirm(t("是否确认删除"), t("提示"), {
    confirmButtonText: t("确定"),
    cancelButtonText: t("取消"),
    type: "warning",
  })
    .then(() => {
      delPersonPage(id) // 将 id 拼接为对象
        .then((res) => {
          console.log("删除成功,ID:", id);
          getPerson(); // 删除成功后刷新列表
        })
        .catch((error) => {
          console.error("删除失败:", error);
          // 处理错误
        });
      proxy.$modal.msgSuccess(t("删除成功"));
    })
    .catch(() => {});
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

onMounted(() => {
  getPerson();
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
