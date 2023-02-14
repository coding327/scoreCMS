<template>
  <a-modal
    v-model:visible="show"
    :title="title"
    @ok="handleOK"
    :okText="okText"
    cancelText="取消"
    okType="danger"
    :width="width"
  >
    <a-form
      :rules="rules"
      ref="formRef"
      :model="form"
      name="normal_login"
      class="login-form"
      :layout="layout"
    >
      <slot name="cake" :form="form"></slot>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, defineEmits, defineExpose } from "vue";
import { ShowFail } from "../utils/message";

// 发送v-model事件
const emit = defineEmits(["update:visible"]);
const formRef = ref<any>(null);
const props: any = defineProps({
  submit: {
    type: Function,
  },
  rules: {
    type: Object,
  },
  title: {
    type: String,
    default: "标题",
  },
  okText: {
    type: String,
    default: "确认",
  },
  width: {
    type: String,
    default: "30%",
  },
  visible: {
    type: Boolean,
  },
});

const layout = ref("vertical");
const form = ref<any>({});

const show = computed({
  get() {
    return props.visible;
  },
  set(value) {
    emit("update:visible", value);
    // 重置表单
    value || formRef.value.resetFields();
  },
})

// 点击弹框ok
const handleOK = () => {
  // 表单验证
  formRef.value
    .validate()
    .then((result: any) => {
      // 验证成功执行回调，提交后台
      props.submit(result);
      // 表单重置
      formRef.value.resetFields();
    })
    .catch((err: any) => {
      ShowFail("表单校验失败,请重试");
    });
};

// 把组件内部的数据、方法暴露出去给父组件使用
defineExpose({
  form,
});
</script>
