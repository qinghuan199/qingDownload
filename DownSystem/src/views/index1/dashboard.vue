<template>
  <div>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="6">
        <div class="cardBox bg1">
          <div class="title">今日登陆用户(人数)</div>
          <div class="u-flex u-flex-items-center u-flex-between">
            <el-icon class="card-icon">
              <User />
            </el-icon>

            <countup class="card-num" :end="6666" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="cardBox bg2">
          <div class="title">今日有效登陆用户(人数)</div>
          <div class="u-flex u-flex-items-center u-flex-between">
            <el-icon class="card-icon">
              <ChatDotRound />
            </el-icon>

            <countup class="card-num" :end="6666" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="cardBox bg3">
          <div class="title">近7日登陆用户(人数)</div>
          <div class="u-flex u-flex-items-center u-flex-between">
            <el-icon class="card-icon">
              <ChatDotRound />
            </el-icon>
            <countup class="card-num" :end="6666" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="cardBox bg2">
          <div class="title">近7日有效登陆用户(人数)</div>
          <div class="u-flex u-flex-items-center u-flex-between">
            <el-icon class="card-icon">
              <ChatDotRound />
            </el-icon>
            <countup class="card-num" :end="6666" />
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mgb20">
      <el-col :span="18">
        <el-card shadow="hover">
          <div
            ref="chartContainer"
            class="chart"
            style="width: 100%; height: 400px"
          ></div>

          <!-- <v-chart class="chart" :option="dashOpt1" /> -->
        </el-card>
      </el-col>
      <!-- <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-header">
            <p class="card-header-title">品类分布</p>
            <p class="card-header-desc">最近一个月销售商品的品类情况</p>
          </div>
          <v-chart class="chart" :option="dashOpt2" />
        </el-card>
      </el-col> -->
    </el-row>
    <!-- <el-row>
      <el-col>
        <el-card>
          <phone></phone>
        </el-card>
      </el-col>
    </el-row> -->

    <!-- <el-row :gutter="20">
      <el-col :span="7">
        <el-card shadow="hover" :body-style="{ height: '400px' }">
          <div class="card-header">
            <p class="card-header-title">时间线</p>
            <p class="card-header-desc">最新的销售动态和活动信息</p>
          </div>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :color="activity.color"
            >
              <div class="timeline-item">
                <div>
                  <p>{{ activity.content }}</p>
                  <p class="timeline-desc">{{ activity.description }}</p>
                </div>
                <div class="timeline-time">{{ activity.timestamp }}</div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="hover" :body-style="{ height: '400px' }">
          <div class="card-header">
            <p class="card-header-title">渠道统计</p>
            <p class="card-header-desc">最近一个月的订单来源统计</p>
          </div>
          <v-chart class="map-chart" :option="mapOptions" />
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="hover" :body-style="{ height: '400px' }">
          <div class="card-header">
            <p class="card-header-title">排行榜</p>
            <p class="card-header-desc">销售商品的热门榜单Top5</p>
          </div>
          <div>
            <div class="rank-item" v-for="(rank, index) in ranks">
              <div class="rank-item-avatar">{{ index + 1 }}</div>
              <div class="rank-item-content">
                <div class="rank-item-top">
                  <div class="rank-item-title">{{ rank.title }}</div>
                  <div class="rank-item-desc">销量：{{ rank.value }}</div>
                </div>
                <el-progress
                  :show-text="false"
                  striped
                  :stroke-width="10"
                  :percentage="rank.percent"
                  :color="rank.color"
                />
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row> -->
  </div>
</template>

<script setup name="dashboard">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import countup from "@/components/countup.vue";
// import phone from "../phone.vue";
import { BarChart, LineChart, PieChart, MapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
// import VChart from "vue-echarts";
// import { dashOpt1, dashOpt2, mapOptions } from "../chart/options";
// import chinaMap from "@/utils/china";
// registerMap("china", chinaMap);
const chartContainer = ref(null);
let chartInstance = null;

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

<style>
.card-body {
  display: flex;
  align-items: center;
  height: 100px;
  padding: 0;
}
</style>
<style scoped>
.card-content {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
  padding: 0 20px;
}

.cardBox {
  padding: 10px;
  color: #fff;
  border-radius: 10px;

  .title {
    padding-bottom: 20px;
  }

  .card-num {
    font-size: 25px;
  }

  .card-icon {
    font-size: 25px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }
}

.bg1 {
  background: linear-gradient(-45deg, #bd54a1, #e64889);
}

.bg2 {
  background: linear-gradient(-45deg, #5646b5, #815bbf);
}

.bg3 {
  background: linear-gradient(-45deg, #6f9fe4, #57caf2);
}

.bg4 {
  background: linear-gradient(-45deg, #f78554, #fbb828);
}

.color1 {
  color: #2d8cf0;
}

.color2 {
  color: #64d572;
}

.color3 {
  color: #f25e43;
}

.color4 {
  color: #e9a745;
}

.chart {
  width: 100%;
  height: 400px;
}

.card-header {
  padding-left: 10px;
  margin-bottom: 20px;
}

.card-header-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-header-desc {
  font-size: 14px;
  color: #999;
}

.timeline-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #000;
}

.timeline-time,
.timeline-desc {
  font-size: 12px;
  color: #787878;
}

.rank-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.rank-item-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f2f2f2;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
}

.rank-item-content {
  flex: 1;
}

.rank-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #343434;
  margin-bottom: 10px;
}

.rank-item-desc {
  font-size: 14px;
  color: #999;
}

.map-chart {
  width: 100%;
  height: 350px;
}
</style>
