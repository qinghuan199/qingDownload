<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t("盘口名称") }}</span>
            <el-input v-model="personData.name" class="card-input" @keyup.enter="searchHandList"
              :placeholder="$t('请输入盘口名称')" />
          </div>
          <!-- <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t("国家名称") }}</span>
            <el-input v-model="personData.countryName" class="card-input" @keyup.enter="searchHandList"
              :placeholder="$t('请输入国家名称')" />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title"> {{ $t("管理员") }}</span>
            <el-input v-model="personData.userName" class="card-input" @keyup.enter="searchHandList"
              :placeholder="$t('请输入管理员用户名')" />
          </div> -->
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
              <el-button type="primary" @click="searchHandList" size="small">
                <el-icon class="el-icon--right">
                  <Search />
                </el-icon>
                {{ $t("查询") }}
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table v-loading="loading" :data="tableData" style="width: 100%" class="m-b-10 adaptive-table" size="small">
          <el-table-column prop="id" :label="$t('ID')" width="120" />
          <el-table-column prop="name" :label="$t('盘口名称')"/>
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
          <el-table-column :label="$t('管理员')">
            <template #default="scope">
              <el-tag v-for="user in scope.row.userList" :key="user.userId" type="success" size="small" class="m-r-5 m-b-5">
                {{ user.userName }}
              </el-tag>
              <span v-if="!scope.row.userList || scope.row.userList.length === 0" class="text-gray-400">{{ $t('暂无管理员')
                }}</span>
            </template>
          </el-table-column>
          <el-table-column width="300" :label="$t('操作')">
            <template #default="scope">
              <el-button size="small" v-if="roles === 'root'" @click="openEditModal(scope.row)">
                {{ $t("编辑") }}
              </el-button>
              <el-button type="primary" size="small" @click="viewHandicapDetail(scope.row.id)">
                {{ $t("查看详情") }}
              </el-button>
              <el-button type="info" size="small" @click="viewEmployeeStats(scope.row.id)">
                {{ $t("员工统计") }}
              </el-button>
              <el-button class="m-l-10 " v-if="roles === 'root'" type="danger" size="small"
                @click="delHand(scope.row.id)">
                {{ $t("删除") }}
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
  <el-dialog v-model="state.followUp" :title="state.modalMode == 'edit' ? $t('编辑盘口') : $t('添加盘口')" width="900px" append-to-body>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" label-position="top" :size="formSize" status-icon require-asterisk-position="right"
      :hide-required-asterisk="true">
      
      <!-- 盘口名称和Telegram群组ID同行显示 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('盘口名称')" prop="name">
            <el-input v-model="ruleForm.name" :placeholder="$t('请输入盘口名称')" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('Telegram群组ID')" prop="telegramGroupId">
            <el-input v-model="ruleForm.telegramGroupId" :placeholder="$t('请输入Telegram群组ID')" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      
      <!-- 独立的国家列表选择 -->
      <el-form-item :label="$t('盘口关联国家')" prop="countryIdList">
        <el-select v-model="ruleForm.countryIdList" multiple :placeholder="$t('请选择关联国家')" style="width: 100%"
          :loading="countryLoading" collapse-tags collapse-tags-tooltip :max-collapse-tags="5">
          <el-option v-for="country in countryList" :key="country.id" :label="country.name" :value="country.id" />
        </el-select>
      </el-form-item>
      
      <!-- 管理员和国家关联配置 -->
      <el-form-item :label="$t('管理员国家配置')">
        <div style="display: flex; gap: 20px; min-height: 400px;">
          <!-- 左侧：管理员列表 -->
          <div style=" border: 1px solid #dcdfe6; border-radius: 4px; padding: 15px;">
            <h4 style="margin: 0 0 15px 0; color: #606266;width: 120px">{{ $t('选择管理员') }}</h4>
            <el-checkbox-group v-model="selectedAdminIds" @change="handleAdminChange">
              <div v-for="admin in adminList" :key="admin.id" style="margin-bottom: 8px;">
                <el-checkbox :value="admin.id">
                  {{ admin.userName }}
                </el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
          
          <!-- 右侧：选中管理员的国家配置 -->
          <div style=" border: 1px solid #dcdfe6; border-radius: 4px; padding: 15px;width: 100%;">
            <h4 style="margin: 0 0 15px 0; color: #606266;">{{ $t('管理员国家配置') }}</h4>
            <div v-if="selectedAdminIds.length === 0" style="color: #909399; text-align: center; padding: 50px 0;">
              {{ $t('请先选择管理员') }}
            </div>
            <div v-else>
              <div v-for="adminId in selectedAdminIds" :key="adminId" style="margin-bottom: 20px; padding: 10px; background: #f5f7fa; border-radius: 4px;">
                <div style="font-weight: bold; margin-bottom: 10px; color: #303133;">
                  {{ getAdminName(adminId) }}
                </div>
                <el-checkbox-group v-model="adminCountryMap[adminId]" @change="updateUserCountryList">
                  <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    <el-checkbox v-for="country in countryList" :key="country.id" :label="country.id" :value="country.id">
                      {{ country.name }}
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      
      <el-form-item>
        <el-button v-if="state.modalMode === 'edit'" type="primary" @click="editHand">{{ $t("确认") }}</el-button>
        <el-button v-else type="primary" @click="setHand">{{ $t("确认") }}</el-button>
        <el-button @click="state.followUp = false">{{ $t("取消") }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- 盘口详情对话框 -->
  <el-dialog v-loading="loading1" :title="$t('盘口详情')" v-model="state.handicapDialog" width="650px" append-to-body>
    <div v-if="handicapDetail">
      <el-descriptions :column="2" border>
        <el-descriptions-item :label="$t('ID')">{{ handicapDetail.id }}</el-descriptions-item>
        <el-descriptions-item :label="$t('盘口名称')">{{ handicapDetail.name }}</el-descriptions-item>
        <el-descriptions-item :label="$t('Telegram群组ID')">{{ handicapDetail.telegramGroupId }}</el-descriptions-item>
      </el-descriptions>

      <div class="m-t-20">
        <h4>{{ $t('关联国家列表') }}</h4>
        <el-table :data="handicapDetail.countryList" style="width: 100%;height: 200px" class="m-t-10" size="small">
          <el-table-column prop="id" :label="$t('国家ID')" width="80" />
          <el-table-column prop="name" :label="$t('国家名称')" />
        </el-table>
      </div>

      <div class="m-t-20">
        <h4>{{ $t('管理员列表') }}</h4>
        <el-table :data="handicapDetail.userList" style="width: 100%;height: 200px" class="m-t-10" size="small">
          <el-table-column prop="userId" :label="$t('用户ID')" width="80" />
          <el-table-column prop="userName" :label="$t('用户名')" width="120" />
          <el-table-column :label="$t('关联国家')" min-width="150">
            <template #default="{ row }">
              <el-tag
                v-for="(country, index) in row.countryNameList"
                :key="index"
                size="small"
                class="m-r-5 m-b-5"
                type="primary"
              >
                {{ country }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getHandListPage,
  getHandIdPage,
  setHandPage,
  delHandPage
} from "@/api/handicapManagement/handList";
import { getCountryListPage } from "@/api/handicapManagement/countryList";
import {
  getPersonPage,
} from "@/api/system/personlist";

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
const handicapDetail = ref(null);

const state = reactive({
  followUp: false, // 新增/编辑弹窗
  modalMode: "add", // 弹窗模式：add/edit
  handicapDialog: false, // 盘口详情弹窗
});
const personData = reactive({
  name: "",
  countryName: "",
  userName: "",
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
  name: "",
  telegramGroupId: "", // Telegram群组ID
  countryIdList: [], // 盘口关联的国家ID列表
  userCountryList: [] // 管理员国家配置列表
});

// 新增的响应式数据
const selectedAdminIds = ref([]); // 选中的管理员ID列表
const adminCountryMap = reactive({}); // 管理员对应的国家映射 {adminId: [countryIds]}

// 国家列表数据
const countryList = ref([]);
const countryLoading = ref(false);

// 管理员列表数据
const adminList = ref([]);
const adminLoading = ref(false);

const rules = reactive({
  name: [
    { required: true, message: t("盘口名称") + t("不能为空"), trigger: "blur" },
  ],
  countryIdList: [
    { required: true, message: t("请选择盘口关联国家"), trigger: "blur" },
  ],
});

// 查询盘口信息
const searchHandList = () => {
  loading.value = true;
  getHandListPage({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    name: personData.name,
    countryName: personData.countryName,
    userName: personData.userName,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        loading.value = false;
        console.log("查询盘口列表成功", res.data.records);
      }
    })
    .catch((error) => {
      console.error("查询盘口列表数据失败", error);
      loading.value = false;
    });
};

const tableData = ref([]);
// 获取盘口列表数据
const getHandList = () => {
  loading.value = true;
  getHandListPage({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    name: personData.name,
    countryName: personData.countryName,
    userName: personData.userName,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        loading.value = false;
        tableData.value = res.data.records;
        totalRecords.value = res.data.total;
        console.log("获取盘口列表数据", res.data.records);
      }
    })
    .catch((error) => {
      console.error("获取盘口列表数据失败", error);
      loading.value = false;
    });
};
// 查看盘口详情
const viewHandicapDetail = (id) => {
  loading1.value = true;
  getHandIdPage(id)
    .then((res) => {
      if (res.data) {
        loading1.value = false;
        handicapDetail.value = res.data;
        state.handicapDialog = true;
        console.log("获取盘口详情数据", res.data);
      }
    })
    .catch((error) => {
      console.error("获取盘口详情数据失败", error);
      loading1.value = false;
    });
};

// 员工统计
const viewEmployeeStats = (handicapId) => {
  // 跳转到员工统计页面，携带盘口ID
  router.push({
    path: '/downloadManagement/employeeList',
    query: {
      handicapId: handicapId
    }
  });
};

// 获取国家列表
const getCountryList = () => {
  countryLoading.value = true;
  return getCountryListPage({
    currentPage: 1,
    pageSize: 10, // 获取所有国家
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
const getPersonList = () => {
  adminLoading.value = true;
  return getPersonPage({
    pageIndex: 1,
    pageSize: 100,
    roleId: 2,
  })
    .then((res) => {
      if (res.data && res.data.records) {
        adminList.value = res.data.records;
        console.log("获取管理员列表成功", res.data.records);
      }
      return res;
    })
    .catch((error) => {
      console.error("获取管理员列表失败", error);
      throw error;
    })
    .finally(() => {
      adminLoading.value = false;
    });
};

// 获取管理员姓名
const getAdminName = (adminId) => {
  const admin = adminList.value.find(admin => admin.id == adminId);
  return admin ? admin.userName : '';
};

// 处理管理员选择变化
const handleAdminChange = (selectedIds) => {
  console.log('管理员选择变化:', selectedIds);
  
  // 移除未选中管理员的国家配置
  Object.keys(adminCountryMap).forEach(adminId => {
    const adminIdNum = parseInt(adminId);
    if (!selectedIds.includes(adminIdNum)) {
      delete adminCountryMap[adminId];
    }
  });
  
  // 为新选中的管理员初始化空的国家列表
  selectedIds.forEach(adminId => {
    if (!adminCountryMap[adminId]) {
      adminCountryMap[adminId] = [];
    }
  });
  
  console.log('管理员国家映射:', adminCountryMap);
  updateUserCountryList();
};

// 更新用户国家列表
const updateUserCountryList = () => {
  ruleForm.userCountryList = selectedAdminIds.value.map(adminId => {
    // 在管理员列表中查找对应的管理员，获取其真实的userId
    const admin = adminList.value.find(admin => admin.id === adminId);
    return {
      userId: admin ? admin.id : adminId, // 使用管理员的id作为userId
      countryIdList: adminCountryMap[adminId] || []
    };
  });
  console.log('更新后的用户国家列表:', ruleForm.userCountryList);
};

// 重置表单
const resetRuleForm = () => {
  ruleForm.name = "";
  ruleForm.telegramGroupId = ""; // 清空Telegram群组ID
  ruleForm.countryIdList = [];
  ruleForm.userCountryList = [];
  selectedAdminIds.value = [];
  Object.keys(adminCountryMap).forEach(key => {
    delete adminCountryMap[key];
  });
};

// 新增盘口弹窗
const openAddModal = () => {
  state.modalMode = "add";
  resetRuleForm();
  getCountryList(); // 获取国家列表
  getPersonList(); // 获取管理员列表
  state.followUp = true;
};
// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称
  const fieldsToCheck = [
    { name: t("盘口名称"), value: ruleForm.name },
    // { name: t("关联国家"), value: ruleForm.countryIdList },
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
// 新增盘口
const setHand = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  const params = {
    name: ruleForm.name,
    telegramGroupId: ruleForm.telegramGroupId,
    countryIdList: ruleForm.countryIdList, // 盘口关联的国家ID列表
    userCountryList: ruleForm.userCountryList // 管理员国家配置列表
  };
  console.log('提交的数据结构:', params);
  setHandPage(params)
    .then((res) => {
      ElMessage({
        message: t("添加成功"),
        type: "success",
      });
      getHandList();
      console.log("新增盘口数据", res.data);
      state.followUp = false;
    })
    .catch((error) => {
      console.error("新增失败:", error);
    });
};

// 编辑盘口
const selectedRowId = ref(null); // ID of the row being edited
const openEditModal = (row) => {
  state.modalMode = "edit";
  selectedRowId.value = row.id;
  
  // 先获取国家列表和管理员列表，然后再获取盘口详情进行映射
  Promise.all([
    getCountryList(),
    getPersonList()
  ]).then(() => {
    // 确保管理员列表已加载完成后，再获取盘口详情进行映射
    return getHandIdPage(row.id);
  }).then((res) => {
    if (res.data) {
      const detailData = res.data;
      
      // 预填盘口名称
      ruleForm.name = detailData.name;
      
      // 预填Telegram群组ID
      ruleForm.telegramGroupId = detailData.telegramGroupId || "";
      
      // 预填盘口关联的国家ID
      ruleForm.countryIdList = detailData.countryList ? detailData.countryList.map(country => country.id) : [];
      
      // 预填管理员和对应的国家配置
      if (detailData.userList && detailData.userList.length > 0) {
        console.log('编辑数据中的用户列表:', detailData.userList);
        console.log('当前管理员列表:', adminList.value);
        
        // 将编辑数据中的userId映射到管理员列表的id字段
        const mappedAdminIds = [];
        const mappedCountryMap = {};
        
        detailData.userList.forEach(user => {
          // 在管理员列表中查找对应的管理员
          const admin = adminList.value.find(admin => admin.id === user.userId);
          if (admin) {
            mappedAdminIds.push(admin.id);
            mappedCountryMap[admin.id] = user.countryIdList || [];
            console.log(`映射管理员 ${admin.id} (${admin.userName}) 的国家配置:`, user.countryIdList);
          } else {
            console.warn(`未找到对应的管理员，userId: ${user.userId}`);
          }
        });
        
        selectedAdminIds.value = mappedAdminIds;
        console.log('选中的管理员IDs:', selectedAdminIds.value);
        
        // 清空之前的映射
        Object.keys(adminCountryMap).forEach(key => {
          delete adminCountryMap[key];
        });
        
        // 设置新的映射
        Object.assign(adminCountryMap, mappedCountryMap);
        
        // 更新用户国家列表
        updateUserCountryList();
      } else {
        selectedAdminIds.value = [];
        Object.keys(adminCountryMap).forEach(key => {
          delete adminCountryMap[key];
        });
        ruleForm.userCountryList = [];
      }
      
      console.log("编辑盘口详细数据", detailData);
      console.log("管理员国家映射", adminCountryMap);
    }
  }).catch((error) => {
    console.error("获取数据失败", error);
    ElMessage.error("获取数据失败");
  });
  
  state.followUp = true;
};

const editHand = () => {
  const params = {
    id: selectedRowId.value,
    name: ruleForm.name,
    telegramGroupId: ruleForm.telegramGroupId,
    countryIdList: ruleForm.countryIdList, // 盘口关联的国家ID列表
    userCountryList: ruleForm.userCountryList // 管理员国家配置列表
  };
  console.log('编辑提交的数据结构:', params);
  setHandPage(params)
    .then((res) => {
      ElMessage({
        message: t("修改成功"),
        type: "success",
      });
      state.followUp = false;
      getHandList();
      console.log("保存盘口数据成功", res.data);
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



// 删除盘口
const delHand = (id) => {
  ElMessageBox.confirm(t("是否确认删除"), t("提示"), {
    confirmButtonText: t("确定"),
    cancelButtonText: t("取消"),
    type: "warning",
  })
    .then(() => {
      delHandPage(id) // 直接传递 handicapId
        .then((res) => {
          ElMessage({
            message: t("删除成功"),
            type: "success",
          });
          getHandList();
          console.log("删除盘口数据成功", res.data);
        })
        .catch((error) => {
          console.error("删除盘口数据失败", error);
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: t("已取消删除"),
      });
    });
};
const roles = ref('');

const userStore = useUserStore();

const getUserInfo = () => {
  userStore.getInfo()
    .then((res) => {
      roles.value = userStore.roles[0];
      console.log("获取角色", roles.value);
    })
    .catch((error) => {
      console.error("获取角色失败", error);
    });
};



//分页
const currentPage = ref(1);
const pageSize = ref(10);
const totalRecords = ref(0);
const handleCurrentChange = (page) => {
  currentPage.value = page;
  console.log("跳转到第", currentPage.value, "页");
  getHandList(page); // 获取新的数据
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1; // 重置到第一页
  getHandList(); // 获取新的数据
};

//刷新当前数据
const refresh = () => {
  personData.name = "";
  personData.countryName = "";
  personData.userName = "";
  currentPage.value = 1;
  // pageSize.value = 10;
  ElMessage({
    message: t("刷新成功"),
    type: "success",
  });
  resetRuleForm(); //重置放在前面 提前情况status的状态再刷新数据
  getHandList(); // 重新获取数据
};

onMounted(() => {
  getHandList();
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

.adaptive-table {
  :deep(.el-table__body-wrapper) {
    max-height: calc(100vh - 400px);
    min-height: 200px;
    overflow-y: auto;
  }
}
</style>
