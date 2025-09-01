<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div class="u-flex u-flex-wrap">
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{$t('中文')}}</span>
            <el-input v-model="translateData.chineseName" class="card-input" :placeholder="$t('请输入')" />
          </div>
          <div class="u-flex u-flex-items-center box-card-input">
            <span class="card-title">{{$t('平台')}}</span>
            <el-input v-model="translateData.platform" class="card-input" :placeholder="$t('请输入')" />
          </div>
          <!-- <div class="u-flex u-flex-items-center box-card-input">
              <span class="card-title">状态</span>
              <el-select v-model="translateData.status" :placeholder="$t('请选择')" size="" class="card-input">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
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
            <el-button type="primary" @click="openAddModal" size="small">
              <el-icon>
                <Plus />
              </el-icon> {{ $t('新增') }}
            </el-button>
          </div>
          <div>
            <el-tooltip effect="dark" :content="$t('刷新')" placement="top">
              <el-button @click="refresh" size="small">
                <el-icon class="el-icon--right">
                  <Refresh />
                </el-icon> {{ $t('重置') }}
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical" />
            <el-tooltip effect="dark" :content="$t('查询')" placement="top">
              <el-button type="primary" @click="searchTranslate" size="small">
                <el-icon class="el-icon--right">
                  <Refresh />
                </el-icon> {{$t('查询')}}
              </el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table v-loading="loading" :data="tableData" style="width: 100%" class="m-b-10">
          <el-table-column prop="chineseName" :label="$t('中文')" />
          <el-table-column prop="hk" :label="$t('繁体')" />
          <el-table-column  prop="englishName" :label="$t('英文')" />
          <el-table-column  prop="thailandName" :label="$t('泰语')" />
          <el-table-column  prop="indiaName" :label="$t('印度语')" />
          <el-table-column  prop="mashName" :label="$t('马来西亚语')" />
          <el-table-column  prop="vietnamName"  :label="$t('越南')"/>
          <el-table-column  prop="singaporeName" :label="$t('新加坡语')" />
          <el-table-column prop="platform" :label="$t('平台')" />
          <el-table-column prop="" :label="$t('操作')">
            <template #default="scope">
              <el-button size="small" @click="openEditModal(scope.row)">
                {{$t('编辑')}}
              </el-button>
              <el-button type="danger" size="small" @click="delTranslat(scope.row.id)">
                {{$t('删除')}}
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

  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="state.modalMode == 'edit' ? $t('编辑')  : $t('新增')" direction="rtl">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" label-position="top" :size="formSize" status-icon require-asterisk-position="right"
      :hide-required-asterisk="true">
      <el-form-item :label="$t('中文')" prop="chineseName">
        <el-input v-model="ruleForm.chineseName" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('繁体')" prop="hk">
        <el-input v-model="ruleForm.hk" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('英文')" prop="englishName">
        <el-input v-model="ruleForm.englishName" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('泰语')" prop="thailandName">
        <el-input v-model="ruleForm.thailandName" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('印度语')" prop="indiaName">
        <el-input v-model="ruleForm.indiaName" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('马来西亚语')" prop="mashName">
        <el-input v-model="ruleForm.mashName" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('越南')" prop="vietnamName">
        <el-input v-model="ruleForm.vietnamName" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('新加坡语')" prop="singaporeName">
        <el-input v-model="ruleForm.singaporeName" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('品牌')" prop="brand">
        <el-input v-model="ruleForm.brand" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('翻译秘钥')" prop="strKeys">
        <el-input v-model="ruleForm.strKeys" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item>
        <template #label>{{ $t('是否全局') }}
          <span style="color: red;">*</span>
        </template>
        <el-select v-model="ruleForm.isGlobal" :placeholder="$t('请选择')" size="" class="card-input">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('平台')" prop="platform">
        <el-input v-model="ruleForm.platform" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item>
        <el-button v-if="state.modalMode == 'edit'" type="primary" @click="editTranslate">{{$t('确认')}}</el-button>
        <el-button v-else type="primary" @click="setBank">{{$t('确认')}}</el-button>
      </el-form-item>

    </el-form>
  </el-drawer>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage,ElMessageBox } from "element-plus";
import { getTranslatePage, setTranslatePage, delTranslatePage } from "@/api/system/translate";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter();
const { proxy } = getCurrentInstance();
const state = reactive({
  dialogVisible: false, // 控制弹窗显示
  fileList: [], // 存储上传的文件列表
  fullscreen: false, // 控制弹窗是否全屏
  groupTitle: "",
  followUp: false, //新增弹窗
  modalMode: 'add', //新增
});
const loading = ref(true);
const translateData = reactive({
  chineseName: '',
  platform: '',
})
const options = [
  {
    value: "true",
    label: t('是'),
  },
  {
    value: "false",
    label: t('否'),
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
  chineseName: "",
  hk: "",
  englishName: "",
  thailandName: "",
  indiaName: "",
  mashName: "",
  vietnamName: "",
  singaporeName: "",
  brand: "",
  platform: "",
  strKeys:"",
  isGlobal: "",
});

const rules = reactive({
  chineseName: [
    { required: true, message:t('中文')+t('不能为空'), trigger: "blur" },
  ],
  platform: [
    { required: true, message: t('平台')+t('不能为空'), trigger: "blur" },
  ],
  isGlobal: [
    { required: true, message:t('全局')+t('不能为空'), trigger: "blur" },
  ],
});

//查询 

const searchTranslate = () => {
  loading.value = true

  getTranslatePage({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    platform: translateData.platform,
    chineseName: translateData.chineseName,

  }).then((res) => {
    if (res.data && res.data.records) {
      tableData.value = res.data.records;
      totalRecords.value = res.data.total;
      loading.value = false
      console.log("搜索翻译列表数据", res.data.records);
    }
  }).catch((error) => {
    console.error("搜索翻译列表数据失败", error);
  });
};

const tableData = ref([]);
// 获取翻译列表数据
const getTranslate = () => {
  loading.value = true
  getTranslatePage({
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    platform: translateData.platform,
    chineseName: translateData.chineseName,

  }).then((res) => {
    if (res.data && res.data.records) {
      loading.value = false
      tableData.value = res.data.records;
      totalRecords.value = res.data.total;
      console.log("获取翻译列表数据", res.data.records);
    }
  }).catch((error) => {
    console.error("获取翻译列表数据失败", error);
  });
};
//新增弹窗
const openAddModal = () => {
  state.modalMode = 'add';
  ruleForm.chineseName = "";
  ruleForm.hk = "";
  ruleForm.englishName = "";
  ruleForm.thailandName = "";
  ruleForm.indiaName = "";
  ruleForm.mashName = "";
  ruleForm.vietnamName = "";
  ruleForm.singaporeName = "";
  ruleForm.brand = "";
  ruleForm.platform = "";
  ruleForm.strKeys = "";
  ruleForm.isGlobal = "";
  state.followUp = true;
};
// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称  
  const fieldsToCheck = [
    { name: t('中文'), value: ruleForm.chineseName },
    { name: t('品牌'), value: ruleForm.brand },
    { name: t('平台'), value: ruleForm.platform },
    { name: t('全局'), value: ruleForm.isGlobal },
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
//新增数据 
const setBank = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setTranslatePage({
    chineseName: ruleForm.chineseName,
    hk: ruleForm.hk,
    englishName: ruleForm.englishName,
    thailandName: ruleForm.thailandName,
    indiaName: ruleForm.indiaName,
    mashName: ruleForm.mashName,
    vietnamName: ruleForm.vietnamName,
    singaporeName: ruleForm.singaporeName,
    brand: ruleForm.brand,
    platform: ruleForm.platform,
    strKeys:ruleForm.strKeys,
    isGlobal: ruleForm.isGlobal,
  })
    .then((res) => {
      getTranslate();
      state.followUp = false;
      ElMessage({
        message:  t('添加成功'),
        type: 'success',
      })
      console.log("保存数据成功", res.data);
    })
    .catch((error) => {
      console.error("保存数据失败", error);
    });
};

//编辑弹窗
const selectedRowId = ref(null); // ID of the row being edited
const openEditModal = (row) => {
  state.modalMode = 'edit';
  selectedRowId.value = row.id;
  ruleForm.chineseName = row.chineseName;
  ruleForm.hk = row.hk;
  ruleForm.englishName = row.englishName;
  ruleForm.thailandName = row.thailandName;
  ruleForm.indiaName = row.indiaName;
  ruleForm.mashName = row.mashName;
  ruleForm.vietnamName = row.vietnamName;
  ruleForm.singaporeName = row.singaporeName;
  ruleForm.brand = row.brand;
  ruleForm.platform = row.platform;
  ruleForm.strKeys = row.strKeys;
  ruleForm.isGlobal = row.isGlobal;
  state.followUp = true;

};
//编辑数据 
const editTranslate = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setTranslatePage({
    id: selectedRowId.value,
    chineseName: ruleForm.chineseName,
    hk: ruleForm.hk,
    englishName: ruleForm.englishName,
    thailandName: ruleForm.thailandName,
    indiaName: ruleForm.indiaName,
    mashName: ruleForm.mashName,
    vietnamName: ruleForm.vietnamName,
    singaporeName: ruleForm.singaporeName,
    brand: ruleForm.brand,
    platform: ruleForm.platform,
    strKeys: ruleForm.strKeys,
    isGlobal: ruleForm.isGlobal,

  })
    .then((res) => {
      getTranslate();
      state.followUp = false;
      ElMessage({
        message: t('修改成功'),
        type: 'success',
      })
      console.log("保存数据成功", res.data);
    })
    .catch((error) => {
      console.error("保存数据失败", error);
    });
};

// 删除人员id
const delTranslat = (id) => {
  ElMessageBox.confirm(t('是否确认删除'), t('提示'), {
    confirmButtonText: t('确定'),
    cancelButtonText:t('取消'),
    type: "warning",
  }).then(() => {
    delTranslatePage(id) // 将 id 拼接为对象
    .then((res) => {
      console.log('删除成功,ID:', id);
      getTranslate(); // 删除成功后刷新列表
    })
    .catch((error) => {
      console.error('删除失败:', error);
      // 处理错误
    });
    proxy.$modal.msgSuccess(t('删除成功'));
  }).catch(() => {});

};


//重置表单
const resetForm = () => {
  ruleForm.chineseName = "";
  ruleForm.platform = "";
};

//分页
const currentPage = ref(1);
const pageSize = ref(10);
const totalRecords = ref(0);
const handleCurrentChange = (page) => {
  currentPage.value = page;
  console.log('跳转到第', currentPage.value, '页');
  getTranslate(page); // 获取新的数据
};

const handleSizeChange = (size) => {
  pageSize.value = size;
  currentPage.value = 1; // 重置到第一页
  getTranslate(); // 获取新的数据
};
//刷新当前数据
const refresh = () => {
  translateData.chineseName = "";
  translateData.platform = "";
  ElMessage({
    message: t('刷新成功'),
    type: 'success',
  })
  resetForm()  //重置必须放在刷新前面
  getTranslate(); // 重新获取数据

};

onMounted(() => {
  getTranslate();
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