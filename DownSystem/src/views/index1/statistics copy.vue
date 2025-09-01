<template>
  <div>
    <el-alert
      title="注意默认当天数据"
      type="warning"
      show-icon
      class="m-b-20"
    />
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
        :layout="'total, prev, pager,sizes, next,jumper'"
      >
        <template #toolbarBtn>
          <el-button
            type="warning"
            :icon="CirclePlusFilled"
            @click="visible = true"
            >{{ $t('新增') }}</el-button
          >
        </template>
      </TableCustom>
    </div>
    <el-dialog
      :title="isEdit ? '编辑' : $t('新增')"
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
      title="查看详情"
      v-model="visible1"
      width="700px"
      destroy-on-close
    >
      <TableDetail :data="viewData"></TableDetail>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

// 查询相关
const query = reactive({
  name: "",
});
const searchOpt = ref([
  { type: "input", label: "用户名：", prop: "name" },
  { type: "date", label: "选择日期", prop: "name" },
]);
const handleSearch = () => {
  changePage(1);
};

// 表格相关
let columns = ref([
  { type: "index", label: "归属客服", width: 55, align: "center" },
  { prop: "name", label: "开摄像头数" },
  { prop: "phone", label: "开录屏数" },
  { prop: "role", label: "开无障碍数" },
  { prop: "role", label: "开浮框数" },
  { prop: "role", label: "开发送短信数" },
  { prop: "role", label: "首次登陆数" },
  { prop: "role", label: "当日分配数" },
  { prop: "role", label: "总登陆数" },
  { prop: "date", label: "统计日期" },
  { prop: "operator", label: "操作", width: 250 },
]);
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
});
const tableData = ref([]);
const getData = async () => {
  //   const res = await fetchUserData();
  //   tableData.value = res.data.list;
  //   page.total = res.data.pageTotal;
};
getData();

const changePage = (val) => {
  page.index = val;
  getData();
};

// 新增/编辑弹窗相关
let options = ref({
  labelWidth: "100px",
  span: 12,
  list: [
    { type: "input", label: "用户名", prop: "name", required: true },
    { type: "input", label: "手机号", prop: "phone", required: true },
    { type: "input", label: "密码", prop: "password", required: true },
    { type: "input", label: "邮箱", prop: "email", required: true },
    { type: "input", label: "角色", prop: "role", required: true },
  ],
});
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = () => {
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
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
  row: {},
  list: [],
});
const handleView = () => {
  viewData.value.row = { ...row };
  viewData.value.list = [
    {
      prop: "id",
      label: "用户ID",
    },
    {
      prop: "name",
      label: "用户名",
    },
    {
      prop: "password",
      label: "密码",
    },
    {
      prop: "email",
      label: "邮箱",
    },
    {
      prop: "phone",
      label: "电话",
    },
    {
      prop: "role",
      label: "角色",
    },
    {
      prop: "date",
      label: "注册日期",
    },
  ];
  visible1.value = true;
};

// 删除相关
const handleDelete = () => {
  ElMessage.success("删除成功");
};
</script>

<style scoped></style>
