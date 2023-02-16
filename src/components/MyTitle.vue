<template>
  <div>
    <div :style="{ 'justify-content': direction }" class="title">
      <a-typography-title :level="level" class="title-text">{{
        title
      }}</a-typography-title>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  level: {
    type: Number,
    default: 3,
  },
  title: {
    type: String,
    default: "",
  },
  back: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: "center",
  },
});
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  &-text {
    color: #000;
    margin: 0;
  }
}
</style>
