<template>
  <div>
    <el-row class="m-b-30" :gutter="10">
      <el-col :span="8">
        <el-card>
          <div>
            <el-radio-group v-model="state.tiemRadio" size="small">
              <el-radio-button label="今日" value="今日" />
              <el-radio-button label="昨天" value="昨天" disabled />
              <el-radio-button label="近三天" value="近三天" />
              <el-radio-button label="近七天" value="近七天" />
              <el-radio-button label="近30天" value="近30天" />
            </el-radio-group>
          </div>

          <div class="card-container">
            <div class="card">
              <countup class="card-num" :end="6666"></countup>
              <div class="card-title">今日在线人数</div>
            </div>
            <div class="card">
              <countup class="card-num" :end="6666"></countup>
              <div class="card-title">今日安装数</div>
            </div>
            <div class="card">
              <countup class="card-num" :end="6666"></countup>
              <div class="card-title">今日开权限数</div>
            </div>
            <div class="card">
              <countup class="card-num" :end="6666"></countup>
              <div class="card-title">保活率</div>
            </div>
            <div class="card">
              <countup class="card-num" :end="6666"></countup>
              <div class="card-title">总链接数量</div>
            </div>
            <div class="card">
              <countup class="card-num" :end="6666"></countup>
              <div class="card-title">总消息量</div>
            </div>
            <div class="card">
              <countup class="card-num" :end="6666"></countup>
              <div class="card-title">重连率</div>
            </div>
            <div class="card">
              <countup class="card-num" :end="6666"></countup>
              <div class="card-title">断线率</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card class="width-full">
          <div
            ref="chartContainer"
            class="chart"
            style="width: 100%; height: 400px"
          ></div>
          <!-- <v-chart class="chart" :option="dashOpt1" /> -->
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="m-b-20">
      <el-col :span="8">
        <el-card>
          <span>LG</span>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="100"
            size="small"
          >
            <el-table-column prop="type" label="系统" width="60" />
            <el-table-column prop="name" label="安装" width="60" />
            <el-table-column prop="state" label="在线" width="60" />
            <el-table-column prop="city" label="授权" width="60" />
            <el-table-column prop="address" label="在线率" width="60" />
            <el-table-column prop="zip" label="断线率" width="60" />
            <el-table-column prop="zip1" label="保活率" width="60" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="m-b-20">
      <el-col>
        <el-card>
          <div class="m-b-20 font-size-13">{{$t('设备详情')}}</div>
          <el-table :data="tableData" style="width: 100%" size="small">
            <el-table-column prop="type" :label="$t('设备号')" width="100" />
            <el-table-column prop="name"  :label="$t('来源')" width="100" />
            <el-table-column prop="state"  :label="$t('手机型号')" width="100" />
            <el-table-column prop="city" :label="$t('apk版本')" width="100" />
            <el-table-column prop="address" :label="$t('总链接数')" width="100" />
            <el-table-column prop="zip"  :label="$t('重连数')" width="100" />
            <el-table-column prop="zip1" :label="$t('断线数')"  width="100" />
            <el-table-column prop="zip1" :label="$t('消息数')" width="100" />
            <el-table-column prop="zip1" :label="$t('心跳数')" width="100" />
            <el-table-column prop="zip1" :label="$t('在线情况')" width="100">
              <el-tag type="success">{{$t('在线')}}</el-tag>
            </el-table-column>

            <el-table-column :label="$t('操作')">
              <template #default="scope">
                <el-button
                  size="small"
                  type="primary"
                  @click="handleDelete(scope.$index, scope.row)"
                >
                  {{$t('删除')}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="m-b-20">
      <el-col :span="8">
        <el-card>
          <span>LG</span>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="100"
            size="small"
          >
            <el-table-column prop="type" label="版本" width="60" />
            <el-table-column prop="name" label="安装" width="60" />
            <el-table-column prop="state" label="在线" width="60" />
            <el-table-column prop="city" label="授权" width="60" />
            <el-table-column prop="address" label="在线率" width="60" />
            <el-table-column prop="zip" label="断线率" width="60" />
            <el-table-column prop="zip1" label="保活率" width="60" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import countup from "../../components/countup.vue";
import * as echarts from "echarts";
const chartContainer = ref(null);

let chartInstance = null;
const state = reactive({
  tiemRadio: "今日",
});
const tableData = [
  {
    type: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    zip1: "0",
  },
  {
    type: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    zip1: "0",
  },
  {
    type: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    zip1: "0",
  },
  {
    type: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    zip1: "0",
  },
  {
    type: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    zip1: "0",
  },
];
const initChart = () => {
  if (chartContainer.value) {
    chartInstance = echarts.init(chartContainer.value);
    const option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: [
          "登陆用户(人数)",
          "摄像开启权限(人数)",
          "录像开启权限(人数)",
          "短信开启权限(人数)",
          "无障碍权限(人数)",
          "悬浮窗权限(人数)",
        ],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "登陆用户(人数)",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "摄像开启权限(人数)",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "录像开启权限(人数)",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "短信开启权限(人数)",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "无障碍权限(人数)",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
        {
          name: "悬浮窗权限(人数)",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    chartInstance.setOption(option);
  }
};
onMounted(() => {
  initChart();
  window.addEventListener("resize", () => {
    chartInstance && chartInstance.resize();
  });
});
</script>
<style lang="scss">
.card-container {
  display: flex;
  flex-wrap: wrap;
  // width: 80%;
  // margin: 0 auto;
  margin-top: 10px;
  .card {
    flex: 0 0 50%; /* 每个卡片占据50%宽度，一行两个 */
    height: 70px; /* 使用高度撑开卡片 */
    box-sizing: border-box;
    display: flex; /* 使用flexbox布局 */
    flex-direction: column;
    justify-content: center; /* 垂直居中 */
    align-items: center; /* 水平居中 */
    border-bottom: 1px dashed #ddd; /* 下方虚线分隔 */
    border-right: 1px dashed #ddd; /* 右侧虚线分隔 */
  }
  .card-num {
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 10px;
  }
  .card-title {
    font-size: 12px;
    color: #acacad;
  }
  /* 右边框样式在每行末尾的两个元素上去除 */
  .card:nth-child(2n) {
    border-right: none;
  }

  /* 最后一行去除底部边框 */
  .card:nth-last-child(-n + 2) {
    border-bottom: none;
  }
}

.chart {
  width: 100%;
  height: 400px;
}
</style>
