<template>
  <div :style="styleObject">
    <!-- 显示描述信息 -->
    <p v-if="desc">{{ desc }}</p>

    <!-- 渲染子元素 -->
    <div v-for="(child, index) in item.childs_" :key="index">
      <component
        :is="getComponentType(child)"
        :item="child"
        :bounds="child.boundsInScreen_"
        :desc="child.desc_"
        :containerWidth="containerWidth"
        :containerHeight="containerHeight"
      >
        <!-- 递归渲染子元素 -->
      </component>
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "item",
  "bounds",
  "containerWidth",
  "containerHeight",
]);

// 限制子组件的宽高不超过主组件的宽高
const adjustedWidth = Math.min(
  props.bounds.right_ - props.bounds.left_,
  props.containerWidth
);
const adjustedHeight = Math.min(
  props.bounds.bottom_ - props.bounds.top_,
  props.containerHeight
);

// 使用 bounds 设置布局，同时应用限制

import FrameLayout from "../FrameLayout/FrameLayout.vue";
import LinearLayout from "../LinearLayout/LinearLayout.vue";
// 计算布局的绝对定位样式
const styleObject = {
  position: "absolute", // 绝对定位，确保组件正确放置在父容器内
  top: `${props.bounds.top_}px`,
  left: `${props.bounds.left_}px`,
  width: `${adjustedWidth}px`,
  height: `${adjustedHeight}px`,
  border: "1px solid red", // 暂时加上边框，方便调试
  backgroundColor: "rgba(0, 0, 255, 0.1)", // 调试用的背景色
};

// 动态获取子组件类型
const getComponentType = (item) => {
  switch (item.className_) {
    case "android.widget.TextView":
      return "TextView";
    case "android.widget.ImageView":
      return "ImageView";
    case "android.widget.LinearLayout":
      return LinearLayout;
    case "android.widget.FrameLayout":
      return FrameLayout;
    default:
      return "div";
  }
};
</script>

<style scoped>
div {
  position: absolute;
  display: flex; /* 可以改为 flex 布局，确保内部组件的正确排列 */
}
p {
  font-size: 12px;
  color: #333;
}
</style>
