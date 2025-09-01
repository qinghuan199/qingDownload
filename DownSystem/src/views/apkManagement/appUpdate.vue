<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
              <span class="card-title"> {{ $t("文件名") }}</span>
              <el-input
                v-model="personData.fileName"
                class="card-input"
                :placeholder="$t('请输入')"
                :suffix-icon="Calendar"
              />
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
            <el-button type="primary" v-if="state.field" @click="getNewDownId(state.field)" size="small">
              <el-icon>
                <Plus />
              </el-icon>
              {{ $t("生成新下载链接") }}
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
        <el-table v-loading="loading" :data="downloadUrlList" style="width: 100%" class="m-b-10" size="small">
          <!-- <el-table-column prop="id" :label="$t('文件ID')" /> -->
          <el-table-column prop="fileName" :label="$t('文件名')" />
          <el-table-column prop="attachmentName" :label="$t('安装包名')" />
          <el-table-column prop="userName" :label="$t('创建人')" />
          <el-table-column prop="effectiveDuration" :label="$t('有效时长')" :formatter="formatEffectiveDuration" />
          <el-table-column prop="createTime" :label="$t('创建时间')" />
          <el-table-column prop="status" :label="$t('状态')">
            <template #default="scope">
              <el-tag :type="scope.row.status == 'Y' ? 'success' : scope.row.status == 'N' ? 'primary' : 'danger'"
                disable-transitions plain size="small">
                {{ scope.row.status == "Y" ? $t("正常") : scope.row.status == 'N' ? $t("失效") : $t("已删除") }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('下载')">
            <template #default="scope">
              <el-button v-if="scope.row.status == 'Y'" type="primary" @click="downLoad(scope.row.url)">{{ $t("复制链接") }}</el-button>
            </template>

          </el-table-column>
          <!-- <el-table-column prop="roleName" :label="$t('角色')">
            <template #default="scope">
              <el-tag :type="scope.row.roleName == $t('超级管理员')
                  ? 'success'
                  : scope.row.roleName == $t('普通角色')
                    ? 'primary'
                    : 'default'
                " disable-transitions size="small">
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
-->
          <!-- <el-table-column prop="status" :label="$t('状态')">
            <template #default="scope">
              <el-tag :type="scope.row.status == 'Y' ? 'success' : scope.row.status == 'N' ? 'primary' : 'danger'"
                disable-transitions plain size="small">
                {{ scope.row.status == "Y" ? $t("正常") : scope.row.status == 'N' ? $t("停用") : $t("已删除") }}
              </el-tag>
            </template>
          </el-table-column> -->
          <!-- <el-table-column :label="$t('操作')">
            <template #default="scope">
              <el-button size="small" @click="openEditModal(scope.row)">
                {{ $t("编辑") }}
              </el-button>
              <el-button type="primary" size="small" @click="state.fileDialog = true, getPersonId(scope.row.id)">
                {{ $t("查看详情") }}
              </el-button>
              <el-button type="primary" size="small" @click="state.dialogVisible = true, getDownId(scope.row.id)">
                {{ $t("生成文件下载链接") }}
              </el-button>
            </template>
          </el-table-column> -->
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
  <el-drawer v-model="state.followUp" :title="state.modalMode == 'edit' ? $t('编辑') : $t('添加')" direction="rtl">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" label-position="top" :size="formSize" status-icon require-asterisk-position="right"
      :hide-required-asterisk="true">
      <el-form-item prop="fileName">
        <template #label>{{ $t("文件名") }}
          <span style="color: red">*</span>
        </template>
        <el-input v-model="ruleForm.fileName" :disabled="state.modalMode == 'edit' ? true : false" />
      </el-form-item>

      <el-form-item :label="$t('版本')" prop="fileVersion">
        <el-input v-model="ruleForm.fileVersion" />
      </el-form-item>
      <!-- <el-form-item prop="status">
        <template #label>{{ $t("状态") }}
          <span style="color: red">*</span>
        </template>
        <el-select v-model="ruleForm.status" :placeholder="$t('请选择')">
          <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item> -->
      <el-form-item :label="$t('文件附件ID')" prop="fileAttachmentId">
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
        <el-button v-if="state.modalMode === 'edit'" type="primary" @click="editPerson">{{ $t("确认") }}</el-button>
        <el-button v-else type="primary" @click="setPerson">{{
          $t("确认")
        }}</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
  <el-dialog v-loading="loading1" title="文件详情" v-model="state.fileDialog" width="650px" append-to-body>
    <el-table :data="fileData" style="width: 100%" class="m-b-10" size="small">
      <el-table-column prop="id" :label="$t('ID')" />
      <el-table-column prop="fileAttachmentName" :label="$t('文件名')" />
      <el-table-column prop="fileAttachmentOriginalName" :label="$t('原始文件名')" />
      <el-table-column prop="fileSize" :label="$t('文件大小')" />
      <el-table-column prop="fileType" :label="$t('文件类型')" />
      <el-table-column prop="fileVersion" :label="$t('版本号')" />
      <el-table-column prop="createTime" :label="$t('创建时间')" />
      <el-table-column prop="status" :label="$t('状态')">
        <template #default="scope">
          <el-tag :type="scope.row.status == 'Y' ? 'success' : scope.row.status == 'N' ? 'primary' : 'danger'"
            disable-transitions plain size="small">
            {{ scope.row.status == "Y" ? $t("正常") : scope.row.status == 'N' ? $t("停用") : $t("已删除") }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-button  type="primary" @click="state.fileDialog=false">{{
          $t("关闭")
        }}</el-button> -->
  </el-dialog>
  <!-- dialog弹窗 -->
  <el-dialog title="文件下载链接" v-model="state.dialogVisible" width="600px" append-to-body>
    <el-table :data="downloadUrlList" style="width: 100%" class="m-b-10" size="small">
      <!-- <el-table-column prop="fileId" :label="$t('文件ID')" /> -->
      <el-table-column prop="userName" :label="$t('创建人')" />
      <!-- <el-table-column prop="url" :label="$t('下载链接')" /> -->
      <el-table-column prop="effectiveDuration" :label="$t('有效时长')"  :formatter="formatEffectiveDuration" />
      <el-table-column prop="createTime" :label="$t('创建时间')" />
      <el-table-column prop="status" :label="$t('状态')">
        <template #default="scope">
          <el-tag :type="scope.row.status == 'Y' ? 'success' : scope.row.status == 'N' ? 'primary' : 'danger'"
            disable-transitions plain size="small">
            {{ scope.row.status == "Y" ? $t("正常") : scope.row.status == 'N' ? $t("停用") : $t("已删除") }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('下载')">
        <template #default="scope">
          <el-button type="primary" @click="downLoad(scope.row.url)">{{ $t("复制链接") }}</el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-button type="primary" @click="getNewDownId(state.id)">{{
      $t("生成新连接")
    }}</el-button>
  </el-dialog>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getPersonPage,
  setPersonPage,
  delPersonPage,
  editPersonPage,
  getPersonIdPage,
  getDownIdPage,
  getFileDownloadUrlListPage,
  downloadFile
} from "@/api/apkManagement/apkList";
import { uploadFile } from "@/api/upload";
import { useI18n } from "vue-i18n";
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { proxy } = getCurrentInstance();
const loading = ref(true);
const loading1 = ref(true);
const state = reactive({
  dialogVisible: false, // 控制弹窗显示
  fileList: [], // 存储上传的文件列表
  fullscreen: false, // 控制弹窗是否全屏
  groupTitle: "",
  followUp: false, //新增弹窗
  modalMode: "add", //新增
  status: "",
  fileDialog: false,
  id: null,
  field: null

});
const personData = reactive({
  status: "",
  fileName:''
});

const formatLabel = (value) => {
  return value === 0 ? t("启用") : t("禁用");
};
//文件上传成功回调方法
const handleFileUploaded = (info) => {
  ruleForm.fileAttachmentId = info.fileAttachmentId;
  ruleForm.url = info.url;
  // ruleForm.fileName = info.fileName;
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
    label: t("失效"),
  },
  // {
  //   value: "X",
  //   label: t("已删除"),
  // },
];
const formatEffectiveDuration=(row, column, cellValue) =>{
    return `${cellValue}秒`;  // 在有效时长后添加 "s"
  };

const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  fileName: "",
  fileAttachmentId: "",
  fileVersion: "",
});

const rules = reactive({
  fileName: [
    { required: true, message: t("文件名") + t("不能为空"), trigger: "blur" },
  ],
  // fileAttachmentId: [
  //   { required: true, message: t("文件附件") + t("不能为空"), trigger: "blur" },
  // ],
  fileVersion: [
    { required: true, message: t("版本") + t("不能为空"), trigger: "blur" },
  ],
});

//查询文件信息

const searchPerson = () => {
  loading.value = true;
  getFileDownloadUrlListPage({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    status: personData.status,
    fileName: personData.fileName,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        loading.value = false;
        getFileDownloadUrlList();
        console.log("查询文件列表成功", res.data.records);
      }
    })
    .catch((error) => {
      console.error("查询文件列表数据失败", error);
    });
};

const tableData = ref([]);
// 获取文件列表数据
const getPerson = () => {
  loading.value = true;
  getPersonPage({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    status: personData.status,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        loading.value = false;
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        console.log("获取文件列表数据", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取文件列表数据失败", error);
    });
};
const fileData = ref([]);
// 获取文件详情数据
const getPersonId = (id) => {
  loading1.value = true;
  getPersonIdPage(id)
    .then((res) => {
      if (res.data) {
        loading1.value = false;
        fileData.value = [res.data];
        console.log("获取文件详情数据", res.data);
      }
    })
    .catch((error) => {
      console.error("获取文件列表数据失败", error);
    });
};

// 生成文件下载链接
const newUrlId = ref('')
const getDownId = (id) => {
  loading1.value = true;
  getDownIdPage(id)
    .then((res) => {
      if (res.data) {
        loading1.value = false;
        fileData.value = [res.data];
        newUrlId.value = id;
        state.id = id;
        getFileDownloadUrlList(id)
        console.log("获取文件详情数据", res.data);
      }
    })
    .catch((error) => {
      console.error("获取文件列表数据失败", error);
    });
};
// 生成新的下载链接
const getNewDownId = (id) => {
  loading1.value = true;
  getDownIdPage(id)
    .then((res) => {
      if (res.data) {
        loading1.value = false;
        newUrlId.value = id;
        fileData.value = [res.data];
        getFileDownloadUrlList(id)
        console.log("获取文件详情数据", res.data);
      }
    })
    .catch((error) => {
      console.error("获取文件列表数据失败", error);
    });
};
const downloadUrlList = ref([]);
// 获取下载链接列表数据
const getFileDownloadUrlList = () => {
  loading.value = true;
  getFileDownloadUrlListPage({
    currentPage: currentPage.value,
    fileName: personData.fileName,
    status: personData.status,
    pageSize: pageSize.value,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        loading.value = false;
        downloadUrlList.value = res.data.records;
        totalRecords.value = res.data.total;
        console.log("获取文件列表数据", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取文件列表数据失败", error);
    });
};
//新增弹窗
const openAddModal = () => {
  state.modalMode = "add";
  (ruleForm.fileName = ""),
    (ruleForm.fileAttachmentId = ""),
    (ruleForm.fileVersion = ""),
    (state.followUp = true);
};
// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称
  const fieldsToCheck = [
    { name: t("文件名"), value: ruleForm.fileName },
    { name: t('文件附件ID'), value: ruleForm.fileAttachmentId },
    { name: t("版本"), value: ruleForm.fileVersion },
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
//新增文件
const setPerson = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
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
      getPerson()
      console.log("新增文件数据", res.data);
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
  ruleForm.fileName = row.fileName;
  ruleForm.fileAttachmentId = row.fileAttachmentId;
  ruleForm.fileVersion = row.fileVersion;
  console.log("id", row.fileAttachmentId);

  state.followUp = true;
};

const editPerson = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
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
      getPerson();
      console.log("保存文件列表数据成功", res.data);
    })
    .catch((error) => {
      console.error("编辑失败:", error);
    });
};


const downLoad = (url) => {
  const pathParts = url.split('/');
  const fileId = pathParts[pathParts.length - 1];
  loading1.value = true;
  // const baseUrl = import.meta.env.VITE_API_URL;

  // 拼接新链接
  // const newUrl = `${baseUrl}/${url}`;
  const newUrl = `${url}`;
  console.log('新链接:', newUrl);

  // 复制到剪贴板
  copyToClipboard(newUrl);

  // downloadFile(fileId)
  //   .then((res) => {
  //     if (res.data) {
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("获取文件列表数据失败", error);
  //   });
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
  console.log('链接已复制到剪贴板:', text);
};






// 删除文件id
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
  getFileDownloadUrlList(page); // 获取新的数据
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1; // 重置到第一页
  getFileDownloadUrlList(); // 获取新的数据
  console.log("11111", 111);

};

//刷新当前数据
const refresh = () => {
  personData.fileName = "";
  personData.status = "";
  currentPage.value = 1;
  pageSize.value = 10;
  ElMessage({
    message: t("刷新成功"),
    type: "success",
  });
  resetRuleForm(); //重置放在前面 提前情况status的状态再刷新数据
  getFileDownloadUrlList() // 重新获取数据
};
onMounted(() => {
  state.field = route.query.id;
  console.log("带过来的id", state.field);
  getFileDownloadUrlList()
});

</script>
<style lang="scss" scoped>
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
