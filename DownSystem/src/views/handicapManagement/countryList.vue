<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="card-container">
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t("国家名称") }}</span>
            <el-input v-model="personData.name" class="card-input" @keyup.enter="searchCountryList"
              :placeholder="$t('请输入国家名称')" />
          </div>
        </div>

      </div>
    </div>

    <div class="table-container">
      <div class="table-header">
        <div class="table-actions">
          <el-button type="primary" size="small" @click="openAddModal">
            <el-icon>
              <Plus />
            </el-icon>
            {{ $t("新增") }}
          </el-button>
        </div>
        <div class="u-flex u-flex-wrap u-flex-items-center">
          <div class="u-flex u-flex-items-center">

            <el-button size="small" @click="refresh"><el-icon class="el-icon--right">
                <Refresh />
              </el-icon>{{ $t("重置") }}</el-button>
          </div>
          <el-divider direction="vertical" />
          <el-button size="small" type="primary" @click="searchCountryList"><el-icon class="el-icon--right">
              <Search />
            </el-icon>{{ $t("查询") }}</el-button>
        </div>
      </div>

      <div class="table-content">
        <el-table v-loading="loading" :data="tableData" style="width: 100%" class="m-b-10 adaptive-table" size="small">
          <el-table-column prop="id" :label="$t('ID')" />
          <el-table-column prop="name" :label="$t('国家名称')" />
          <el-table-column width="180" :label="$t('操作')">
            <template #default="scope">
              <el-button size="small" @click="openEditModal(scope.row)">
                {{ $t("编辑") }}
              </el-button>
              <el-button class="m-l-10" type="danger" size="small" @click="delPerson(scope.row.id)">
                {{ $t("删除") }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pagination-container">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
        :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
        :total="totalRecords" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>

  <!-- 新增/编辑弹窗 -->
  <el-drawer v-model="state.followUp" :title="state.modalMode === 'add' ? $t('新增国家') : $t('编辑国家')" direction="rtl"
    size="30%">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
      label-position="top" :size="formSize" status-icon require-asterisk-position="right"
      :hide-required-asterisk="true">
      <el-form-item :label="$t('国家名称')" prop="name">
        <el-input v-model="ruleForm.name" :placeholder="$t('请输入国家名称')" />
      </el-form-item>
      <el-form-item>
        <el-button v-if="state.modalMode === 'edit'" type="primary" @click="editPerson">{{ $t("确认") }}</el-button>
        <el-button v-else type="primary" @click="setPerson">{{ $t("确认") }}</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getCountryListPage,
  setCountryPage,
  delCountryPage,
} from "@/api/handicapManagement/countryList";
import { getInfo } from "@/api/login";

const { t } = useI18n();

// 响应式数据
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const totalRecords = ref(0);
const small = ref(false);
const background = ref(true);
const disabled = ref(false);
const selectedRowId = ref(null);

const state = reactive({
  followUp: false,
  modalMode: "add", // 'add' 或 'edit'
});

const personData = reactive({
  name: "",
  pageNum: 1,
  pageSize: 10,
});

const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = reactive({
  name: "",
});

const rules = reactive({
  name: [
    { required: true, message: t("国家名称") + t("不能为空"), trigger: "blur" },
  ],
});


// 搜索国家
const searchCountryList = () => {
  loading.value = true;
  getCountryListPage({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    name: personData.name,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        loading.value = false;
        console.log("查询国家列表成功", res.data.records);
      }
    })
    .catch((error) => {
      console.error("查询国家列表数据失败", error);
      loading.value = false;
    });
};

const tableData = ref([]);
// 获取国家列表数据
const getPerson = () => {
  loading.value = true;
  getCountryListPage({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    name: personData.name,
  })
    .then((res) => {
      if (res.success && res.code === "200" && res.data && res.data.records) {
        loading.value = false;
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        console.log("获取国家列表数据", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取国家列表数据失败", error);
      loading.value = false;
    });
};

// 分页处理
const handleSizeChange = (val) => {
  pageSize.value = val;
  getPerson();
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
  getPerson();
};

//新增弹窗
const openAddModal = () => {
  state.modalMode = "add";
  ruleForm.name = "";
  state.followUp = true;
};

// 表单验证
const checkIn = () => {
  // 定义需要检查的字段及其显示名称
  const fieldsToCheck = [
    { name: t("国家名称"), value: ruleForm.name },
  ];

  // 检查字段是否为空
  for (const field of fieldsToCheck) {
    if (!field.value || field.value.trim() === "") {
      ElMessage({
        message: field.name + t("不能为空"),
        type: "warning",
      });
      return false; // 如果有字段为空，返回 false
    }
  }
  return true; // 所有字段都已填写
};

//新增国家
const setPerson = () => {
  if (!checkIn()) {
    return;
  }
  const params = {
    name: ruleForm.name,
  };

  setCountryPage(params)
    .then((res) => {
      ElMessage({
        message: t("操作成功"),
        type: "success",
      });
      getPerson();
      console.log("新增国家数据", res.data);
      state.followUp = false;
    })
    .catch((error) => {
      console.error("新增国家数据失败", error);
    });
};

// 编辑弹窗
const openEditModal = (row) => {
  state.modalMode = "edit";
  selectedRowId.value = row.id;
  ruleForm.name = row.name;
  console.log("id", row.id);
  state.followUp = true;
};

// 编辑国家
const editPerson = () => {
  if (!checkIn()) {
    return;
  }
  const params = {
    id: selectedRowId.value,
    name: ruleForm.name,
  };

  setCountryPage(params)
    .then((res) => {
      ElMessage({
        message: t("操作成功"),
        type: "success",
      });
      state.followUp = false;
      getPerson();
      console.log("保存国家数据成功", res.data);
    })
    .catch((error) => {
      console.error("编辑国家数据失败", error);
    });
};

// 删除国家id
const delPerson = (id) => {
  ElMessageBox.confirm(t("是否确认删除"), t("提示"), {
    confirmButtonText: t("确定"),
    cancelButtonText: t("取消"),
    type: "warning",
  })
    .then(() => {
      delCountryPage(id) // 将 id 拼接为对象
        .then((res) => {
          if (res.success && res.code === "200") {
            ElMessage({
              type: "success",
              message: t("删除成功"),
            });
            getPerson();
          }
        })
        .catch((error) => {
          console.error("删除国家数据失败", error);
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: t("已取消删除"),
      });
    });
};

//刷新当前数据
const refresh = () => {
  personData.name = "";
  currentPage.value = 1;
  getPerson();
};

// 组件挂载时执行
onMounted(() => {
  getPerson();
});
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}

.filter-container {
  margin-bottom: 20px;
}

.card-container {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.box-card-input {
  margin-right: 20px;
  margin-bottom: 10px;
}

.card-title {
  min-width: 80px;
  margin-right: 10px;
  font-weight: 500;
}

.card-input {
  width: 200px;
}

.table-container {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ebeef5;
}

.table-title {
  font-size: 16px;
  font-weight: 500;
}

.table-content {
  padding: 20px;
}

.pagination-container {
  text-align: right;
}

.u-flex {
  display: flex;
}

.u-flex-wrap {
  flex-wrap: wrap;
}

.u-flex-items-center {
  align-items: center;
}

.m-b-10 {
  margin-bottom: 10px;
}

.m-l-0 {
  margin-left: 0;
}

.m-t-5 {
  margin-top: 5px;
}

.adaptive-table {
  :deep(.el-table__body-wrapper) {
    max-height: calc(100vh - 400px);
    min-height: 200px;
    overflow-y: auto;
  }
}
</style>
