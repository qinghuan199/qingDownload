<template>
  <div ref="containerRef" class="canvas-container">
    {{ canvasWidth }}
    {{ canvasHeight }}
    <canvas
      ref="canvas"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @click="handleCanvasClick"
    ></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as ProtoBuf from "protobufjs";
import Cookies from "js-cookie";
import { getUserId } from "@/utils/auth";
import phoneStore from "@/store/modules/controlPhone";
import { nanoid } from "nanoid";
// import Log from "@/views/monitor/job/log.vue";
// import { fa } from "element-plus/es/locale";
// 假设你的包名是 'chat'，消息类型是 'NettyMessage'
// import message from "@/NettyMessage";

// const root = ProtoBuf.Root.fromJSON(message);
// const NettyMessage = root.lookupType("message.Message");

let layoutData = "";
const route = useRoute();
// const wsUrl = "Wss://cloud1788.com/ws";
// const wsUrl = "Ws://192.168.10.49:8888/ws";
const wsUrl = "Ws://38.180.188.66/ws/";
let intervalId = null; // 定时器 ID

const setupProtoBuf = async () => {
  const root = await ProtoBuf.load("/src/NettyMessage.proto");
  const NettyMessage = root.lookupType("Message");
  return NettyMessage;
};

const baseParams = {
  terminal: 1,
  userId: route.query.deviceId,
  adminId: `${getUserId()}_${Cookies.get("UUID")}`,
  reqId: nanoid(),
};

let socket;
const containerRef = ref(null);
const canvas = ref(null);
const canvasWidth =
  Math.floor(window.innerWidth * 0.23) < 360
    ? 360
    : Math.floor(window.innerWidth * 0.23); // 基准宽度
const canvasHeight = window.innerHeight; // 基准高度
console.log("canvasWidth", canvasWidth);
console.log("canvasHeight", canvasHeight);

// 分辨率

let originalWidth, originalHeight;
if (route.query.resolution) {
  [originalWidth, originalHeight] = route.query.resolution
    .split("*")
    .map(Number);
}
let scaleX = canvasWidth / originalWidth;
let scaleY = canvasHeight / originalHeight;
// // 缩放相关
// const containerScale = ref(1);
// const resolutionScaleX = canvasWidth / originalWidth;
// const resolutionScaleY = canvasHeight / originalHeight;

const initializeCanvas = () => {
  const container = containerRef.value;
  const canvasEl = canvas.value;

  canvasEl.width = canvasWidth;
  canvasEl.height = canvasHeight;
};

// 设置原始数据的分辨率 华为
// const originalWidth = 1080;
// const originalHeight = 2240;

// 设置原始数据的分辨率 三星
// const originalWidth = 1440;
// const originalHeight = 3040;
// console.log(originalWidth, originalHeight);

// 计算缩放比例

let rectangles = [];

//绘制正常版本
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
//   if (importantTypes.includes(parent.className)) {
//     if (
//       parent.className === "android.widget.ImageView" ||
//       parent.className === "android.widget.TextView"
//     ) {
//       textToShow = parent.text || parent.desc;
//     } else {
//       textToShow = parent.text || parent.desc || "";
//     }
//   }

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

//优化版本 ---  这个版本很完美，但是文本过长超出
// const drawRect = (ctx, bounds, color = "#000", text = "") => {
//   const { left = 0, top = 0, right = 0, bottom = 0 } = bounds;
//   const width = (right - left) * scaleX;
//   const height = (bottom - top) * scaleY;

//   if (text) {
//     // 设置填充颜色并绘制背景
//     ctx.fillStyle = color;
//     ctx.fillRect(left * scaleX, top * scaleY, width, height);
//   }

//   // 绘制矩形边框
//   ctx.strokeStyle = "rgb(247.5, 227.1, 196.5)";
//   ctx.lineWidth = 1; // 调整线宽适配屏幕
//   ctx.strokeRect(left * scaleX, top * scaleY, width, height);

//   // 绘制居中文字
//   if (text) {
//     ctx.font = "12px Arial";
//     ctx.fillStyle = "black";

//     // 计算文本的宽度和高度
//     const textMetrics = ctx.measureText(text);
//     const textWidth = textMetrics.width;
//     const textHeight = 12; // 近似估计文本高度

//     // 计算文本的起始位置，使其居中
//     const textX = left * scaleX + (width - textWidth) / 2;
//     const textY = top * scaleY + (height + textHeight / 2) / 2;

//     ctx.fillText(text, textX, textY);
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
//     "android.widget.RelativeLayout",
//   ];

//   // 确定要显示的文本内容
//   let textToShow = "";
//   const currentColor = importantTypes.includes(parent.className)
//     ? "rgb(216.8, 235.6, 255)"
//     : "";

//   if (parent.className === "android.widget.RelativeLayout" && parent.desc) {
//     // 如果是RelativeLayout且desc不为空，设置textToShow为desc
//     textToShow = parent.desc;
//   } else if (importantTypes.includes(parent.className)) {
//     // 如果是其他重要类型，使用text或desc
//     if (
//       parent.className === "android.widget.ImageView" ||
//       parent.className === "android.widget.TextView"
//     ) {
//       textToShow = parent.text || parent.desc;
//     } else {
//       textToShow = parent.text || parent.desc || "";
//     }
//   }

//   // 绘制当前组件的矩形
//   drawRect(ctx, parent.boundsInScreen, currentColor, textToShow);

//   // 如果是RelativeLayout且desc不为空，则不再绘制其子元素
//   if (parent.className === "android.widget.RelativeLayout" && parent.desc) {
//     return;
//   }

//   // 递归绘制子组件
//   if (parent.childs && parent.childs.length > 0) {
//     parent.childs.forEach((child) => {
//       drawChilds(ctx, child, level + 1);
//     });
//   }
// };

//优化版本

//优化版本 -- 文本过长
// 常量配置
const CONFIG = {
  SCALE: {
    MIN_FONT_SIZE: 10,
    BASE_FONT_SIZE: 12,
    MIN_PADDING: 2,
    BASE_PADDING: 4,
  },
  COLORS: {
    BUTTON_BG: "rgba(240, 240, 240, 0.3)",
    EDIT_TEXT_BG: "rgba(255, 255, 255, 0.4)",
    DRAWER_BG: "rgba(0, 0, 0, 0.3)",
    LAYOUT_STROKE: "rgba(200, 200, 200, 0.5)",
    ELEMENT_STROKE: "rgba(180, 180, 180, 0.8)",
    TEXT: "#333333",
  },
  IMPORTANT_TYPES: new Set([
    "android.widget.ImageView",
    "android.widget.TextView",
    "android.widget.CheckBox",
    "android.widget.Button",
    "android.widget.FrameLayout",
    "android.widget.EditText",
    "android.widget.RelativeLayout",
    "android.widget.CheckedTextView",
  ]),

  CHECKED_BG: "rgba(33, 150, 243, 0.1)", // 选中背景色
  CHECKED_BORDER: "#2196F3", // 选中边框色
  CHECKED_TEXT: "#2196F3", // 选中文本色
  UNCHECKED_TEXT: "#000000", // 未选中文本色
};

// 文字样式生成器
const createTextStyle = (scaleX, scaleY) => ({
  fontSize: Math.max(
    Math.round(CONFIG.SCALE.BASE_FONT_SIZE * Math.min(scaleX, scaleY)),
    CONFIG.SCALE.MIN_FONT_SIZE
  ),
  fontColor: CONFIG.COLORS.TEXT,
  fontWeight: "bold",
  padding: Math.max(
    CONFIG.SCALE.BASE_PADDING * Math.min(scaleX, scaleY),
    CONFIG.SCALE.MIN_PADDING
  ),
});

// 优化后的drawRect函数
const drawRect = (ctx, bounds, color, text, options = {}) => {
  const {
    fontSize = CONFIG.SCALE.BASE_FONT_SIZE,
    fontColor = CONFIG.COLORS.TEXT,
    fontWeight = "bold",
    padding = CONFIG.SCALE.MIN_PADDING,
  } = options;

  // 计算缩放后的坐标
  const scaledBounds = {
    left: bounds.left * scaleX,
    top: bounds.top * scaleY,
    width: (bounds.right - bounds.left) * scaleX,
    height: (bounds.bottom - bounds.top) * scaleY,
  };

  // 绘制背景
  // if (color !== "transparent") {
  //   ctx.fillStyle = color;
  //   ctx.fillRect(
  //     scaledBounds.left,
  //     scaledBounds.top,
  //     scaledBounds.width,
  //     scaledBounds.height
  //   );
  // }

  // 绘制边框
  ctx.strokeRect(
    scaledBounds.left,
    scaledBounds.top,
    scaledBounds.width,
    scaledBounds.height
  );

  // 文字渲染优化
  if (text) {
    const renderText = () => {
      ctx.font = `${fontWeight} ${fontSize}px Arial`;
      ctx.fillStyle = fontColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const maxWidth = scaledBounds.width - padding * 2;
      const lines = getTextLines(ctx, text, maxWidth);

      const lineHeight = fontSize * 1.2;
      const totalHeight = lineHeight * lines.length;
      const textX = scaledBounds.left + scaledBounds.width / 2;
      const textY =
        scaledBounds.top +
        scaledBounds.height / 2 -
        totalHeight / 2 +
        lineHeight / 2;

      lines.forEach((line, index) => {
        ctx.fillText(line, textX, textY + index * lineHeight);
      });
    };

    // 优化文字渲染
    ctx.save();
    renderText();
    ctx.restore();
  }
  // 文字渲染优化
  // if (text) {
  //   const renderText = () => {
  //     ctx.font = `${fontWeight} ${fontSize}px Arial`;
  //     ctx.fillStyle = fontColor;
  //     ctx.textAlign = "center";
  //     ctx.textBaseline = "middle";

  //     const maxWidth = scaledBounds.width - padding * 2;
  //     const maxHeight = scaledBounds.height - padding * 2;
  //     const lineHeight = fontSize * 1.2;

  //     // 计算最大可显示行数
  //     const maxLines = Math.floor(maxHeight / lineHeight);

  //     // 获取文本分行
  //     let lines = getTextLines(ctx, text, maxWidth);

  //     // 如果行数超出限制，进行截断
  //     if (lines.length > maxLines) {
  //       // 保留最大行数-1行，最后一行添加省略号
  //       lines = lines.slice(0, maxLines);
  //       const lastLine = lines[lines.length - 1];

  //       // 计算省略号的宽度
  //       const ellipsis = "...";
  //       const ellipsisWidth = ctx.measureText(ellipsis).width;

  //       // 从后往前截断最后一行文本，直到能容纳省略号
  //       while (ctx.measureText(lastLine).width + ellipsisWidth > maxWidth) {
  //         lines[lines.length - 1] = lastLine.slice(0, -1);
  //       }

  //       // 添加省略号
  //       lines[lines.length - 1] += ellipsis;
  //     }

  //     const totalHeight = lineHeight * lines.length;
  //     const textX = scaledBounds.left + scaledBounds.width / 2;
  //     const textY =
  //       scaledBounds.top +
  //       scaledBounds.height / 2 -
  //       totalHeight / 2 +
  //       lineHeight / 2;

  //     // 绘制文本
  //     lines.forEach((line, index) => {
  //       ctx.fillText(line, textX, textY + index * lineHeight);
  //     });
  //   };

  //   ctx.save();
  //   renderText();
  //   ctx.restore();
  // }
};

// 优化后的drawChilds函数
const drawChilds = (ctx, parent) => {
  if (!parent?.boundsInScreen) return false;

  let hasTextOrDesc = false;

  // 处理DrawerLayout
  if (parent.className === "androidx.drawerlayout.widget.DrawerLayout") {
    drawRect(ctx, parent.boundsInScreen, CONFIG.COLORS.DRAWER_BG, "");
  }

  // 处理单个元素
  if (!parent.processed) {
    processElements(ctx, parent);
    hasTextOrDesc = Boolean(parent.text || parent.desc);
  }

  return hasTextOrDesc;
};

// 文字分行处理
const getTextLines = (ctx, text, maxWidth) => {
  const words = text.split("");
  const lines = [];
  let currentLine = "";

  for (const char of words) {
    const testLine = currentLine + char;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = char;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
};
// 辅助函数：获取文本分行
// const getTextLines = (ctx, text, maxWidth) => {
//   const words = text.split("");
//   const lines = [];
//   let currentLine = words[0] || "";

//   for (let i = 1; i < words.length; i++) {
//     const word = words[i];
//     const width = ctx.measureText(currentLine + word).width;

//     if (width <= maxWidth) {
//       currentLine += word;
//     } else {
//       lines.push(currentLine);
//       currentLine = word;
//     }
//   }

//   lines.push(currentLine);
//   return lines;
// };

// 处理单个元素
const processElements = (ctx, element) => {
  // 应用图标特殊处理
  if (isAppIcon(element)) {
    drawAppIcon(ctx, element);
    return;
  }

  const textToShow = getElementText(element);
  const bgColor = getBackgroundColor(element.className);

  // 设置边框样式
  ctx.lineWidth = Math.max(0.5 * Math.min(scaleX, scaleY), 0.5);
  ctx.strokeStyle = element.className.includes("Layout")
    ? CONFIG.COLORS.LAYOUT_STROKE
    : CONFIG.COLORS.ELEMENT_STROKE;

  if (element.className.includes("Layout")) {
    ctx.setLineDash([2 * scaleX, 2 * scaleX]);
  } else {
    ctx.setLineDash([]);
  }

  // 绘制元素
  if (textToShow || !element.className.includes("Layout")) {
    drawRect(
      ctx,
      element.boundsInScreen,
      bgColor,
      textToShow,
      createTextStyle(scaleX, scaleY)
    );
  }

  // 处理子元素
  element.childs?.forEach((child) => {
    if (!child.processed) {
      drawChilds(ctx, child);
    }
  });
};

// 判断是否为应用图标
const isAppIcon = (element) => {
  return (
    element.className === "android.widget.RelativeLayout" &&
    element.desc &&
    element.packageName === "com.miui.home"
  );
};

// 专门处理应用图标的绘制
const drawAppIcon = (ctx, element) => {
  const bounds = element.boundsInScreen;
  const text = element.desc;

  ctx.lineWidth = Math.max(0.5 * Math.min(scaleX, scaleY), 0.5);
  ctx.strokeStyle = CONFIG.COLORS.ELEMENT_STROKE;
  ctx.setLineDash([]);

  const iconTextStyle = {
    ...createTextStyle(scaleX, scaleY),
    fontSize: Math.max(
      Math.round(CONFIG.SCALE.BASE_FONT_SIZE * 0.9 * Math.min(scaleX, scaleY)),
      CONFIG.SCALE.MIN_FONT_SIZE
    ),
    padding: Math.max(
      CONFIG.SCALE.BASE_PADDING * 2 * Math.min(scaleX, scaleY),
      CONFIG.SCALE.MIN_PADDING
    ),
  };

  drawRect(ctx, bounds, "transparent", text, iconTextStyle);
};

// 辅助函数
const getMergedBounds = (elements) => ({
  left: Math.min(...elements.map((e) => e.boundsInScreen.left)),
  top: Math.min(...elements.map((e) => e.boundsInScreen.top)),
  right: Math.max(...elements.map((e) => e.boundsInScreen.right)),
  bottom: Math.max(...elements.map((e) => e.boundsInScreen.bottom)),
});

const getBackgroundColor = (className) => {
  if (className.includes("Button")) return CONFIG.COLORS.BUTTON_BG;
  if (className.includes("EditText")) return CONFIG.COLORS.EDIT_TEXT_BG;
  return "transparent";
};

const processElement = (ctx, element) => {
  const textToShow = getElementText(element);
  const bgColor = getBackgroundColor(element.className);

  // 设置边框样式
  ctx.lineWidth = Math.max(0.5 * Math.min(scaleX, scaleY), 0.5);
  ctx.strokeStyle = element.className.includes("Layout")
    ? CONFIG.COLORS.LAYOUT_STROKE
    : CONFIG.COLORS.ELEMENT_STROKE;

  if (element.className.includes("Layout")) {
    ctx.setLineDash([2 * scaleX, 2 * scaleX]);
  } else {
    ctx.setLineDash([]);
  }

  // 绘制元素
  if (textToShow || !element.className.includes("Layout")) {
    drawRect(
      ctx,
      element.boundsInScreen,
      bgColor,
      textToShow,
      createTextStyle(scaleX, scaleY)
    );
  }

  // 处理子元素
  element.childs?.forEach((child) => {
    if (!child.processed) {
      drawChilds(ctx, child);
    }
  });
};

const getElementText = (element) => {
  if (element.className === "android.widget.RelativeLayout" && element.desc) {
    return element.desc;
  }
  if (CONFIG.IMPORTANT_TYPES.has(element.className)) {
    return element.text || element.desc || "";
  }
  return "";
};

//优化版本

// 滑动偏移量，控制内容的滚动
let scrollY = 0;
let maxScrollY = 0; // 最大滚动距离，用于限制滚动范围

// 初始化并绘制界面
const drawLayout = () => {
  const ctx = canvas.value.getContext("2d");
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  rectangles = [];
  drawChilds(ctx, layoutData.nodeInfo);
  // 计算最大滚动范围，布局内容高度 - 屏幕高度
  const contentHeight = originalHeight + scrollY;
  maxScrollY = Math.max(0, contentHeight - canvasHeight / scaleY);
};

// 数据处理
const handleWebSocketData = (message) => {
  try {
    // layoutData = JSON.parse(message);
    layoutData = message;
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

// const getCeshiNode = (data) => {
//   // console.log("getCeshiNode", data);

//   var b = false;
//   var anode = null;
//   console.log(data.childs.length);
//   for (var i = 0; data.childs.length; i++) {
//     var node = data.childs[i];

//     b = getChild(node);
//     if (b) {
//       data.nodeInfo.childs = new Array();
//       data.nodeInfo.childs[0] = anode;
//       break;
//     }
//   }
//   // console.log("anode", anode);
// };

// const getChild = (node) => {
//   console.log("node", node);
//   if (node == undefined) {
//     return false;
//   }
//   if (node.selected) {
//     return true;
//   }
//   var tmp = node.childs;
//   if (tmp == null || tmp == undefined) {
//     return false;
//   }
//   if (tmp != null && tmp.length > 0) {
//     for (var i = 0; i < tmp.length; i++) {
//       var c = tmp[i];
//       if (c.selected) {
//         return true;
//       } else {
//         return getChild(c);
//       }
//     }
//   } else {
//     return false;
//   }
// };

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
    ...baseParams,
    // terminal: 1, //终端类型1为管理终端  必传
    // userId: route.query.deviceId, //发给哪个终端 //必传
    // adminId: `${getUserId()}_${Cookies.get("UUID")}` || "", //必传
    // // userId_uid: getUserId(),
    // reqId: nanoid(), //必传
    packType: 2, //必传
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
    setupProtoBuf().then((res) => {
      const message = res.create(newValue);
      console.log("点击发送指令message", message);

      const buffer = res.encode(message).finish();
      // console.log("点击发送指令buffer", message);
      socket.send(buffer);
    });
    // console.log("监听消息: ", phoneStore().getPackTypeWithParams());
  }
);
// 发送消息
const sendMessage = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    // console.log("我已经发送");
    // console.log("监听消息: ", phoneStore().getPackTypeWithParams());
    setupProtoBuf().then((res) => {
      const message = res.create({
        terminal: 1, //终端类型1为管理终端  必传
        packType: 14, //必传
        adminId: `${getUserId()}_${Cookies.get("UUID")}`,
        // userId_uid: Cookies.get("UUID") + getUserId(),
        // userId: route.query.deviceId, //发给哪个终端
        // reqId: nanoid(), //必传
      });
      const buffer = res.encode(message).finish();
      socket.send(buffer);
    });
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
  const payload = {
    terminal: 1, //终端类型1为管理终端
    packType: 0, //初始化为0
    userId: route.query.deviceId, //发给哪个终端
    // userId_uid: getUserId(),
    adminId: `${getUserId()}_${Cookies.get("UUID")}`,
    // int32Pack: 3,
  };

  // 连接打开时的处理
  socket.onopen = () => {
    setupProtoBuf().then((res) => {
      let message = res.create(payload);
      // console.log("初始化", message);

      let buffer = res.encode(message).finish();
      socket.send(buffer);
    });
    intervalId = setInterval(sendMessage, 5000);
  };

  // WebSocket 接收到消息时的处理
  socket.onmessage = async (message) => {
    if (message.data == undefined) {
      return;
    }

    try {
      let buffer;
      if (message.data instanceof ArrayBuffer) {
        buffer = new Uint8Array(message.data);
        // console.log("我是ArrayBuffer");
      } else if (message.data instanceof Blob) {
        // console.log("我是Blob");

        // 如果是 Blob 类型，需要转换为 ArrayBuffer
        buffer = new Uint8Array(await message.data.arrayBuffer());
      } else {
        console.error("以上类型都不是:", typeof message.data);
        return;
      }

      // console.log("buffer", buffer);

      setupProtoBuf().then((res) => {
        const chatMessage = res.decode(buffer);
        console.log("chatMessage", chatMessage);
        console.log("接收到消息", route.query.deviceId, chatMessage.userId);

        if (chatMessage.userId === route.query.deviceId) {
          handleWebSocketData(chatMessage);
        }
      });
    } catch (error) {
      console.error(" WebSocket message 数据错误:", error);
    }
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

// 创建一个专门用于发送关闭消息的函数
const sendCloseMessage = async () => {
  try {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.log("WebSocket 未连接，无法发送关闭消息");
      return;
    }
    const closePayload = {
      ...baseParams,
      // terminal: 1, // 终端类型1为管理终端
      packType: 61, // 关闭连接的消息类型
      // userId: route.query.deviceId, // 发给哪个终端
      // adminId: `${getUserId()}_${Cookies.get("UUID")}`,
      // reqId: nanoid(), // 请求ID
    };

    const proto = await setupProtoBuf();
    const message = proto.create(closePayload);
    const buffer = proto.encode(message).finish();
    socket.send(buffer);
    console.log("已发送关闭消息");
  } catch (error) {
    console.error("发送关闭消息失败:", error);
  }
};

// 创建一个关闭连接的函数
const closeWebSocket = async () => {
  try {
    if (socket) {
      await sendCloseMessage();
      stopTimer();
      await new Promise((resolve) => setTimeout(resolve, 100));
      socket.close();
      console.log("WebSocket 连接已关闭");
    }
  } catch (error) {
    console.error("关闭 WebSocket 连接时出错:", error);
  }
};

// 当组件挂载时，初始化 WebSocket 并开始监听数据
onMounted(() => {
  initializeCanvas();
  initializeWebSocket(); // 初始化 WebSocket 连接
});
// 在组件卸载时关闭 WebSocket
onBeforeUnmount(() => {
  closeWebSocket();
});
</script>

<style scoped>
canvas {
  border: 1px solid black;
  background-color: #fff;
}
</style>
