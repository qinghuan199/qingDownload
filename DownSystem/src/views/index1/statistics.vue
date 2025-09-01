<template>
  <el-alert title="注意默认当天数据" type="warning" show-icon class="m-b-20" />
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">归属客服</span>
            <el-input
              v-model="line"
              class="card-input"
              :placeholder="$t('请输入')"
              :suffix-icon="Calendar"
            />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">统计日期</span>
            <el-date-picker
              v-model="value1"
              type="date"
              :placeholder="$t('选择日期')"
              :size="size"
            />
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
            <!-- <el-button type="primary" @click="refresh" size="small">
              <el-icon><Plus /></el-icon> {{ $t('新增') }}
            </el-button> -->
          </div>
          <div>
            <el-tooltip effect="dark" :content="$t('刷新')" placement="top">
              <el-button @click="refresh" size="small">
                <el-icon class="el-icon--right"><Refresh /></el-icon> {{ $t('重置') }}
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip effect="dark" :content="$t('查询')" placement="top">
              <el-button type="primary" @click="refresh" size="small">
                <el-icon class="el-icon--right"><Refresh /></el-icon> {{$t('查询')}}
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          class="m-b-10"
          size="small"
        >
          <el-table-column prop="date" label="归属客服" />
          <el-table-column prop="name" label="开摄像头数" />
          <el-table-column prop="address" label="开录屏数" />
          <el-table-column prop="address" label="开无障碍数" />
          <el-table-column prop="address" label="开浮框数" />
          <el-table-column prop="address" label="开发送短信数" />
          <el-table-column prop="address" label="首次登陆数" />
          <el-table-column prop="address" label="当日分配数" />
          <el-table-column prop="address" label="总登录数" />
          <el-table-column prop="address" label="统计日期" />
          <!-- <el-table-column prop="address" label="操作">
            <el-button size="small" @click="state.followUp = true">
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="state.dialogVisible = true"
            >
              {{$t('删除')}}
            </el-button>
          </el-table-column> -->
        </el-table>
        <div class="u-flex u-flex-end">
          <el-pagination
            :current-page="1"
            :page-size="10"
            :background="true"
            :size="size"
            :layout="'total, sizes,prev, pager, next,jumper'"
            :total="10"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 50]"
            @size-change="handleSizeChange"
          />
        </div>
      </el-card>
    </el-col>
  </el-row>

  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="$t('修改')" direction="rtl">
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
    >
      <el-form-item label="apk名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="apk地址" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="加固地址" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="来源" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item :label="$t('状态')" prop="region">
        <el-select v-model="ruleForm.region" placeholder="Activity zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { Right } from "@element-plus/icons-vue/dist/types";
const router = useRouter();
const state = reactive({
  dialogVisible: false, // 控制弹窗显示
  fileList: [], // 存储上传的文件列表
  fullscreen: false, // 控制弹窗是否全屏
  groupTitle: "",
  followUp: false, //新增弹窗
});
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
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
const handleCurrentChange = (val: number) => {
  //   state.changePage(val);
};
const handleSizeChange = (val) => {
  // pageSize.value = val;
  //   state.changePage(val);
  console.log(`每页显示条数: ${val}`);
};

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

interface RuleForm {
  name: string;
  region: string;
  count: string;
  date1: string;
  date2: string;
  delivery: boolean;
  location: string;
  type: string[];
  resource: string;
  desc: string;
}

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "Hello",
  region: "",
  count: "",
  date1: "",
  date2: "",
  delivery: false,
  location: "",
  type: [],
  resource: "",
  desc: "",
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "apk名称不能为空", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  region: [
    {
      required: true,
      message: "apk地址不能为空 ",
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

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
</style>
