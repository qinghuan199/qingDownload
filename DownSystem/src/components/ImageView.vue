<template>
  <div :style="styleObject">
    <img :src="item.src || 'default-image.png'" alt="image" />
  </div>
</template>

<script setup>
const props = defineProps(["item", "bounds"]);

// 计算布局的绝对定位样式
const styleObject = {
  position: "absolute",
  top: `${props.bounds.top_}px`,
  left: `${props.bounds.left_}px`,
  width: `${props.bounds.right_ - props.bounds.left_}px`,
  height: `${props.bounds.bottom_ - props.bounds.top_}px`,
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 图片的缩放模式 */
}
</style>
