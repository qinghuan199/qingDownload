<template>
  <div>
    <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
    <div class="container">
      <TableCustom
        :columns="columns"
        :tableData="tableData"
        :total="page.total"
        :viewFunc="handleView"
        :delFunc="handleDelete"
        :page-change="changePage"
        :editFunc="handleEdit"
      >
        <template #toolbarBtn>
          <el-button
            type="warning"
            :icon="CirclePlusFilled"
            @click="visible = true"
            >{{$t('新增')}}</el-button
          >
        </template>
        <template #status="{ rows }">
          <el-tag type="success" v-if="rows.status">{{ t('启用') }}</el-tag>
          <el-tag type="danger" v-else>{{ t('禁用') }}</el-tag>
        </template>
        <template #permissions="{ rows }">
          <el-button
            type="primary"
            size="small"
            plain
            @click="handlePermission(rows)"
            >{{ t('管理') }}</el-button
          >
        </template>
      </TableCustom>
    </div>
    <el-dialog
      :title="isEdit ? $t('编辑')  : $t('新增')"
      v-model="visible"
      width="700px"
      destroy-on-close
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <TableEdit
        :form-data="rowData"
        :options="options"
        :edit="isEdit"
        :update="updateData"
      />
    </el-dialog>
    <el-dialog
      :title="$t('查看详情')"
      v-model="visible1"
      width="700px"
      destroy-on-close
    >
      <TableDetail :data="viewData">
        <template #status="{ rows }">
          <el-tag type="success" v-if="rows.status">{{ t('启用') }}</el-tag>
          <el-tag type="danger" v-else>{{ t('禁用') }}</el-tag>
        </template>
      </TableDetail>
    </el-dialog>
    <el-dialog
      :title="$t('权限管理')"
      v-model="visible2"
      width="500px"
      destroy-on-close
    >
      <RolePermission :permiss-options="permissOptions" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="system-role">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { Role } from "@/types/role";
// import { fetchRoleData } from "@/api";
import TableCustom from "@/components/table-custom.vue";
import TableDetail from "@/components/table-detail.vue";
import RolePermission from "./role-permission.vue";
import { CirclePlusFilled } from "@element-plus/icons-vue";
import { FormOption, FormOptionList } from "@/types/form-option";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 查询相关
const query = reactive({
  name: "",
});
const searchOpt = ref<FormOptionList[]>([
  { type: "input", label: t('角色名称')+":", prop: "name" },
]);
const handleSearch = () => {
  changePage(1);
};

// 表格相关
let columns = ref([
  { type: "index", label: t('序号'), width: 55, align: "center" },
  { prop: "name", label:t('角色名称') },
  { prop: "key", label: t('角色标识') },
  { prop: "status", label: t('状态') },
  { prop: "permissions", label: t('权限管理') },
  { prop: "operator", label:  t('操作'), width: 250 },
]);
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
});
const tableData = ref<Role[]>([]);
const getData = async () => {
  const res = [];
  tableData.value = res.data.list;
  page.total = res.data.pageTotal;
};
getData();
const changePage = (val: number) => {
  page.index = val;
  getData();
};

// 新增/编辑弹窗相关
const options = ref<FormOption>({
  labelWidth: "100px",
  span: 24,
  list: [
    { type: "input", label: t('角色名称'), prop: "name", required: true },
    { type: "input", label: t('角色标识'), prop: "key", required: true },
    {
      type: "switch",
      label: t('状态'),
      prop: "status",
      required: false,
      activeText: t('启用'),
      inactiveText: t('禁用'),
    },
  ],
});
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: Role) => {
  rowData.value = { ...row };
  isEdit.value = true;
  visible.value = true;
};
const updateData = () => {
  closeDialog();
  getData();
};
const closeDialog = () => {
  visible.value = false;
  isEdit.value = false;
  rowData.value = {};
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
  row: {},
  list: [],
  column: 1,
});
const handleView = (row: Role) => {
  viewData.value.row = { ...row };
  viewData.value.list = [
    {
      prop: "id",
      label: t('角色ID'),
    },
    {
      prop: "name",
      label: t('角色名称'),
    },
    {
      prop: "key",
      label: t('角色标识'),
    },
    {
      prop: "status",
      label: t('角色状态'),
    },
  ];
  visible1.value = true;
};

// 删除相关
const handleDelete = (row: Role) => {
  ElMessage.success(t('删除成功'));
};

// 权限管理弹窗相关
const visible2 = ref(false);
const permissOptions = ref({});
const handlePermission = (row: Role) => {
  visible2.value = true;
  permissOptions.value = {
    id: row.id,
    permiss: row.permiss,
  };
};
</script>

<style scoped></style>
