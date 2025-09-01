<template>
  <component :is="tag" class="component" :style="componentStyle">
    <p v-if="data.text_">{{ data.text_ }}</p>
    <ComponentWrapper
      v-for="(child, index) in data.childs_"
      :key="index"
      :data="child"
      :screenWidth="screenWidth"
      :screenHeight="screenHeight"
    />
  </component>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true,
    },
    screenWidth: {
      type: Number,
      required: true,
    },
    screenHeight: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const tag = computed(() => {
      switch (props.data.className_) {
        case "android.widget.TextView":
          return "p";
        case "android.widget.Button":
          return "button";
        default:
          return "div";
      }
    });

    const componentStyle = computed(() => {
      const width =
        props.data.boundsInScreen_.right_ - props.data.boundsInScreen_.left_;
      const height =
        props.data.boundsInScreen_.bottom_ - props.data.boundsInScreen_.top_;

      return {
        position: "absolute",
        top: `${(props.data.boundsInScreen_.top_ / props.screenHeight) * 100}%`,
        left: `${
          (props.data.boundsInScreen_.left_ / props.screenWidth) * 100
        }%`,
        width: `${(width / props.screenWidth) * 100}%`,
        height: `${(height / props.screenHeight) * 100}%`,
      };
    });

    return { tag, componentStyle };
  },
});
</script>

<style scoped>
.component {
  border: 1px solid #ccc;
  margin: 0;
  padding: 0;
}
</style>
