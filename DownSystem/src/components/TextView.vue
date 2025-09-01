<template>
  <div :style="styleObject">
    {{ item.text_ }}
    <!-- 显示文本内容 -->
  </div>
</template>

<script setup>
const props = defineProps([
  "item",
  "bounds",
  "desc",
  "containerWidth",
  "containerHeight",
]);

// 使用 bounds 设置布局
const adjustedWidth = Math.min(
  props.bounds.right_ - props.bounds.left_,
  props.containerWidth
);
const adjustedHeight = Math.min(
  props.bounds.bottom_ - props.bounds.top_,
  props.containerHeight
);

const styleObject = {
  position: "absolute",
  top: `${props.bounds.top_}px`,
  left: `${props.bounds.left_}px`,
  width: `${adjustedWidth}px`,
  height: `${adjustedHeight}px`,
  fontSize: "16px", // 设置文本大小
  color: "#000", // 文本颜色
  border: "1px solid blue", // 添加边框方便调试
};
</script>

<style scoped>
div {
  padding: 4px; /* 可以根据需要调整内边距 */
}
</style>
