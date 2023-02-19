<template>
  <a-row class="mt10" style="margin-left: 50px;">
    <a-col :span="6">
      <a-input
        placeholder="请输入搜索关键字"
        v-model:value="form.keyword"
      ></a-input>
    </a-col>
    <slot :form="form"> </slot>
    <a-col :span="6" :offset="1">
      <a-button type="primary" @click="todoSearch">搜索</a-button>
      <a-button class="ml10" danger @click="resetData">重置</a-button>
      <slot name="export" :form="form"></slot>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const props: any = defineProps({
  searchApi: Function,
});
const form = ref<any>({});
const todoSearch = () => {
  props.searchApi(form.value);
};
const resetData = () => {
  form.value = {};
  props.searchApi({});
};

defineExpose({
  todoSearch
})
</script>
