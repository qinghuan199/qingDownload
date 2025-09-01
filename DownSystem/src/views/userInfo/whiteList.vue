<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{ $t('分组标题') }}</span>
            <el-input v-model="searchData.name" class="card-input" :placeholder="$t('请输入')" :suffix-icon="Calendar" />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{ $t('归属客服') }}</span>
            <el-select v-model="searchData.account" :placeholder="$t('请选择')" size="" class="card-input">
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
              </el-icon>
              {{$t('新增')}}
            </el-button>
            <el-divider direction="vertical" />
            <el-button type="warning" @click="handleExport" size="small">
              <el-icon>
                <Document />
              </el-icon>
              {{ $t('导出已注册数据') }}
            </el-button>
          </div>
          <div>
            <el-tooltip effect="dark" :content="$t('重置')" placement="top">
              <el-button @click="refresh" size="small">
                <el-icon class="el-icon--right">
                  <Refresh />
                </el-icon>
                {{ $t('重置') }}
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip effect="dark" :content="$t('查询')" placement="top">
              <el-button type="primary" @click="searchWhite" size="small">
                <el-icon class="el-icon--right">
                  <Refresh />
                </el-icon>
                {{$t('查询')}}
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table v-loading="loading" :data="tableData" style="width: 100%" class="m-b-10" size="small">
          <el-table-column prop="name" :label="$t('分组标题')" />
          <el-table-column prop="noCount" :label="$t('号码数量')"/>
          <el-table-column prop="registerCount" :label="$t('注册数量')" />
          <el-table-column prop="account" :label="$t('归属客服')" />
          <el-table-column prop="createTime"  :label="$t('创建时间')"/>
          <el-table-column prop="address"  :label="$t('白名单')">
            <template #default="{ row }">
              <!-- 使用 scoped slot 获取当前行数据 -->
              <el-button type="primary" size="small" @click="
                router.push({
                  path: '/userInfo/whiteListDate',
                  query: { id: row.id },
                })
                ">
                 {{$t('查看用户')}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('操作')">
            <template #default="scope">
              <el-button @click="openEditModal(scope.row)" size="small">
                {{$t('编辑')}}
              </el-button>
              <el-button type="danger" @click="delWhiteList(scope.row.id)" size="small">
                {{$t('删除')}}
              </el-button>
              <el-button type="primary" size="small" @click="
                (state.dialogVisible = true), (state.groupId = scope.row.id)
                ">
                  {{$t('导入数据')}}
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

  <!-- 导入数据弹窗 -->
  <el-dialog v-model="state.dialogVisible" :title=" $t('上传Excel文件')" width="600px" :fullscreen="state.fullscreen">
    <template #header>
      <span>{{ $t('上传Excel文件') }}</span>
      <div style="float: right">
        <el-button type="text" icon="el-icon-minus" @click="minimize" />
        <!-- <el-button type="text" @click="toggleFullScreen">
          <el-icon><Rank /></el-icon>
        </el-button> -->
      </div>
    </template>

    <!-- 上传区域 -->
    <exportUpload :uploadUrl="`/whiteGroup/import/${state.groupId}`" :isDrag="true"></exportUpload>
    <!-- :callback="handleFileUploaded" -->

    <!-- :uploadUrl="`/whiteGroup/import/${state.groupId}`" -->

    <!-- 显示上传的文件信息 -->
    <!-- <div v-if="state.fileList.length" class="file-list">
      <h4>上传的文件：</h4>
      <ul>
        <li v-for="(file, index) in state.fileList" :key="index">
          {{ file.name }} - {{ (file.size / 1024).toFixed(2) }} KB
        </li>
      </ul>
    </div> -->
    <!-- 弹窗的底部操作按钮 -->
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.dialogVisible = false">{{$t('取消')}}</el-button>
        <el-button type="primary" @click="submitUpload">{{$t('提交')}}</el-button>
      </span>
    </template> -->
  </el-dialog>
  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="state.modalMode == 'edit' ? $t('编辑')  : $t('添加')" direction="rtl">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" label-position="top" :size="formSize" status-icon require-asterisk-position="right">
      <el-form-item :label="$t('分组标题')" prop="name">
        <el-input v-model="ruleForm.name" class="card-input" :placeholder="$t('请输入')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="state.modalMode == 'edit'" type="primary" @click="editWhite">{{$t('确认')}}</el-button>
        <el-button v-else type="primary" @click="setWhite">{{$t('确认')}}</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage,ElMessageBox } from "element-plus";
import {
  getWhitePage,
  setWhitePage,
  delWhitePage,
  importWhiteListDatePage,
} from "@/api/userInfo/whitelist";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
  groupId: null, //组id
});

/** 导出按钮操作 */
function handleExport() {
  proxy.download(
    "/whiteGroup/export",
    {
      pageNum: 1,
      pageSize: 10,
    },
    `config_${new Date().getTime()}.xlsx`
  );
}

//文件上传成功回调方法
function handleFileUploaded(info) {
  state.fileList = info.url;
  console.log("文件上传", state.fileList);
}

const handleFileChange = (file, fileList) => {
  state.fileList = fileList; // 更新文件列表
};

const handleRemove = (file, fileList) => {
  state.fileList = fileList; // 更新文件列表
};

const submitUpload = () => {
  state.dialogVisible = false;
  importWhiteListDatePage(state.groupId, {
    //  file:state.fileList
  })
    .then((res) => {
      ElMessage({
        message: t('上传成功'),
        type: "success",
      });
    })
    .catch((error) => {
      console.error("上传失败", error);
    });
};

const toggleFullScreen = () => {
  state.fullscreen = !state.fullscreen;
};
const minimize = () => {
  state.fullscreen = false;
};
const searchData = reactive({
  name: "",
  account: "",
});
// 搜索白名单组数据
const searchWhite = () => {
  loading.value = true;
  getWhitePage({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    name: searchData.name,
    account: searchData.account,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        loading.value = false;
        console.log("搜索白名单数据", res.data.records);
      }
    })
    .catch((error) => {
      console.error("搜索白名单数据失败", error);
    });
};

const options = ref([]);
const tableData = ref([]);
// 获取白名单组数据
const getWhiteList = () => {
  loading.value = true;
  getWhitePage({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    name: searchData.name,
    account: searchData.account,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        options.value = res.data.records.map((item) => ({
          label: item.account, // 显示的文本
          value: item.account, // 对应的值
        }));
        loading.value = false;
        console.log("获取白名单列表数据", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取白名单列表数据失败", error);
    });
};

const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  name: "",
  id: "",
});

const rules = reactive({
  name: [{ required: true, message: t('分组标题')+' ' +t('不能为空'), trigger: "blur" }],
});
//新增弹窗
const openAddModal = () => {
  state.modalMode = "add";
  ruleForm.name = "";
  state.followUp = true;
};
// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称  
  const fieldsToCheck = [
    { name: t('分组标题'), value: ruleForm.name },
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
//新增白名单组数据
const setWhite = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setWhitePage({
    name: ruleForm.name,
  })
    .then((res) => {
      getWhiteList();
      ElMessage({
        message:  t('添加成功'),
        type: "success",
      });
      state.followUp = false;
      console.log("保存数据成功", res.data);
    })
    .catch((error) => {
      console.error("保存数据失败", error);
    });
};

//编辑弹窗
const openEditModal = (item) => {
  state.modalMode = "edit";
  ruleForm.name = item.name;
  ruleForm.id = item.id;
  state.followUp = true;
};
//编辑白名单组数据
const editWhite = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setWhitePage({
    name: ruleForm.name,
    id: ruleForm.id,
  })
    .then((res) => {
      getWhiteList();
      ElMessage({
        message: t('修改成功'),
        type: "success",
      });
      state.followUp = false;
      console.log("编辑数据成功", res.data);
    })
    .catch((error) => {
      console.error("编辑数据失败", error);
    });
};

// 删除白名单组
const delWhiteList = (id) => {
  ElMessageBox.confirm(t('是否确认删除'), t('提示'), {
    confirmButtonText: t('确定'),
    cancelButtonText:t('取消'),
    type: "warning",
  }).then(() => {
    delWhitePage(id) // 将 id 拼接为对象
      .then((res) => {
        console.log("删除成功,ID:", id);
        getWhiteList(); // 删除成功后刷新列表
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
  getWhiteList(page); // 获取新的数据
};
const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1; // 重置到第一页
  getWhiteList(); // 获取新的数据
};
//刷新当前数据
const refresh = () => {
  searchData.name = "";
  searchData.account = "";
  currentPage.value = 1;
  pageSize.value = 10;
  ElMessage({
    message: t('刷新成功'),
    type: "success",
  });
  getWhiteList(); // 重新获取数据
};
onMounted(() => {
  getWhiteList();
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
