<template>
  <div>
    <canvas
      ref="canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @click="handleCanvasClick"
    ></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import Cookies from "js-cookie";
import { getUserId } from "@/utils/auth";
import phoneStore from "@/store/modules/controlPhone";
import { nanoid } from "nanoid";
// import Log from "@/views/monitor/job/log.vue";
// import { fa } from "element-plus/es/locale";

let layoutData = "";
const route = useRoute();
const wsUrl = "Wss://cloud1788.com/ws";
let intervalId = null; // 定时器 ID

let socket;
// 设置目标屏幕分辨率
const canvasWidth = 360;
const canvasHeight = 644;

// 设置原始数据的分辨率 华为
// const originalWidth = 1080;
// const originalHeight = 2240;
let originalWidth, originalHeight;

if (route.query.resolution) {
  [originalWidth, originalHeight] = route.query.resolution
    .split("*")
    .map(Number);
}
// 设置原始数据的分辨率 三星
// const originalWidth = 1440;
// const originalHeight = 3040;
console.log(originalWidth, originalHeight);

// 计算缩放比例
const scaleX = canvasWidth / originalWidth;
const scaleY = canvasHeight / originalHeight;
// 滑动偏移量，控制内容的滚动
let scrollY = 0;
let maxScrollY = 0; // 最大滚动距离，用于限制滚动范围
// 设置 Canvas 引用
const canvas = ref(null);
let rectangles = [];

// // 绘制单个矩形，使用缩放比例
// const drawRect = (ctx, bounds, color = "#000", text = "") => {
//   const { left, top, right, bottom } = bounds;
//   const width = (right - left) * scaleX;
//   const height = (bottom - top) * scaleY;

//   if (text) {
//     // 如果有文本或描述，填充背景色
//     ctx.fillStyle = color;
//     ctx.fillRect(left * scaleX, top * scaleY, width, height);
//   }

//   ctx.strokeStyle = "rgb(247.5, 227.1, 196.5)";
//   ctx.lineWidth = 0; // 可以调节线宽适配屏幕
//   ctx.strokeRect(left * scaleX, top * scaleY, width, height);
//   // 如果有文本，绘制文本
//   if (text) {
//     ctx.font = "12px Arial";
//     ctx.fillStyle = "black";
//     ctx.fillText(text, left * scaleX + 5, top * scaleY + 15); // 将文字放在矩形的左上角
//   }
//   // 存储矩形的位置信息和文本，用于点击事件判断
//   rectangles.push({
//     bounds: {
//       left: left * scaleX,
//       top: top * scaleY,
//       right: right * scaleX,
//       bottom: bottom * scaleY,
//     },
//     text: text,
//   });
// };

// // 递归绘制所有子组件，应用缩放比例
// const drawChilds = (ctx, parent, level = 0) => {
//   if (!parent || !parent.boundsInScreen) {
//     return;
//   }

//   const importantTypes = [
//     "android.widget.ImageView",
//     "android.widget.TextView",
//     "android.widget.CheckBox",
//     "android.widget.Button",
//     "android.widget.FrameLayout",
//     "android.widget.EditText",
//   ];
//   const currentColor = importantTypes.includes(parent.className)
//     ? "rgb(216.8, 235.6, 255)"
//     : "";

//   // 确定要显示的文本内容
//   let textToShow = "";
//   // if (importantTypes.includes(parent.className)) {
//   //   if (
//   //     parent.className === "android.widget.ImageView" ||
//   //     parent.className === "android.widget.TextView"
//   //   ) {
//   //     textToShow = parent.text || parent.desc;
//   //   } else {
//   //   }
//   // }
//   textToShow = parent.text || parent.desc || "";

//   // if (importantTypes.includes(parent.className)) {

//   // if (parent.packageName === "com.miui.home") {
//   //   textToShow = parent.text;
//   // }

//   // if (parent.packageName === "com.android.systemui") {
//   //   textToShow = parent.desc;
//   // }

//   // }
//   // textToShow = parent.className;
//   // 绘制当前组件的矩形
//   // if (parent.className != "android.widget.LinearLayout") {
//   drawRect(ctx, parent.boundsInScreen, currentColor, textToShow);
//   // }

//   // 递归绘制子组件
//   if (parent.childs && parent.childs.length > 0) {
//     parent.childs.forEach((child) => {
//       drawChilds(ctx, child, level + 1);
//     });
//   }
// };

// 绘制单个矩形，使用缩放比例
const drawRect = (ctx, bounds, color = "#000", text = "") => {
  const { left, top, right, bottom } = bounds;
  const width = (right - left) * scaleX;
  const height = (bottom - top) * scaleY;

  // 填充背景色
  ctx.fillStyle = color;
  ctx.fillRect(left * scaleX, top * scaleY, width, height);

  ctx.strokeStyle = "rgb(247.5, 227.1, 196.5)";
  ctx.lineWidth = 0; // 可以调节线宽适配屏幕
  ctx.strokeRect(left * scaleX, top * scaleY, width, height);

  // 如果有文本，绘制文本
  if (text) {
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    const textWidth = ctx.measureText(text).width;
    const textX = left * scaleX + (width - textWidth) / 2;
    const textY = top * scaleY + height / 2 + 6; // 6是近似的垂直偏移量以居中

    ctx.fillText(text, textX, textY);
  }

  // 存储矩形的位置信息和文本，用于点击事件判断
  rectangles.push({
    bounds: {
      left: left * scaleX,
      top: top * scaleY,
      right: right * scaleX,
      bottom: bottom * scaleY,
    },
    text: text,
  });
};

// 递归绘制所有子组件，应用缩放比例
const drawChilds = (ctx, parent, level = 0) => {
  if (!parent || !parent.boundsInScreen) {
    return;
  }

  const importantTypes = [
    "android.widget.ImageView",
    "android.widget.TextView",
    "android.widget.CheckBox",
    "android.widget.Button",
    "android.widget.EditText",
  ];

  const layoutTypes = [
    "android.widget.FrameLayout",
    "android.widget.LinearLayout",
    "android.view.ViewGroup",
    "android.widget.RelativeLayout",
    // 移除 以确保其被绘制
  ];

  // 根据类型选择颜色
  let currentColor = "";
  if (importantTypes.includes(parent.className)) {
    currentColor = "rgb(216.8, 235.6, 255)"; // 蓝色
  } else if (layoutTypes.includes(parent.className)) {
    currentColor = "rgb(200, 200, 200)"; // 灰色
  } else {
    currentColor = "rgb(255, 255, 255)"; // 白色，默认颜色
  }

  // 确定要显示的文本内容
  let textToShow = parent.text || parent.desc || "";

  // 绘制逻辑：如果描述为空，只绘制子节点
  if (!parent.desc) {
    if (parent.childs && parent.childs.length > 0) {
      parent.childs.forEach((child) => {
        drawChilds(ctx, child, level + 1);
      });
    }
  } else {
    // 如果描述不为空且不是布局类型，绘制矩形
    if (!layoutTypes.includes(parent.className)) {
      drawRect(ctx, parent.boundsInScreen, currentColor, textToShow);
    }
  }

  // 始终递归绘制子节点
  if (parent.childs && parent.childs.length > 0) {
    parent.childs.forEach((child) => {
      drawChilds(ctx, child, level + 1);
    });
  }
};

// 初始化并绘制界面
const drawLayout = () => {
  const ctx = canvas.value.getContext("2d");
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  rectangles = []; // 清空旧的矩形数据

  // 从根节点开始绘制
  drawChilds(ctx, layoutData.nodeInfo);
  // 计算最大滚动范围，布局内容高度 - 屏幕高度
  const contentHeight = originalHeight + scrollY;
  maxScrollY = Math.max(0, contentHeight - canvasHeight / scaleY);
};

// 数据处理
const handleWebSocketData = (message) => {
  try {
    layoutData = JSON.parse(message.data);
    if (layoutData.logInfo != undefined) {
      phoneStore().setGlobalText(layoutData.logInfo.content);
    }
    if (layoutData.nodeInfo != undefined) {
      // console.log("layoutData", layoutData.nodeInfo);
      // phoneStore().setGlobalText(message);// 后去全局文本
      drawLayout(); // 收到数据后重新绘制
      // getCeshiNode(layoutData.nodeInfo);
      // console.log("111");
    }
  } catch (error) {
    console.error("链接错误", error);
  }
};

const getCeshiNode = (data) => {
  console.log("getCeshiNode", data);

  var b = false;
  var anode = null;
  console.log(data.childs.length);
  for (var i = 0; data.childs.length; i++) {
    var node = data.childs[i];

    b = getChild(node);
    if (b) {
      data.nodeInfo.childs = new Array();
      data.nodeInfo.childs[0] = anode;
      break;
    }
  }
  // console.log("anode", anode);
};

const getChild = (node) => {
  console.log("node", node);
  if (node == undefined) {
    return false;
  }
  if (node.selected) {
    return true;
  }
  var tmp = node.childs;
  if (tmp == null || tmp == undefined) {
    return false;
  }
  if (tmp != null && tmp.length > 0) {
    for (var i = 0; i < tmp.length; i++) {
      var c = tmp[i];
      if (c.selected) {
        return true;
      } else {
        return getChild(c);
      }
    }
  } else {
    return false;
  }
};

// // 处理 Canvas 点击事件
// const handleCanvasClick = (event) => {
//   const rect = canvas.value.getBoundingClientRect(); // 获取 Canvas 元素的边界
//   const canvasX = event.clientX - rect.left; // 计算点击的 x 坐标
//   const canvasY = event.clientY - rect.top; // 计算点击的 y 坐标

//   console.log("rect", rect);

//   const relativeX = canvasX / rect.width; // X 轴相对坐标 (0-1)
//   const relativeY = canvasY / rect.height; // Y 轴相对坐标 (0-1)

//   console.log(`Canvas坐标: (${canvasX}, ${canvasY})`);
//   console.log(`相对坐标 (0-1): (${relativeX}, ${relativeY})`);

//   // 遍历所有矩形，检查点击的坐标是否在某个矩形内
//   rectangles.forEach((rectangle) => {
//     const { left, top, right, bottom } = rectangle.bounds;

//     // 需要根据 0-1 范围的坐标进行比较，假设 rectangle.bounds 也是相对坐标
//     if (
//       relativeX >= left &&
//       relativeX <= right &&
//       relativeY >= top &&
//       relativeY <= bottom
//     ) {
//       console.log("点击了矩形:", rectangle.text, relativeX, relativeY);
//       // phoneStore().setDynamicParams({
//       //   terminal: 1, //终端类型1为管理终端  必传
//       //   packType: 2, //必传
//       //   userId: route.query.deviceId, //发给哪个终端 //必传
//       //   adminId: Cookies.get("UUID"), //必传
//       //   reqId: nanoid(), //必传
//       //   respOfReqId: "",
//       //   touchXY: {
//       //     duration: "50",
//       //     point: [
//       //       {
//       //         x: relativeX, // 使用相对坐标 x
//       //         y: relativeY, // 使用相对坐标 y
//       //       },
//       //     ],
//       //     point: [
//       //       {
//       //         x: relativeX, // 使用相对坐标 x
//       //         y: relativeY, // 使用相对坐标 y
//       //       },
//       //     ],
//       //     point: [
//       //       {
//       //         x: relativeX, // 使用相对坐标 x
//       //         y: relativeY, // 使用相对坐标 y
//       //       },
//       //     ],
//       //   },
//       // });
//     }
//   });
// };

let startX = 0;
let startY = 0;
let isDragging = false;
let isScrolling = false;
let swipeDirection = "none";
let pressStartTime = 0; // 记录按下时的时间
let swipeDuration = 0; // 记录滑动的时长
let swipePath = []; // 记录滑动路径的数组

const SWIPE_THRESHOLD = 50; // 滑动阈值

// 处理鼠标按下
const handleMouseDown = (event) => {
  const rect = canvas.value.getBoundingClientRect(); // 获取 Canvas 元素的边界
  startX = (event.clientX - rect.left) / rect.width; // 相对于 canvas 的 0-1 范围 X 坐标
  startY = (event.clientY - rect.top) / rect.height; // 相对于 canvas 的 0-1 范围 Y 坐标
  isDragging = true; // 鼠标按下，开始拖动
  isScrolling = false;
  pressStartTime = Date.now(); // 记录按下的时间
  swipePath = []; // 重置滑动路径数组
  // console.log("鼠标按下（0-1 范围）：", startX, startY);
};

// 处理鼠标移动
const handleMouseMove = (event) => {
  if (!isDragging) return; // 只有在按下鼠标后才处理移动

  const rect = canvas.value.getBoundingClientRect(); // 获取 Canvas 元素的边界
  const currentX = (event.clientX - rect.left) / rect.width; // 当前 X 的 0-1 范围坐标
  const currentY = (event.clientY - rect.top) / rect.height; // 当前 Y 的 0-1 范围坐标

  const deltaX = currentX - startX; // X 轴方向的偏移量 (0-1 范围)
  const deltaY = currentY - startY; // Y 轴方向的偏移量 (0-1 范围)

  swipePath.push({ x: currentX, y: currentY });
  // console.log("swipePath", ...swipePath);

  // 判断滑动方向和距离是否超过阈值 (以 0-1 范围的距离判断)
  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    if (Math.abs(deltaY) > SWIPE_THRESHOLD / rect.height) {
      swipeDirection = deltaY > 0 ? "down" : "up";
      isScrolling = true;
      // console.log(`滑动方向 deltaX (0-1)：${deltaX}`);
      // console.log(`滑动方向 deltaY (0-1)：${deltaY}`);
    }
  } else {
    if (Math.abs(deltaX) > SWIPE_THRESHOLD / rect.width) {
      swipeDirection = deltaX > 0 ? "right" : "left";
      isScrolling = true;
      // console.log(
      //   `滑动方向：${swipeDirection} (deltaX: ${deltaX}, deltaY: ${deltaY})`
      // );
    }
  }
};

// 处理鼠标抬起
const handleMouseUp = (event) => {
  const rect = canvas.value.getBoundingClientRect();
  const canvasX = (event.clientX - rect.left) / rect.width; // X 坐标 (0-1 范围)
  const canvasY = (event.clientY - rect.top) / rect.height; // Y 坐标 (0-1 范围)

  const pressEndTime = Date.now(); // 记录抬起时的时间
  swipeDuration = pressEndTime - pressStartTime; // 计算按下到抬起的时长
  // console.log(`鼠标滑动时长：${swipeDuration} 毫秒`);

  // if (!isScrolling) {
  //   handleCanvasClick({
  //     clientX: canvasX * rect.width,
  //     clientY: canvasY * rect.height,
  //   });
  // }

  // 重置状态
  isDragging = false;
  swipeDirection = "none";
  isScrolling = false;
  // console.log("鼠标抬起（0-1 范围）：", canvasX, canvasY);

  phoneStore().setDynamicParams({
    terminal: 1, //终端类型1为管理终端  必传
    packType: 2, //必传
    userId: route.query.deviceId, //发给哪个终端 //必传
    adminId: `${getUserId()}_${Cookies.get("UUID")}` || "", //必传
    // userId_uid: getUserId(),
    reqId: nanoid(), //必传
    respOfReqId: "",
    touchXY: {
      duration: swipeDuration,
      point: [
        {
          x: startX, // 鼠标按下对坐标 x
          y: startY, // 鼠标按下坐标 y
        },

        ...swipePath,

        {
          x: canvasX, // 鼠标抬起坐标 x
          y: canvasY, // 鼠标抬起坐标 y
        },
      ],
    },
  });
};

watch(
  () => phoneStore().dynamicParams,
  (newValue) => {
    socket.send(JSON.stringify(newValue));
    // console.log("监听消息: ", phoneStore().getPackTypeWithParams());
  }
);
// 发送消息
const sendMessage = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    // console.log("我已经发送");
    // console.log("监听消息: ", phoneStore().getPackTypeWithParams());

    socket.send(
      JSON.stringify({
        terminal: 1, //终端类型1为管理终端  必传
        packType: 14, //必传
        adminId: `${getUserId()}_${Cookies.get("UUID")}`,
        // userId_uid: Cookies.get("UUID") + getUserId(),
        // userId: route.query.deviceId, //发给哪个终端
        // reqId: nanoid(), //必传
      })
    );
  } else {
    console.error("链接没打开");
  }
};

const stopTimer = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log("定时器已停止");
  }
};
// 初始化 WebSocket 连接
const initializeWebSocket = () => {
  socket = new WebSocket(wsUrl);

  // 连接打开时的处理
  socket.onopen = () => {
    const payload = {
      terminal: 1, //终端类型1为管理终端
      packType: 0, //初始化为0
      userId: route.query.deviceId, //发给哪个终端
      // userId_uid: getUserId(),
      adminId: `${getUserId()}_${Cookies.get("UUID")}`,
      // int32Pack: 3,
    };
    socket.send(JSON.stringify(payload));
    intervalId = setInterval(sendMessage, 5000);
  };

  // 接收到消息时的处理
  socket.onmessage = (message) => {
    // stopTimer();

    handleWebSocketData(message);
  };

  // 连接关闭时的处理
  socket.onclose = () => {
    console.log("连接关闭时");
    stopTimer();
  };

  // 连接错误时的处理
  socket.onerror = (error) => {
    console.error("连接错误:", error);
  };
};
// 当组件挂载时，初始化 WebSocket 并开始监听数据
onMounted(() => {
  initializeWebSocket(); // 初始化 WebSocket 连接
});
// 在组件卸载时关闭 WebSocket
onBeforeUnmount(() => {
  stopTimer();
  if (socket) {
    socket.close();
    console.log("WebSocket 连接关闭", socket);
  }
});
</script>

<style scoped>
canvas {
  border: 1px solid black;
  background-color: #fff;
}
</style>
