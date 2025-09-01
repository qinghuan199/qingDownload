<template>
  <el-row class="m-b-20">
    <div class="u-flex width-full u-flex-items-center u-flex-between m-b-20">
      <div>
        <el-button type="success" @click="save" size="small">
          <el-icon>
            <Document />
          </el-icon>
          {{ $t('保存') }}
        </el-button>
      </div>
      <div>
        <el-button type="primary" @click="openAddModal" size="small">
          <el-icon>
            <Plus />
          </el-icon>
          {{ $t('新增') }}
        </el-button>
        <el-divider direction="vertical" />
        <el-button @click="refresh" size="small">
          <el-icon class="el-icon--right">
            <Refresh />
          </el-icon>
          {{ $t('刷新') }}
        </el-button>
      </div>
    </div>
    <el-alert title="" type="warning" show-icon class="m-b-20">
      <text class="font-size-12" style="color: #000"> {{ $t('提示') }}：</text>
      <text class="font-size-12" style="color: red"> {{ $t('红色字体输入框可自行修改') }}</text></el-alert>
    <el-col>
      <el-card style="max-height: 550px; overflow: auto">
        <div class="u-flex u-flex-end m-t-10">
          <el-pagination :current-page="currentPage" :page-size="pageSize" :background="true"
            :layout="'total, sizes, prev, pager, next, jumper'" :total="totalRecords"
            @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 50]" @size-change="handleSizeChange" />
        </div>
        <div class="u-flex u-flex-between u-flex-wrap" style="max-height: 600px; overflow-y: auto">
          <el-card class="width-600 m-10" v-for="(item, index) in tableList" :key="item.id">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="item" :rules="rules" label-width="auto"
              :hide-required-asterisk="true" class="demo-ruleForm" label-position="left" :size="formSize" status-icon
              require-asterisk-position="right">
              <div class="u-flex u-flex-between m-b-10">
                <el-button type="primary" @click="copyRuleFormToClipboard(item)" size="small">
                  <el-icon>
                    <Document />
                  </el-icon>
                  {{ $t('复制') }}
                </el-button>
                <div>
                  <el-button type="primary" @click="openEditModal(item)" size="small">
                    {{ $t('编辑') }}
                  </el-button>
                  <el-button type="danger" :icon="Delete" @click="delDown(item.id)" size="small">
                    <el-icon>
                      <Delete />
                    </el-icon>
                    {{ $t('删除') }}
                  </el-button>
                </div>
              </div>
              <el-form-item :label="$t('落地页IP')" prop="ip">
                <el-input v-model="item.ip" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-row>
                <el-col :span="18">
                  <el-form-item :label="$t('网站名') + '/' + $t('ID')" prop="net">
                    <el-input v-model="item.net" :placeholder="$t('请输入')" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="id">
                    <el-input v-model="item.id" :placeholder="$t('请输入')" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item :label="$t('TOKEN')" prop="token">
                <el-input v-model="item.token" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item id="redFormItem" :label="$t('域名')" prop="domain">
                <el-input @blur="handleBlur(item)" v-model="item.domain" placeholder="http开头,每行一个" type="textarea" />
              </el-form-item>
              <el-form-item :label="$t('构建名')" prop="constructName">
                <el-input v-model="item.constructName" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item id="redFormItem" :label="$t('包名')" prop="packetName">
                <el-input @blur="handleBlur(item)" v-model="item.packetName" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item :label="$t('分支名')" prop="bransh">
                <el-input v-model="item.bransh" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item :label="$t('APK目录')" prop="apkFolder">
                <el-input v-model="item.apkFolder" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item :label="$t('APK文件名')" prop="apkName">
                <el-input v-model="item.apkName" :placeholder="$t('请输入')" />
              </el-form-item>

              <el-form-item id="redFormItem" :label="$t('APK同步')" prop="apkSyncType">
                <el-radio-group @change="handleBlur(item)" v-model="item.apkSyncType">
                  <el-radio value="0" :label="$t('oss')"></el-radio>
                  <el-radio value="1" :label="$t('bt')"></el-radio>
                  <el-radio value="2" :label="$t('不同步')"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="$t('APP名字')" prop="appName">
                <el-input v-model="item.appName" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item :label="$t('应用图标')" prop="icon">
                <img class="width-150 height-150 m-r-10" :src="item.icon" :alt="$t('应用图标')" />
              </el-form-item>
              <el-form-item :label="$t('签名')" prop="signFile">
                <text>{{ item.signFile }}</text>
              </el-form-item>
              <el-form-item :label="$t('签名密码')" prop="signPwd">
                <el-input v-model="item.signPwd" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item :label="$t('签名别名')" prop="signName1">
                <el-input v-model="item.signName1" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item :label="$t('签名别名密码')" prop="signName1Pwd">
                <el-input v-model="item.signName1Pwd" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item :label="$t('标识符')" prop="flag">
                <el-input v-model="item.flag" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item id="redFormItem" :label="$t('告警群')" prop="warnGroup">
                <el-input @blur="handleBlur(item)" v-model="item.warnGroup" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item id="redFormItem" :label="$t('备注')" prop="remark">
                <el-input @blur="handleBlur(item)" v-model="item.remark" :placeholder="$t('请输入')" />
              </el-form-item>
              <el-form-item :label="$t('技术负责人')" prop="dutyMan">
                <el-input v-model="item.dutyMan" :placeholder="$t('请输入')" />
              </el-form-item>
              <!-- <el-form-item>
                <el-button type="primary" @click="editForm">
                  编辑
                </el-button>
                <el-button @click="resetForm()">Reset</el-button>
              </el-form-item> -->
            </el-form>
          </el-card>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-dialog v-model="state.dialogVisible" :title="state.modalMode == 'edit' ? $t('编辑') : $t('新增')" width="600"
    :before-close="handleClose">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      :hide-required-asterisk="true" class="demo-ruleForm" label-position="left" :size="formSize" status-icon
      require-asterisk-position="right">
      <el-form-item :label="$t('落地页IP')" prop="ip">
        <el-input v-model="ruleForm.ip" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-row v-if="state.modalMode == 'edit'">
        <el-col :span="18">
          <el-form-item :label="$t('网站名')+'/'+$t('ID')" prop="net">
            <el-input v-model="ruleForm.net" :placeholder="$t('请输入')" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="id">
            <el-input disabled v-model="ruleForm.id" placeholder="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-else :label="$t('网站名')" prop="net">
        <el-input v-model="ruleForm.net" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('TOKEN')" prop="token">
        <el-input v-model="ruleForm.token" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('域名')" prop="domain">
        <el-input v-model="ruleForm.domain" type="textarea" placeholder="http开头,每行一个" />
      </el-form-item>
      <el-form-item :label="$t('构建名')" prop="constructName">
        <el-input v-model="ruleForm.constructName" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('包名')" prop="packetName">
        <el-input v-model="ruleForm.packetName" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('分支名')" prop="bransh">
        <el-input v-model="ruleForm.bransh" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('APK目录')" prop="apkFolder">
        <el-input v-model="ruleForm.apkFolder" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('APK文件名')" prop="apkName">
        <el-input v-model="ruleForm.apkName" :placeholder="$t('请输入')" />
      </el-form-item>

      <el-form-item :label="$t('APK同步')" prop="apkSyncType">
        <el-radio-group v-model="ruleForm.apkSyncType">
          <el-radio value="0" :label="$t('oss')"></el-radio>
          <el-radio value="1" :label="$t('bt')"></el-radio>
          <el-radio value="2" :label="$t('不同步')"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('APP名字')" prop="appName">
        <el-input v-model="ruleForm.appName" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('应用图标')" prop="icon">

        <imageUpload :modelValue="ruleForm.icon" :limit="1" :callback="handleFileUploaded"></imageUpload>
      </el-form-item>
      <el-form-item :label="$t('签名')" prop="signFile">

        <FileUpload :limit="1" :modelValue="ruleForm.signFile" :callback="handleFileUploaded1"></FileUpload>
      </el-form-item>
      <el-form-item :label="$t('签名密码')" prop="signPwd">
        <el-input v-model="ruleForm.signPwd" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('签名别名')" prop="signName1">
        <el-input v-model="ruleForm.signName1" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('签名别名密码')" prop="signName1Pwd">
        <el-input v-model="ruleForm.signName1Pwd" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('标识符')" prop="flag">
        <el-input v-model="ruleForm.flag" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('告警群')" prop="warnGroup">
        <el-input v-model="ruleForm.warnGroup" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('备注')" prop="remark">
        <el-input v-model="ruleForm.remark" :placeholder="$t('请输入')" />
      </el-form-item>
      <el-form-item :label="$t('技术负责人')" prop="dutyMan">
        <el-input v-model="ruleForm.dutyMan" :placeholder="$t('请输入')" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogVisible = false">{{ $t('取消') }}</el-button>
        <el-button v-if="state.modalMode == 'add'" type="primary" @click="handleConfirm">
          {{ $t('新增') }}
        </el-button>
        <el-button v-else type="primary" @click="editfallDown">
          {{ $t('确认') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="$t('修改')" direction="rtl"> </el-drawer>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage,ElMessageBox } from "element-plus";
import {
  getFallDownPage,
  setFallDownPage,
  delFallDownPage,
} from "@/api/system/fall";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { proxy } = getCurrentInstance();
const router = useRouter();
const state = reactive({
  dialogVisible: false, // 控制弹窗显示
  fileList: [], // 存储上传的文件列表
  fullscreen: false, // 控制弹窗是否全屏
  groupTitle: "",
  followUp: false, //新增弹窗
  switchValue: "", //开关
  color: "rgba(255, 69, 0, 0.68)", //颜色
  modelRadio: 0, //展示模型
  modalMode: "add", //新增
});

//图片上传成功回调方法
function handleFileUploaded(info) {
  ruleForm.icon = info.url;
  console.log("图片", ruleForm.icon);
}
//文件上传成功回调方法
function handleFileUploaded1(info) {
  ruleForm.signFile = info.url;
  console.log("图片", ruleForm.signFile);
}

const tableList = ref([]);
// 获取落地页列表
const getFallDown = () => {
  getFallDownPage({}).then((res) => {
    tableList.value = res.data;
    console.log("落地页数据", res.data);
  });
};

//新增弹窗
const openAddModal = () => {
  state.modalMode = "add";
  (ruleForm.ip = ""),
    (ruleForm.id = ""),
    (ruleForm.net = ""),
    (ruleForm.token = ""),
    (ruleForm.domain = ""),
    (ruleForm.constructName = ""),
    (ruleForm.packetName = ""),
    (ruleForm.bransh = ""),
    (ruleForm.apkFolder = ""),
    (ruleForm.apkName = ""),
    (ruleForm.apkSyncType = ""),
    (ruleForm.appName = ""),
    (ruleForm.icon = ""),
    (ruleForm.signFile = ""),
    (ruleForm.signPwd = ""),
    (ruleForm.signName1 = ""),
    (ruleForm.signName1Pwd = ""),
    (ruleForm.flag = ""),
    (ruleForm.warnGroup = ""),
    (ruleForm.dutyMan = ""),
    (ruleForm.remark = ""),
    (state.dialogVisible = true);
};
// 新增数据
const setfallDown = () => {
  setFallDownPage([
    {
      ip: ruleForm.ip, //落地页ip
      // id: ruleForm.id, //落地页id
      net: ruleForm.net, //网站id
      token: ruleForm.token,
      domain: ruleForm.domain, //域名
      constructName: ruleForm.constructName, //构建名
      packetName: ruleForm.packetName, //包名
      bransh: ruleForm.bransh, //分支
      apkFolder: ruleForm.apkFolder, //apk目录
      apkName: ruleForm.apkName, //apk名
      apkSyncType: ruleForm.apkSyncType, //apk同步
      appName: ruleForm.appName, //app名
      icon: ruleForm.icon, //图标路径
      signFile: ruleForm.signFile, //签名路径
      signPwd: ruleForm.signPwd, //签名密码
      signName1: ruleForm.signName1, //签名别名
      signName1Pwd: ruleForm.signName1Pwd, //签名别名密码
      flag: ruleForm.flag, //标识
      warnGroup: ruleForm.warnGroup, //告警群
      dutyMan: ruleForm.dutyMan, //技术负责人
      remark: ruleForm.remark, //Remark
    },
  ]).then((res) => {
    getFallDown();
    ElMessage({
      message: t('添加成功'),
      type: "success",
    });
    console.log("上传落地页数据", res.data);
  });
};


// 检查字段是否填写并返回
const checkIn = () => {
  // 定义需要检查的字段及其显示名称 
  const fieldsToCheck = [
    { name: t('落地页IP'), value: ruleForm.ip },
    { name: t('网站名'), value: ruleForm.net },
    { name: t('TOKEN'), value: ruleForm.token },
    { name: t('域名'), value: ruleForm.domain },
    { name: t('构建名'), value: ruleForm.constructName },
    { name: t('包名'), value: ruleForm.packetName },
    { name: t('分支'), value: ruleForm.bransh },
    { name: t('APK目录'), value: ruleForm.apkFolder },
    { name: t('APK名'), value: ruleForm.apkName },
    { name: t('APK同步'), value: ruleForm.apkSyncType },
    { name: t('APP名'), value: ruleForm.appName },
    { name: t('图标'), value: ruleForm.icon },
    { name: t('签名'), value: ruleForm.signFile },
    { name: t('签名密码'), value: ruleForm.signPwd },
    { name: t('签名别名'), value: ruleForm.signName1 },
    { name: t('签名别名密码'), value: ruleForm.signName1Pwd },
    { name: t('标识'), value: ruleForm.flag },
    { name: t('告警群'), value: ruleForm.warnGroup },
    { name: t('技术负责人'), value: ruleForm.dutyMan },
    { name: t('备注'), value: ruleForm.remark },
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
// 处理确认新增按钮的点击事件
const handleConfirm = async () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  await setfallDown(); // 调用保存数据的函数
  resetRuleForm(); // 重置表单
  state.dialogVisible = false; // 关闭对话框
};
//复制功能
const copyRuleFormToClipboard = (ruleForm) => {
  // 标签与属性名的映射
  const labels = {
    ip: t('落地页IP'),
    net: t('网站名'),
    token: t('TOKEN'),
    domain: t('域名'),
    constructName: t('构建名'),
    packetName: t('包名'),
    bransh: t('分支'),
    apkFolder:t('APK目录'),
    apkName: t('APK名'),
    apkSyncType: t('APK同步'),
    appName: t('APP名'),
    icon: t('图标'),
    signFile: t('签名'),
    signPwd: t('签名密码'),
    signName1: t('签名别名'),
    signName1Pwd: t('签名别名密码'),
    flag: t('标识'),
    warnGroup: t('告警群'),
    dutyMan: t('技术负责人'),
    remark: t('备注'),
  };
  // 创建一个数组，用于存储字段名和对应值的字符串
  const entries = Object.entries(ruleForm).map(([key, value]) => {
    const label = labels[key] || key; // 获取标签名
    return `${label}: ${value}`; // 格式化为 "标签名: 值"
  });

  // 将数组连接成一个字符串，每个字段占一行
  const ruleFormString = entries.join("\n");

  // 使用 Clipboard API 将字符串写入剪切板
  navigator.clipboard
    .writeText(ruleFormString)
    .then(() => {
      console.log("成功复制到剪切板");
      ElMessage({
        message: t('复制成功'),
        type: "success",
      });
    })
    .catch((err) => {
      console.error("复制到剪切板失败:", err);
    });
};

// 重置ruleForm 的内容
const resetRuleForm = () => {
  Object.keys(ruleForm).forEach((key) => {
    ruleForm[key] = ""; // 将每个属性清空
  });
};

//编辑弹窗
const openEditModal = (item) => {
  state.modalMode = "edit";
  ruleForm.ip = item.ip;
  ruleForm.id = item.id;
  ruleForm.net = item.net;
  ruleForm.token = item.token;
  ruleForm.domain = item.domain;
  ruleForm.constructName = item.constructName;
  ruleForm.packetName = item.packetName;
  ruleForm.bransh = item.bransh;
  ruleForm.apkFolder = item.apkFolder;
  ruleForm.apkName = item.apkName;
  ruleForm.apkSyncType = item.apkSyncType;
  ruleForm.appName = item.appName;
  ruleForm.icon = item.icon;
  ruleForm.signFile = item.signFile;
  ruleForm.signPwd = item.signPwd;
  ruleForm.signName1 = item.signName1;
  ruleForm.signName1Pwd = item.signName1Pwd;
  ruleForm.flag = item.flag;
  ruleForm.warnGroup = item.warnGroup;
  ruleForm.dutyMan = item.dutyMan;
  ruleForm.remark = item.remark;
  state.dialogVisible = true;
};

//编辑落地页表单
const editfallDown = () => {
  if (!checkIn()) {
    return; // 如果字段检查失败，则不继续执行
  }
  setFallDownPage([
    {
      ip: ruleForm.ip, //落地页ip
      id: ruleForm.id, //落地页id
      net: ruleForm.net, //网站id
      token: ruleForm.token,
      domain: ruleForm.domain, //域名
      constructName: ruleForm.constructName, //构建名
      packetName: ruleForm.packetName, //包名
      bransh: ruleForm.bransh, //分支
      apkFolder: ruleForm.apkFolder, //apk目录
      apkName: ruleForm.apkName, //apk名
      apkSyncType: ruleForm.apkSyncType, //apk同步
      appName: ruleForm.appName, //app名
      icon: ruleForm.icon, //图标路径
      signFile: ruleForm.signFile, //签名路径
      signPwd: ruleForm.signPwd, //签名密码
      signName1: ruleForm.signName1, //签名别名
      signName1Pwd: ruleForm.signName1Pwd, //签名别名密码
      flag: ruleForm.flag, //标识
      warnGroup: ruleForm.warnGroup, //告警群
      dutyMan: ruleForm.dutyMan, //技术负责人
      remark: ruleForm.remark, //备注
    },
  ]).then((res) => {
    getFallDown();
    ElMessage({
      message: t('修改成功'),
      type: "success",
    });
    state.dialogVisible = false;
    console.log("编辑落地页数据", res.data);
  });
};

// 删除落地页列表id
const delDown = (id) => {
  ElMessageBox.confirm(t('是否确认删除'), t('提示'), {
    confirmButtonText: t('确定'),
    cancelButtonText:t('取消'),
    type: "warning",
  }).then(() => {
    delFallDownPage(id) // 将 id 拼接为对象
      .then((res) => {
        getFallDown();
        console.log("删除成功,ID:", id);
        // 处理成功后的逻辑
      })
      .catch((error) => {
        console.error("删除失败:", error);
        // 处理错误
      });
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => { });

};

const disabled = ref(false);
const dialogVisible = ref(false);

const handlePictureCardPreview = (file) => {
  dialogVisible.value = true;
};

const handleDownload = (file) => {
  console.log(file);
};
const handleRemove = (file, fileList) => {
  state.fileList = fileList;
};

const imageUrl = ref("");

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

const ruleFormRef = ref();
const ruleForm = reactive({
  ip: "", //落地页ip
  net: "", //网站域名
  //id: "", //网站id
  token: "",
  domain: "", //域名
  constructName: "", //构建名
  packetName: "", //包名
  bransh: "", //分支
  apkFolder: "", //apk目录
  apkName: "", //apk名
  apkSyncType: "", //apk同步
  appName: "", //app名
  icon: "", //图标路径
  signFile: "", //签名路径
  signPwd: "", //签名密码
  signName1: "", //签名别名
  signName1Pwd: "", //签名别名密码
  flag: "", //标识
  warnGroup: "", //告警群
  dutyMan: "", //技术负责人
  remark: "", //备注
});

const rules = reactive({
  ip: [
    { required: true, message: "落地页ip不能为空", trigger: "blur" },
    // { min: 3, max: 50, message: "填写长度", trigger: "blur" },
  ],
  net: [{ required: true, message: "网站名不能为空", trigger: "blur" }],
  id: [{ required: true, message: "ID不能为空", trigger: "blur" }],
  token: [{ required: true, message: "token不能为空", trigger: "blur" }],
  domain: [{ required: true, message: "域名不能为空", trigger: "blur" }],
  constructName: [
    { required: true, message: "构建名不能为空", trigger: "blur" },
  ],
  packetName: [{ required: true, message: "包名不能为空", trigger: "blur" }],
  bransh: [{ required: true, message: "分支名不能为空", trigger: "blur" }],
  apkFolder: [{ required: true, message: "APK目录不能为空", trigger: "blur" }],

  apkName: [{ required: true, message: "APK文件名不能为空", trigger: "blur" }],
  apkSyncType: [
    { required: true, message: "apk同步不能为空", trigger: "blur" },
  ],

  appName: [{ required: true, message: "APP名字不能为空", trigger: "blur" }],
  icon: [{ required: true, message: "图标不能为空", trigger: "blur" }],
  signFile: [{ required: true, message: "签名不能为空", trigger: "blur" }],
  signPwd: [{ required: true, message: "签名密码不能为空", trigger: "blur" }],
  signName1: [{ required: true, message: "签名别名不能为空", trigger: "blur" }],
  signName1Pwd: [
    { required: true, message: "签名别名密码不能为空", trigger: "blur" },
  ],
  flag: [{ required: true, message: "标识不能为空", trigger: "blur" }],

  warnGroup: [{ required: true, message: "告警群不能为空", trigger: "blur" }],
  remark: [{ required: true, message: "备注不能为空", trigger: "blur" }],
  dutyMan: [{ required: true, message: "技术负责人不能为空", trigger: "blur" }],
});

//编辑落地页表单鼠标失焦
const handleBlur = (item) => {
  setFallDownPage([
    {
      ip: item.ip, //落地页ip
      id: item.id, //落地页id
      net: item.net, //网站
      token: item.token,
      domain: item.domain, //域名
      constructName: item.constructName, //构建名
      packetName: item.packetName, //包名
      bransh: item.bransh, //分支
      apkFolder: item.apkFolder, //apk目录
      apkName: item.apkName, //apk名
      apkSyncType: item.apkSyncType, //apk同步
      appName: item.appName, //app名
      icon: item.icon, //图标路径
      signFile: item.signFile, //签名路径
      signPwd: item.signPwd, //签名密码
      signName1: item.signName1, //签名别名
      signName1Pwd: item.signName1Pwd, //签名别名密码
      flag: item.flag, //标识
      warnGroup: item.warnGroup, //告警群
      dutyMan: item.dutyMan, //技术负责人
      remark: item.remark, //备注
    },
  ]).then((res) => {
    getFallDown();
    ElMessage({
      message: t('修改成功'),
      type: "success",
    });
    console.log("鼠标失焦编辑落地页数据", res.data);
  });
};

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const upload = ref();
const handleExceed = (files) => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};

const submitUpload = () => {
  upload.value.submit();
};

//刷新
const refresh = () => {
  ElMessage({
    message: t('刷新成功'),
    type: "success",
  });
  getFallDown();
};
//保存
const save = () => {
  ElMessage({
    message: t('保存成功'),
    type: "success",
  });
  getFallDown();
};
onMounted(() => {
  getFallDown();
});
</script>
<style lang="scss">
.el-color-picker__trigger {
  width: 100% !important;
}

#redFormItem .el-form-item__label {
  color: red;
}
</style>
