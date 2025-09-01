<template>
  <el-row class="m-b-20">
    <el-col>
      <el-card>
        <div
          class="u-flex u-flex-center u-flex-items-center width-full height-30 font-size-12 radius-5"
          style="background-color: #f7f7fa; line-height: 30px"
        >
          <div
            style="
              width: 50%;
              background-color: #fff;
              height: 25px;
              border-radius: 5px;
              margin: 0 4px;
            "
            class="text-center"
          >
            {{ $t('视频流列表') }}
          </div>
          <div style="width: 50%" class="text-center">{{ $t('客户端列表') }}</div>
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
              <el-icon><Plus /></el-icon> {{$t('新增')}}
            </el-button>
            <el-divider direction="vertical" />
            <el-button type="warning" @click="refresh" size="small">
              <el-icon><Document /></el-icon>
              导出已注册数据
            </el-button> -->
          </div>
          <div>
            <el-tooltip effect="dark" :content="$t('刷新')" placement="top">
              <el-button @click="refresh" size="small">
                <el-icon class="el-icon--right"><Refresh /></el-icon> {{$t('刷新')}}
              </el-button>
            </el-tooltip>
            <!-- <el-divider direction="vertical" />
            <el-tooltip effect="dark" :content="$t('查询')" placement="top">
              <el-button type="primary" @click="refresh" size="small">
                <el-icon class="el-icon--right"><Refresh /></el-icon> {{$t('查询')}}
              </el-button>
            </el-tooltip> -->
          </div>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          class="m-b-10"
          size="small"
        >
          <el-table-column prop="date" :label="$t('ID')" />
          <el-table-column prop="name" :label="$t('流名称')" />
          <el-table-column prop="address" :label="$t('vhost')" />
          <el-table-column prop="address" :label="$t('状态')" />
          <el-table-column prop="address" :label="$t('在线人数')" />
          <el-table-column prop="address" :label="$t('入口宽度')" />
          <el-table-column prop="address" :label="$t('出口宽度')" />
          <el-table-column prop="address" :label="$t('视频信息')" />

          <el-table-column prop="address" :label="$t('操作')">
            <el-button size="small"> {{$t('编辑')}} </el-button>
            <el-button
              type="primary"
              size="small"
              @click="state.dialogVisible = true"
            >
              {{$t('导入数据')}}
            </el-button>
          </el-table-column>
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

  <!-- 导入数据弹窗 -->
  <el-dialog
    v-model="state.dialogVisible"
    :title="$t('上传 Excel 文件')"
    width="600px"
    :fullscreen="state.fullscreen"
  >
    <template #header>
      <span>{{ $t('上传 Excel 文件') }}</span>
      <div style="float: right">
        <el-button type="text" icon="el-icon-minus" @click="minimize" />
        <!-- <el-button type="text" @click="toggleFullScreen">
            <el-icon><Rank /></el-icon>
          </el-button> -->
      </div>
    </template>

    <!-- 上传区域 -->
    <el-upload
      class="upload-demo"
      drag
      action="#"
      multiple
      :file-list="state.fileList"
      :auto-upload="false"
      :on-change="handleFileChange"
      :on-remove="handleRemove"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">{{ $t('将文件拖到此处，或') }}<em>{{ $t('点击上传') }}</em></div>
      <div class="el-upload__tip" slot="tip">{{ $t('仅支持 Excel 格式文件') }}</div>
    </el-upload>

    <!-- 显示上传的文件信息 -->
    <div v-if="state.fileList.length" class="file-list">
      <h4>{{ $t('上传的文件：') }}</h4>
      <ul>
        <li v-for="(file, index) in state.fileList" :key="index">
          {{ file.name }} - {{ (file.size / 1024).toFixed(2) }} KB
        </li>
      </ul>
    </div>

    <!-- 弹窗的底部操作按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.dialogVisible = false">{{$t('取消')}}</el-button>
        <el-button type="primary" @click="submitUpload">{{$t('提交')}}</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 新增弹窗 -->
  <el-drawer v-model="state.followUp" :title="$t('添加')" direction="rtl">
    <div class="m-b-10">{{ $t('分组标题') }} <span class="font-red">*</span></div>
    <el-input
      v-model="state.groupTitle"
      class="card-input"
      :placeholder="$t('请输入')"
    ></el-input>
  </el-drawer>
</template>
<script setup lang="ts">
import { reactive } from "vue";

import { useRouter } from "vue-router";
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
