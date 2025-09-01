<template>
  <div :style="styleObject">
    <!-- 渲染子元素 -->
    <div v-for="(child, index) in item.childs_" :key="index">
      <component
        :is="getComponentType(child)"
        :bounds="child.boundsInScreen_"
        :item="child"
        v-bind="child"
      >
        <!-- 递归渲染子元素 -->
      </component>
    </div>
  </div>
</template>

<script setup>
import FrameLayout from "../FrameLayout/FrameLayout.vue";
import LinearLayout from "../LinearLayout/LinearLayout";
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
// 根据布局方向设置 flex 布局
const layoutDirection =
  props.item.orientation === "horizontal" ? "row" : "column";

// 样式：处理布局的定位与方向
const styleObject = {
  display: "flex",
  flexDirection: layoutDirection,
  position: "absolute",
  top: `${props.bounds.top_}px`,
  left: `${props.bounds.left_}px`,
  width: `${adjustedWidth}px`,
  height: `${adjustedHeight}px`,
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
  border: 1px solid blue; /* 添加边框以查看元素位置 */
  /* background-color: rgba(0, 0, 255, 0.1); 添加背景色 */
}
</style>
