<template>
  <div>
    <MyTitle title="修改公告" :back="true"></MyTitle>
    <a-row class="mt10">
      <a-col :span="8">
        <a-form
          :rules="rules"
          ref="formRef"
          :model="form"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          layout="vertical"
        >
          <a-form-item label="公告标题" name="title" has-feedback>
            <a-input
              placeholder="请输入公告标题"
              v-model:value="form.title"
            ></a-input>
          </a-form-item>

          <a-form-item label="公告类型" name="type" has-feedback>
            <a-select v-model:value="form.type" placeholder="请选择公告类型">
              <a-select-option
                :value="item.value"
                v-for="(item, index) in AnnoTypes"
                :key="index"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="公告内容" name="content" has-feedback>
            <a-textarea
              v-model:value="form.content"
              placeholder="请输入公告内容"
            ></a-textarea>
          </a-form-item>

          <a-form-item label="公告描述" name="desc" has-feedback>
            <!-- :getFilePath="getFilePath" -->

            <UploadFile @sendFilePath="getFilePath">
              <img
                class="descimg"
                v-if="form.desc"
                :src="form.desc.replace(/public/, 'http://localhost:3000')"
                alt=""
              />
              <a-button type="primary" class="mt10"
                >点击上传相关公告图片</a-button
              >
              <a-button
                danger
                @click.stop="deleteImg"
                v-if="form.desc"
                class="mt10 ml10"
                >删除图片</a-button
              >
            </UploadFile>
          </a-form-item>

          <a-form-item>
            <a-button
              type="primary"
              block
              html-type="submit"
              class="login-form-button"
            >
              确认修改
            </a-button>
          </a-form-item>
          <a-form-item>
            <a-button danger block @click="resetData" class="login-form-button">
              重置
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { AnnoTypes } from "../../utils";
import UploadFile from "../../components/UploadFile.vue";
import { ShowFail } from "../../utils/message";
import { changeannoone, getannoone } from "@/api/anno";
import { useStore } from "../../store";
import { useCommon } from "../../hooks/common/useCommon";
import { useRoute, useRouter } from "vue-router";
const form = ref<any>({});
const formRef = ref<any>();
const rules = reactive({
  // title: [{ required: true, message: "请输入" }],
  type: [{ required: true, message: "请选择" }],
  content: [{ required: true, message: "请输入" }],
});
const route = useRoute();
const router = useRouter();
const store = useStore();
const { gotowhere } = useCommon();
const onFinish = (value: any) => {
  value._id = route.params.id;
  changeannoone(value).then((res) => {
    if (res.data.code == 200) {
      router.go(-1);
    }
  });
};
const onFinishFailed = () => {
  ShowFail("输入有效的表单数据");
};
const getFilePath = (path: String) => {
  form.value.desc = path;
};

const deleteImg = () => {
  form.value.desc = "";
};
const resetData = () => {
  formRef.value.resetFields();
  form.value = {};
};
const getannooneQ = (data?: any) => {
  getannoone({ _id: route.params.id }).then((res) => {
    if (res.data.code === 200) {
      form.value = res.data.result;
    }
  });
};

onMounted(() => {
  console.log(route.params.id);
  getannooneQ();
});
</script>

<style scoped>
.descimg {
  width: 320px;
  height: 200px;
  margin-top: 15px;
  border-radius: 15px;
}
</style>
