<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ t("文件名") }}</span>
            <el-input v-model="personData.fileName" class="card-input" @keyup.enter="searchEmployee"
              :placeholder="t('请输入文件名称')" />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ t("用户名") }}</span>
            <el-input v-model="personData.userName" class="card-input" @keyup.enter="searchEmployee"
              :placeholder="t('请输入用户名')" />
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
            <!-- <el-button type="primary" @click="openAddModal" size="small">
              <el-icon>
                <Plus />
              </el-icon>
              {{ $t("新增") }}
            </el-button> -->
          </div>
          <div>
            <el-tooltip effect="dark" :content="t('刷新')" placement="top">
              <el-button @click="refresh" size="small">
                <el-icon class="el-icon--right">
                  <Refresh />
                </el-icon>
                {{ t("重置") }}
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip effect="dark" :content="t('查询')" placement="top">
              <el-button type="primary" @click="searchEmployee" size="small">
                <el-icon class="el-icon--right">
                  <Search />
                </el-icon>
                {{ t("查询") }}
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table v-loading="loading" :data="tableData" style="width: 100%" class="m-b-10" size="small">
          <el-table-column prop="userName" :label="t('用户名')" />
          <el-table-column prop="fileName" :label="t('文件名称')" />
          <el-table-column prop="fileAttachmentOriginalName" :label="t('APK文件')" />
          <el-table-column prop="downloadUrlCount" :label="t('下载链接获取次数')" />
          <el-table-column prop="clickCount" :label="t('下载次数')" />
          <!-- <el-table-column prop="date" :label="t('日期')" /> -->
          <el-table-column :label="t('操作')">
            <template #default="scope">
              <el-button type="primary" size="small" @click="
                router.push({
                  path: '/downloadManagement/systemDetail',
                  query: { 
                    userName: scope.row.userName,
                    userId: scope.row.userId,
                    fileId: scope.row.fileId
                  },
                })
                ">
                {{ t("统计明细") }}
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

  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="state.modalMode == 'edit' ? t('编辑') : t('添加')" direction="rtl">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" label-position="top" :size="formSize" status-icon require-asterisk-position="right"
      :hide-required-asterisk="true">
      <el-form-item prop="fileName">
        <template #label>{{ t("文件名") }}
          <span style="color: red">*</span>
        </template>
        <el-input v-model="ruleForm.fileName" :disabled="state.modalMode == 'edit' ? true : false" />
      </el-form-item>

      <el-form-item :label="t('版本')" prop="fileVersion">
        <el-input v-model="ruleForm.fileVersion" />
      </el-form-item>
      <el-form-item :label="t('文件附件ID')" prop="fileAttachmentId">
        <el-input v-model="ruleForm.fileAttachmentId" disabled>
          <template #prefix>
            <el-icon>
              <Warning />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="fileName">
        <FileUpload :limit="1" :callback="handleFileUploaded" :modelValue="ruleForm.fileName"></FileUpload>
      </el-form-item>
      <el-form-item>
        <el-button v-if="state.modalMode === 'edit'" type="primary" @click="editPerson">{{ t("确认") }}</el-button>
        <el-button v-else type="primary" @click="setPerson">{{
          t("确认")
        }}</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
  <el-dialog v-loading="loading1" title="统计明细" v-model="state.fileDialog" width="650px" append-to-body>
    <el-table :data="fileData" style="width: 100%" class="m-b-10" size="small">
      <el-table-column prop="clickRecordId" :label="t('下载记录ID')" />
      <el-table-column prop="downloadCount" :label="t('有效期内下载次数')" />
      <el-table-column prop="downloadDate" :label="t('下载时间')" />
      <el-table-column prop="ipHomeLocation" :label="t('归属地')" />
      <el-table-column prop="requestIPAddress" :label="t('ip地址')" />
    </el-table>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from 'element-plus'
import {
  getEmployeeListPage,
} from "@/api/downloadManagement/employeeList";
import { useI18n } from "vue-i18n";

interface PersonData {
  fileName: string;
  userName: string;
  handicapId?: string;
}

interface RuleForm {
  fileName: string;
  fileAttachmentId: string;
  fileVersion: string;
  url?: string;
}

interface TableItem {
  clickCount: number;
  date: string;
  downloadUrlCount: number;
  fileAttachmentOriginalName: string;
  fileName: string;
  userName: string;
  userId: string;
  fileId: string;
}

interface FileDataItem {
  clickRecordId: string;
  downloadCount: number;
  downloadDate: string;
  ipHomeLocation: string;
  requestIPAddress: string;
}

interface DownloadUrlItem {
  userName: string;
  effectiveDuration: string;
  createTime: string;
  status: string;
  url: string;
}

interface State {
  dialogVisible: boolean;
  fileList: any[];
  fullscreen: boolean;
  groupTitle: string;
  followUp: boolean;
  modalMode: 'add' | 'edit';
  status: string;
  fileDialog: boolean;
  id: string | null;
}

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { proxy } = getCurrentInstance() as any;
const loading = ref<boolean>(true);
const loading1 = ref<boolean>(true);

const state = reactive<State>({
  dialogVisible: false,
  fileList: [],
  fullscreen: false,
  groupTitle: "",
  followUp: false,
  modalMode: "add",
  status: "",
  fileDialog: false,
  id: null
});

const personData = reactive<PersonData>({
  fileName: "",
  userName: "",
  handicapId: ""
});

const formatLabel = (value: number): string => {
  return value === 0 ? t("启用") : t("禁用");
};

const handleFileUploaded = (info: { fileAttachmentId: string, url: string }) => {
  ruleForm.fileAttachmentId = info.fileAttachmentId;
  ruleForm.url = info.url;
  console.log("文件", ruleForm.url);
};

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
    value: "Y",
    label: t("正常"),
  },
  {
    value: "N",
    label: t("停用"),
  },
  {
    value: "X",
    label: t("已删除"),
  },
];

const formSize = ref<string>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  fileName: "",
  fileAttachmentId: "",
  fileVersion: "",
});

const rules = reactive<FormRules<RuleForm>>({
  fileName: [
    { required: true, message: t("文件名") + t("不能为空"), trigger: "blur" },
  ],
  fileVersion: [
    { required: true, message: t("版本") + t("不能为空"), trigger: "blur" },
  ],
});

// 表格数据
const tableData = ref<TableItem[]>([]);
const fileData = ref<FileDataItem[]>([]);
const downloadUrlList = ref<DownloadUrlItem[]>([]);
const newUrlId = ref<string>('');

// 查询文件信息
const searchEmployee = (): void => {
  loading.value = true;
  getEmployeeListPage({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    fileName: personData.fileName,
    userName: personData.userName,
    handicapId: personData.handicapId,
  })
    .then((res) => {
      if ( res.data && res.data.records) {
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        loading.value = false;
        console.log("查询员工统计列表成功", res.data.records);
      }
    })
    .catch((error) => {
      console.error("查询员工统计列表数据失败", error);
      loading.value = false;
    });
};

// 获取员工统计列表数据
const getEmployee = (page?: number): void => {
  loading.value = true;
  getEmployeeListPage({
    currentPage: page || currentPage.value,
    pageSize: pageSize.value,
    fileName: personData.fileName,
    userName: personData.userName,
    handicapId: personData.handicapId,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        loading.value = false;
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        console.log("获取员工统计列表数据", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取员工统计列表数据失败", error);
      loading.value = false;
    });
};






//新增弹窗
const openAddModal = (): void => {
  state.modalMode = "add";
  ruleForm.fileName = "";
  ruleForm.fileAttachmentId = "";
  ruleForm.fileVersion = "";
  state.followUp = true;
};

// 检查字段是否填写并返回
const checkIn = (): boolean => {
  const fieldsToCheck = [
    { name: t("文件名"), value: ruleForm.fileName },
    { name: t('文件附件ID'), value: ruleForm.fileAttachmentId },
    { name: t("版本"), value: ruleForm.fileVersion },
  ];

  for (const field of fieldsToCheck) {
    if (
      field.value === undefined ||
      field.value === null ||
      field.value === ""
    ) {
      ElMessage(`${field.name} ` + t("不能为空"));
      return false;
    }
  }
  return true;
};

//新增文件
const setPerson = (): void => {
  if (!checkIn()) {
    return;
  }
  setPersonPage({
    fileName: ruleForm.fileName,
    fileAttachmentId: ruleForm.fileAttachmentId,
    fileVersion: ruleForm.fileVersion,
  })
    .then((res) => {
      ElMessage({
        message: t("添加成功"),
        type: "success",
      });
      getEmployee()
      console.log("新增文件数据", res.data);
      state.followUp = false;
    })
    .catch((error) => {
      console.error("新增失败:", error);
    });
};

//编辑
const selectedRowId = ref<string | null>(null);
const openEditModal = (row: TableItem): void => {
  state.modalMode = "edit";
  selectedRowId.value = row.downloadUrlId;
  ruleForm.fileName = row.fileName;
  ruleForm.fileAttachmentId = row.secretKey;
  ruleForm.fileVersion = row.currentDate;
  console.log("id", row.secretKey);

  state.followUp = true;
};

const editPerson = (): void => {
  if (!checkIn()) {
    return;
  }
  if (!selectedRowId.value) return;

  editPersonPage({
    id: selectedRowId.value,
    fileName: ruleForm.fileName,
    fileAttachmentId: ruleForm.fileAttachmentId,
    fileVersion: ruleForm.fileVersion,
  })
    .then((res) => {
      ElMessage({
        message: t("修改成功"),
        type: "success",
      });
      state.followUp = false;
      getEmployee();
      console.log("保存文件列表数据成功", res.data);
    })
    .catch((error) => {
      console.error("编辑失败:", error);
    });
};

const downLoad = (url: string): void => {
  const pathParts = url.split('/');
  const fileId = pathParts[pathParts.length - 1];
  loading1.value = true;
  const baseUrl = import.meta.env.VITE_API_URL;

  const newUrl = `${baseUrl}/${url}`;
  console.log('新链接:', newUrl);

  copyToClipboard(newUrl);

  downloadFile(fileId)
    .then((res) => {
      if (res.data) {
      }
    })
    .catch((error) => {
      console.error("获取文件列表数据失败", error);
    });
};

// 复制到剪贴板
const copyToClipboard = (text: string): void => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  ElMessage({
    message: t("复制成功"),
    type: "success",
  });
  console.log('链接已复制到剪贴板:', text);
};

// 删除文件id
const delPerson = (id: string): void => {
  ElMessageBox.confirm(t("是否确认删除"), t("提示"), {
    confirmButtonText: t("确定"),
    cancelButtonText: t("取消"),
    type: "warning",
  })
    .then(() => {
      delPersonPage(id)
        .then((res) => {
          console.log("删除成功,ID:", id);
          getEmployee();
        })
        .catch((error) => {
          console.error("删除失败:", error);
        });
      proxy.$modal.msgSuccess(t("删除成功"));
    })
    .catch(() => { });
};

// 重置 ruleForm 的内容
const resetRuleForm = (): void => {
  Object.keys(ruleForm).forEach((key) => {
    ruleForm[key as keyof RuleForm] = "";
  });
};

//分页
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const totalRecords = ref<number>(0);

const handleCurrentChange = (page: number): void => {
  currentPage.value = page;
  console.log("跳转到第", currentPage.value, "页");
  getEmployee(page);
};

const handleSizeChange = (size: number): void => {
  pageSize.value = size;
  currentPage.value = 1;
  getEmployee();
};

//刷新当前数据
const refresh = (): void => {
  personData.fileName = "";
  personData.userName = "";
  personData.handicapId = "";
  currentPage.value = 1;
  pageSize.value = 10;
  ElMessage({
    message: t("刷新成功"),
    type: "success",
  });
  resetRuleForm();
  getEmployee();
};

onMounted(() => {
  // 从路由参数中获取handicapId
  const handicapId = route.query.handicapId as string;
  if (handicapId) {
    personData.handicapId = handicapId;
  }
  getEmployee();
});
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