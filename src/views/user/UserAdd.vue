<template>
  <div>
    <MyTitle title="用户新增"></MyTitle>
    <a-row class="mt10">
      <a-col :span="8" :offset="8">
        <a-form
          :rules="rules"
          ref="formRef"
          :model="form"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed('输入有效的数据')"
          layout="vertical"
        >
          <a-form-item label="用户名称" name="username" has-feedback>
            <a-input
              autocomplete="off"
              placeholder="请输入用户名称"
              v-model:value="form.username"
            ></a-input>
          </a-form-item>

          <a-form-item label="手机号码" name="phone" has-feedback>
            <a-input
              autocomplete="off"
              placeholder="请输入手机号码"
              v-model:value="form.phone"
            ></a-input>
          </a-form-item>

          <a-form-item label="初始密码" name="password" has-feedback>
            <a-input
              disabled
              autocomplete="off"
              v-model:value="form.password"
            ></a-input>
          </a-form-item>

          <a-form-item label="用户角色" name="role" has-feedback>
            <a-select v-model:value="form.role" placeholder="请选择用户角色">
              <a-select-option
                v-for="(item, index) in roles.filter(
                  (val) => val.value < store.userInfo.role
                )"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item>
            <a-block>
              <a-button
                type="primary"
                html-type="submit"
                class="login-form-button"
              >
                添加用户
              </a-button>
            </a-block>
            <a-block class="ml10">
              <a-button
                danger
                @click="resetData(formRef)"
                class="login-form-button"
              >
                重置数据
              </a-button>
            </a-block>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, computed } from "vue";
import { adduser } from "../../api/user";
import { getroles } from "../../api/role";
import { useCommon } from "../../hooks/common/useCommon";
import { useVerification } from "../../hooks/demo/useVerification";
import { useStore } from "../../store";
const { resetData, onFinishFailed, gotowhere } = useCommon();

const store = useStore();
const userInfo = computed(() => store.userInfo);
const roles = ref<any>([]);
const { phone } = useVerification();
const rules = {
  username: [
    {
      required: true,
      message: "请输入用户名称!",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入手机号码!",
    },
    {
      pattern: phone,
      message: "请输入正确的手机号码",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码!",
    },
  ],
  role: [
    {
      required: true,
      message: "请选择!",
    },
  ],
};
const formRef = ref<any>();
const form = ref<any>({
  password: "qwe123",
});
const onFinish = (value: any) => {
  adduser(value).then((res) => {
    if (res.data.code === 200) {
      gotowhere("/layout/user/list");
    }
  });
};

const getRoles = () => {
  getroles().then((res) => {
    console.log(123, res);
    if (res.data.code === 200) {
      console.log(res.data.result);
      roles.value = res.data.result;
    }
  });
};

onMounted(() => {
  nextTick(() => {
    getRoles();
  });
});
</script>

<style lang="scss" scoped></style>
