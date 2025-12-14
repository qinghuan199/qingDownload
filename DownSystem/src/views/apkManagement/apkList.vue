<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t("银行名称") }}</span>
            <el-input v-model="personData.fileName" class="card-input" @keyup.enter="searchPerson"
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
            <el-button v-if="roles === 'root'" type="primary" @click="openAddModal" size="small">
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
          <el-table-column prop="fileName" :label="$t('银行名称')" />
          <el-table-column :label="$t('关联国家')">
            <template #default="scope">
              <el-tag v-for="country in scope.row.countryList" :key="country.id" type="info" size="small"
                class="m-r-5 m-b-5">
                {{ country.name }}
              </el-tag>
              <span v-if="!scope.row.countryList || scope.row.countryList.length === 0" class="text-gray-400">{{
                $t('暂无关联国家') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fileSize" :label="$t('文件大小')" />
          <el-table-column prop="fileType" :label="$t('文件类型')" />
          <el-table-column prop="fileVersion" :label="$t('版本号')" />
          <el-table-column prop="createTime" :label="$t('创建时间')" />
          <el-table-column prop="lastUploadTime" :label="$t('最后上传时间')" />
          <el-table-column prop="status" :label="$t('状态')">
            <template #default="scope">
              <el-tag :type="scope.row.status == 'Y' ? 'success' : scope.row.status == 'N' ? 'primary' : 'danger'"
                disable-transitions plain size="small">
                {{ scope.row.status == "Y" ? $t("正常") : scope.row.status == 'N' ? $t("停用") : $t("已删除") }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column :label="$t('APK是否可见')">
            <template #default="scope">
              <el-switch v-if="roles === 'root'" v-model="scope.row.displayStatus" :active-value="'Y'"
                :inactive-value="'N'" @change="handleDisplayStatusChange(scope.row)" />
              <el-switch v-else v-model="scope.row.displayStatus" :active-value="'Y'" :inactive-value="'N'" disabled />
            </template>
          </el-table-column>
          <el-table-column width="180" :label="$t('操作')">
            <template #default="scope">
              <el-button size="small" v-if="roles === 'root'" @click="openEditModal(scope.row)">
                {{ $t("编辑") }}
              </el-button>
              <el-button type="primary" size="small" @click="state.fileDialog = true, getPersonId(scope.row.id)">
                {{ $t("查看详情") }}
              </el-button>
              <el-button class="m-l-0 m-t-5" v-if="roles === 'root'" type="danger" size="small"
                @click="delPerson(scope.row.id)">
                {{ $t("删除") }}
              </el-button>
              <el-button class=" m-t-5" type="primary" size="small" @click="state.show = true, getDownId(scope.row.id)">
                {{ $t("生成下载链接") }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- <div class="u-flex u-flex-end m-t-10">
        <el-pagination :current-page="currentPage" :page-size="pageSize" :background="true"
          :layout="'total, sizes, prev, pager, next, jumper'" :total="totalRecords"
          @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 50]" @size-change="handleSizeChange" />
      </div> -->
    </el-col>
  </el-row>

  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="state.modalMode == 'edit' ? $t('编辑') : $t('添加')" direction="rtl">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" label-position="top" :size="formSize" status-icon require-asterisk-position="right"
      :hide-required-asterisk="true">
      <el-form-item :label="$t('银行名称')" prop="fileName">
        <!-- <template #label>{{ $t("银行名称") }}
          <span style="color: red">*</span>
        </template> -->
        <el-input v-model="ruleForm.fileName" />
        <!-- <el-input v-model="ruleForm.fileName" :disabled="state.modalMode == 'edit' ? true : false" /> -->
      </el-form-item>
      <el-form-item :label="$t('版本')" prop="fileVersion">
        <el-input v-model="ruleForm.fileVersion" />
      </el-form-item>
      <el-form-item :label="$t('选择国家')" prop="countryIdList">
        <el-select v-model="ruleForm.countryIdList" multiple :placeholder="$t('请选择国家')" style="width: 100%" :loading="countryLoading"
          clearable collapse-tags collapse-tags-tooltip :max-collapse-tags="5">
          <el-option v-for="country in countryList" :key="country.id" :label="country.name" :value="country.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="uploadType">
        <template #label>{{ $t("文件上传类型") }}
        </template>
        <el-select v-model="ruleForm.uploadType" :placeholder="$t('请选择')">
          <el-option v-for="item in uploadType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="ruleForm.uploadType == 1" :label="$t('下载链接')" prop="downloadUrl">
        <el-input v-model="ruleForm.downloadUrl" />
      </el-form-item>
      <el-form-item v-if="ruleForm.uploadType == 0" :label="$t('文件附件ID')" prop="fileAttachmentId">
        <el-input v-model="ruleForm.fileAttachmentId" disabled>
          <template #prefix>
            <el-icon>
              <Warning />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="ruleForm.uploadType == 0" prop="url">
        <el-upload class="upload-demo" :class="fileList.length > 0 ? 'hide-upload-button' : ''" :action="uploadUrl"
          :on-progress="handleProgress" :on-success="handleSuccess" :on-error="handleError" :on-remove="handleRemove"
          :before-upload="beforeUpload" :headers="headers" :limit="1" :file-list="fileList">
          <el-button type="primary" v-if="fileList.length === 0">{{ $t('点击上传') }}</el-button>
          <template #tip>
            <div class="el-upload__tip">
              {{ $t('支持上传apk文件，单个文件不超过1GB') }}
            </div>
          </template>
        </el-upload>
        <el-progress v-if="uploadProgress > 0 && uploadProgress < 100" :percentage="uploadProgress"
          :format="percentageFormat" status="success" />
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
      <el-table-column prop="fileName" :label="$t('银行名称')" />
      <el-table-column :label="$t('关联国家')">
        <template #default="scope">
          <el-tag v-for="country in scope.row.countryList" :key="country.id" type="info" size="small"
            class="m-r-5 m-b-5">
            {{ country.name }}
          </el-tag>
          <span v-if="!scope.row.countryList || scope.row.countryList.length === 0" class="text-gray-400">{{
            $t('暂无关联国家') }}</span>
        </template>
      </el-table-column>
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
  <el-dialog title="新下载链接地址" v-model="state.show" class="text-center" width="600px" append-to-body>
    <div class="font-size-18 font-bold">
      {{ state.newUrl }}
    </div>
    <div class="font-size-13 m-t-10">
      {{ $t("有效时间") }}: {{ state.time }} {{ $t("秒") }}
    </div>
    <el-button type="primary" class="m-t-10" @click="copyToClipboard(state.newUrl)">{{
      $t("复制")
      }}</el-button>
  </el-dialog>
  <el-dialog title="文件下载链接" v-model="state.dialogVisible" width="600px" append-to-body>
    <el-table :data="downloadUrlList" style="width: 100%" class="m-b-10" size="small">
      <!-- <el-table-column prop="fileId" :label="$t('文件ID')" /> -->
      <el-table-column prop="userName" :label="$t('创建人')" />
      <!-- <el-table-column prop="url" :label="$t('下载链接')" /> -->
      <el-table-column prop="effectiveDuration" :label="$t('有效时长')" />
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
  updateFileDisplayStatusPage,
  downloadFile
} from "@/api/apkManagement/apkList";
import { getCountryListPage } from "@/api/handicapManagement/countryList";
import { getInfo } from "@/api/login";
import useUserStore from "@/store/modules/user";
import { uploadFile } from "@/api/upload";
import { useI18n } from "vue-i18n";
import { getToken } from "@/utils/auth";
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { proxy } = getCurrentInstance();
const loading = ref(true);
const loading1 = ref(true);

// 上传相关变量
const uploadUrl = import.meta.env.VITE_APP_BASE_API + '/file/uploadFile';
const headers = { Authorization: 'Bearer ' + getToken() };
const fileList = ref([]);
const uploadProgress = ref(0);

// 上传相关方法
const handleProgress = (event, file) => {
  uploadProgress.value = Math.round(event.percent);
};

const percentageFormat = (percentage) => {
  return percentage === 100 ? t('上传完成') : `${percentage}%`;
};

const beforeUpload = (file) => {
  const isAPK = file.type === 'application/vnd.android.package-archive' || file.name.endsWith('.apk');
  const isLt1G = file.size / 1024 / 1024 / 1024 < 1;

  if (!isAPK) {
    ElMessage.error(t('只能上传apk文件！'));
    return false;
  }
  if (!isLt1G) {
    ElMessage.error(t('文件大小不能超过1GB！'));
    return false;
  }
  return true;
};

const handleSuccess = (response, file) => {
  if (response.code === '200') {
    ruleForm.fileAttachmentId = response.data.fileAttachmentId;
    state.url = response.data.url;
    fileList.value = [{
      name: file.name,
      url: response.data.url
    }];
    ElMessage.success(t('上传成功'));
  } else {
    ElMessage.error(response.msg || t('上传失败'));
  }
  uploadProgress.value = 0;
};

const handleError = (error) => {
  ElMessage.error(t('上传失败'));
  uploadProgress.value = 0;
};

const handleRemove = () => {
  fileList.value = [];
  ruleForm.fileAttachmentId = '';
  ruleForm.downloadUrl = '';
  uploadProgress.value = 0;
};

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
  url: "",
  show: false,
  newUrl: "",
  time: ""

});
const personData = reactive({
  fileName: "",
});

const formatLabel = (value) => {
  return value === 0 ? t("启用") : t("禁用");
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
const uploadType = [
  {
    value: 0,
    label: t("文件"),
  },
  {
    value: 1,
    label: t("链接地址"),
  },
]


const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  fileName: "",
  fileAttachmentId: "",
  fileVersion: "",
  downloadUrl: "",
  uploadType,
  countryIdList: []
});

// 国家列表相关数据
const countryList = ref([]);
const countryLoading = ref(false);

const rules = reactive({
  fileName: [
    { required: true, message: t("银行名称") + t("不能为空"), trigger: "blur" },
  ],
  fileAttachmentId: [
    {
      required: () => ruleForm.uploadType === 0, // 仅在 uploadType 为 0 时验证
      message: t("文件附件") + t("不能为空"),
      trigger: "blur",
    },
  ],
  fileVersion: [
    { required: true, message: t("版本") + t("不能为空"), trigger: "blur" },
  ],
  downloadUrl: [
    {
      required: () => ruleForm.uploadType === 1, // 仅在 uploadType 为 1 时验证
      message: t("下载地址") + t("不能为空"),
      trigger: "blur",
    },
  ],
  countryIdList: [
    { 
      required: true, 
      message: t("国家") + t("不能为空"), 
      trigger: "change",
      type: "array",
      min: 1
    },
  ],
});

//查询文件信息

const searchPerson = () => {
  loading.value = true;
  getPersonPage({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    fileName: personData.fileName,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        loading.value = false;
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
    // pageSize: pageSize.value,
    fileName: personData.fileName,
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
        state.url = res.data.url;
        ruleForm.downloadUrl = res.data.downloadUrl;
        // 从文件详情数据中提取国家ID列表
        if (res.data.countryList && res.data.countryList.length > 0) {
          ruleForm.countryIdList = res.data.countryList.map(country => country.id);
        }
        if (res.data.fileAttachmentId && res.data.url) {
          fileList.value = [{
            name: res.data.fileAttachmentOriginalName || res.data.fileName,
            url: res.data.url
          }];
        }
        console.log("获取文件详情数据111", state.url);
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
        state.url = res.data.url;
        state.newUrl = res.data.domain + "" + res.data.url;
        state.time = res.data.effectiveDuration;
        // downLoad(state.url);
        // getFileDownloadUrlList(id)
        console.log("获取文件详情数据", state.url, res.data);
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
        state.url = fileData.url;
        getFileDownloadUrlList(id)
        console.log("获取文件链接数据", state.url);
      }
    })
    .catch((error) => {
      console.error("获取文件列表数据失败", error);
    });
};
const downloadUrlList = ref([]);
// 获取下载链接列表数据
const getFileDownloadUrlList = (id) => {
  loading.value = true;
  getFileDownloadUrlListPage({
    currentPage: 1,
    pageSize: 100,
    fileId: id
  })
    .then((res) => {
      if (res.data && res.data.records) {
        loading.value = false;
        downloadUrlList.value = res.data.records;
        // totalRecords.value = res.data.total;
        console.log("获取文件列表数据", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取文件列表数据失败", error);
    });
};
// 获取国家列表
const getCountryList = () => {
  countryLoading.value = true;
  getCountryListPage({
    currentPage: 1,
    pageSize: 1000
  })
    .then((res) => {
      if (res.success && res.code === "200" && res.data && res.data.records) {
        countryList.value = res.data.records;
        console.log("获取国家列表数据成功", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取国家列表数据失败", error);
    })
    .finally(() => {
      countryLoading.value = false;
    });
};

//新增弹窗
const openAddModal = () => {
  state.modalMode = "add";
  ruleForm.fileName = "";
  ruleForm.fileAttachmentId = "";
  ruleForm.downloadUrl = "";
  ruleForm.fileVersion = "";
  ruleForm.countryIdList = [];
  ruleForm.uploadType = 0; // 默认选择文件上传
  ruleForm.url = "";
  state.url = "";
  state.followUp = true;
  getCountryList(); // 获取国家列表
};
// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称
  const fieldsToCheck = [
    { name: t("银行名称"), value: ruleForm.fileName },
    { name: t("版本"), value: ruleForm.fileVersion },
  ];

  // 根据 uploadType 动态添加需要检查的字段
  if (ruleForm.uploadType === 0) {
    fieldsToCheck.push({ name: t("文件附件ID"), value: ruleForm.fileAttachmentId });
  } else if (ruleForm.uploadType === 1) {
    fieldsToCheck.push({ name: t("下载链接"), value: ruleForm.downloadUrl });
  }
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
  const params = {
    fileName: ruleForm.fileName,
    fileVersion: ruleForm.fileVersion,
    countryIdList: ruleForm.countryIdList,
  };

  // 根据 uploadType 决定传递 fileAttachmentId 还是 downloadUrl
  if (ruleForm.uploadType === 0) {
    params.fileAttachmentId = ruleForm.fileAttachmentId;
  } else if (ruleForm.uploadType === 1) {
    params.downloadUrl = ruleForm.downloadUrl;
  }
  setPersonPage(params)
    .then((res) => {
      ElMessage({
        message: t("添加成功"),
        type: "success",
      });
      state.url = "";
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
  ruleForm.downloadUrl = row.downloadUrl;
  ruleForm.fileVersion = row.fileVersion;
  ruleForm.countryIdList = row.countryIdList || [];
  ruleForm.uploadType = row.uploadType || 0; // 默认选择文件上传
  uploadProgress.value = 0;
  if (row.fileAttachmentId && row.url) {
    fileList.value = [{
      name: row.fileName,
      url: row.url
    }];
  } else {
    fileList.value = [];
  }
  console.log("id", row.fileAttachmentId);
  getPersonId(row.id);
  getCountryList(); // 获取国家列表
  state.followUp = true;
};

const editPerson = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  const params = {
    id: selectedRowId.value,
    fileName: ruleForm.fileName,
    fileVersion: ruleForm.fileVersion,
    countryIdList: ruleForm.countryIdList,
  };
  // 根据 uploadType 决定传递 fileAttachmentId 还是 downloadUrl
  if (ruleForm.uploadType === 0) {
    params.fileAttachmentId = ruleForm.fileAttachmentId;
  } else if (ruleForm.uploadType === 1) {
    params.downloadUrl = ruleForm.downloadUrl;
  }
  editPersonPage(params)
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
  const baseUrl = import.meta.env.VITE_API_URL;

  // 拼接新链接
  const newUrl = `${baseUrl}/${url}`;
  console.log('新链接:', newUrl);

  // 复制到剪贴板
  copyToClipboard(newUrl);
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
  state.show = false;
  console.log('链接已复制到剪贴板:', text);
};



// 处理APK可见状态变化
const handleDisplayStatusChange = (row) => {
  const params = {
    id: row.id,
    displayStatus: row.displayStatus
  };

  updateFileDisplayStatusPage(params)
    .then((res) => {
      ElMessage({
        message: t("状态修改成功"),
        type: "success",
      });
      console.log("APK可见状态修改成功", res.data);
    })
    .catch((error) => {
      console.error("状态修改失败:", error);
      // 如果失败，恢复原来的状态
      row.displayStatus = row.displayStatus === 'Y' ? 'N' : 'Y';
      ElMessage({
        message: t("状态修改失败"),
        type: "error",
      });
    });
};

// 删除文件id
const delPerson = (id) => {
  ElMessageBox.confirm(t("是否确认删除"), t("提示"), {
    confirmButtonText: t("确定"),
    cancelButtonText: t("取消"),
    type: "warning",
  })
    .then(() => {
      delPersonPage({
        "idList": [id]
      }) // 将 id 拼接为对象
        .then((res) => {
          console.log("删除成功,ID:", id);
          proxy.$modal.msgSuccess(t("删除成功"));
          getPerson(); // 删除成功后刷新列表

        })
        .catch((error) => {
          console.error("删除失败:", error);
          // 处理错误
        });
    })
    .catch(() => { });
};
const roles = ref('');
const userStore = useUserStore();

const getUserInfo = () => {
  userStore.getInfo()
    .then((res) => {
      roles.value = res.roles[0]
      console.log("获取角色", roles.value);
    })
    .catch((error) => {
      console.error("获取角色失败", error);
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
  personData.fileName = "";
  currentPage.value = 1;
  // pageSize.value = 10;
  ElMessage({
    message: t("刷新成功"),
    type: "success",
  });
  resetRuleForm(); //重置放在前面 提前情况status的状态再刷新数据
  getPerson(); // 重新获取数据
};

onMounted(() => {
  getPerson();
  getUserInfo();
});

</script>
<style lang="scss" scoped>
.upload-demo {
  :deep(.el-upload) {
    display: block;
  }

  :deep(.el-upload-list) {
    margin-top: 10px;
  }
}

.upload-demo.hide-upload-button {
  :deep(.el-upload) {
    display: none !important;
  }

  :deep(.el-upload-list) {
    margin: 0;
  }
}

.el-table {
  height: 800px;
  overflow-y: auto;
}

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
