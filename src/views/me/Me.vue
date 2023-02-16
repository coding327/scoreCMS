<template>
  <div>
    <MyTitle title="个人中心"></MyTitle>
    <a-row class="mt10">
      <a-col :span="8" :offset="8">
        <a-form
          ref="formRef"
          :model="form"
          layout="layout"
          name="nest-messages"
          :rules="rules"
        >
          <a-form-item label="用户名称" name="username" has-feedback>
            <a-input
              :disabled="true"
              autocomplete="off"
              v-model:value="form.username"
            >
            </a-input>
          </a-form-item>
          <a-form-item label="用户昵称" name="nickname" has-feedback>
            <a-input
              :disabled="toggle"
              autocomplete="off"
              v-model:value="form.nickname"
            >
            </a-input>
          </a-form-item>
          <a-form-item label="手机号码" name="phone" has-feedback>
            <a-input
              :disabled="true"
              autocomplete="off"
              v-model:value="form.phone"
            >
            </a-input>
          </a-form-item>
          <a-form-item label="登录密码" name="password" has-feedback>
            <a-input
              :disabled="toggle"
              autocomplete="off"
              v-model:value="form.password"
            >
            </a-input>
          </a-form-item>
          <a-form-item label="用户角色" name="role" has-feedback>
            <a-select :disabled="true" v-model:value="form.role">
              <a-select-option
                v-for="(l, i) in roles"
                :key="i"
                :value="l.value"
              >
                {{ l.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            :label="form.subject ? '所属学科' : '所属学科'"
            name="subject"
            has-feedback
          >
            <a-select
              :disabled="toggle"
              v-model:value="form.subject"
              @change="changeSubject"
            >
              <a-select-option
                :value="l.value"
                v-for="(l, i) in subjects"
                :key="i"
              >
                {{ l.label }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :label="form.class ? '所属班级' : '所属班级'"
            name="class"
            has-feedback
          >
            <a-select :disabled="toggle" v-model:value="form.class">
              <a-select-option
                :value="l.value"
                v-for="(l, i) in classList"
                :key="i"
              >
                {{ l.label }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-space>
            <a-button
              danger
              @click="visible = !visible"
              class="login-form-button"
            >
              预览个人信息
            </a-button>
          </a-space>
          <a-space class="ml10">
            <a-button
              danger
              @click="toggle = !toggle"
              class="login-form-button"
            >
              {{ toggle ? "修改个人信息" : "取消修改" }}
            </a-button>
            <a-button
              @click="updateUser"
              type="primary"
              v-if="!toggle"
              class="login-form-button"
            >
              确认修改
            </a-button>
          </a-space>
        </a-form>
      </a-col>
    </a-row>

    <a-modal
      v-model:visible="visible"
      title="个人信息"
      width="30%"
      :footer="null"
    >
      <a-card hoverable style="width: 100%">
        <template #cover>
          <img
            alt="example"
            v-if="userInfo.avatar"
            :src="userInfo.avatar.replace(/public/, 'http://localhost:3000')"
          />
          <a-avatar v-else>
            <template #icon><UserOutlined /></template>
          </a-avatar>
        </template>
        <a-card-meta :title="userInfo.username">
          <template #description>
            <a-tag :color="userInfo.color"> {{ userInfo.label }}</a-tag>
            <div class="mt10">昵称: {{ userInfo.nickname }}</div>
            <div class="mt10">
              所属学科:
              {{
                _.find(subjects, (item: any) => item.value === userInfo.subject)
                  ?.label
              }}
            </div>
            <div class="mt10">
              所属班级:
              {{
                _.find(subjects, (item: any) => item.value === userInfo.subject)
                  ?.label
              }}
            </div>
          </template>
        </a-card-meta>
        <div class="mt10">
          <a-card-meta
            :title="userInfo.phone"
            :description="moment(userInfo.time).format('YYYY-MM-DD HH:mm')"
          >
            <template #avatar v-if="userInfo.avatar">
              <a-avatar
                :src="
                  userInfo.avatar.replace(/public/, 'http://localhost:3000')
                "
              />
            </template>
          </a-card-meta>
        </div>
      </a-card>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRef, watch, onMounted, reactive, h } from "vue";
import { getUserInfo, changeuserinfo } from "@/api";
import { getroles } from "@/api/role";
import { getClasses, getAllSubject } from "@/api/education";
import { useStore } from "../../store";
import { UserOutlined } from "@ant-design/icons-vue";
import moment from "moment";
import { useVerification } from "../../hooks/demo/useVerification";
import { ShowFail } from "../../utils/message";
import _ from "lodash";
import { onBeforeRouteLeave } from "vue-router";
import { Modal } from "ant-design-vue";

const formRef = ref<any>();
const form = ref<any>({});
const roles = ref<any>([]);
const subjects = ref<any>([]);
const classList = ref<any>([]);
const visible = ref<Boolean>(false);
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const store = useStore();
const userInfo: any = toRef(store, "userInfo");
const toggle = ref<Boolean>(true);

const getRoles = () => {
  getroles().then((res) => {
    if (res.data.code == 200) {
      roles.value = res.data.result;
    }
  });
};
const getSubjectList = () => {
  getAllSubject().then((res) => {
    if (res.data.code === 200) {
      subjects.value = res.data.result;
    }
  });
};
const getAllClasses = () => {
  getClasses().then((res) => {
    if (res.data.code === 200) {
      console.log(1234555, res.data.result);
      classList.value = res.data.result;
    }
  });
};

const getUserInfoData = () => {
  getUserInfo().then((res) => {
    if (res.data.code == 200) {
      console.log(999999, res.data.result);
      store.getAsyncData(res.data.result);
      // form.value = res.result
      console.log(userInfo.value);
    }
  });
};
watch(store, (v) => {
  console.log(v);
  form.value = v.userInfo;
  console.log(form.value);
});

// watch(form,(v)=>{
//     console.log(v)

// })

const changeSubject = () => {
  form.value.class = "";
};

// 确认修改
const updateUser = () => {
  formRef.value
    .validate()
    .then(async (value: any) => {
      console.log(value);
      changeuserinfo((res) => {
        if (res.data.code === 200) {
          toggle.value = true;
          getUserInfoData();
        }
      });
    })
    .catch((err: any) => {
      ShowFail("请认真填写个人数据信息");
    });
};

onMounted(() => {
  getRoles();
  getSubjectList();
  getAllClasses();
  getUserInfoData();
});

// 路由离开的守卫
// onBeforeRouteLeave((to, from, next) => {
//   if (!userInfo.value.class) {
//     Modal.success({
//       title: "提示",
//       content: h("div", {}, [h("p", "离开前请先选择所属班级和学科")]),
//     });
//   } else {
//     next();
//   }
// });
const { pwd, phone } = useVerification();
const rules: any = reactive({
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
    {
      pattern: pwd,
      message: "请输入正确的登录密码(6-16的数字+字母)",
    },
  ],
  subject: [
    {
      required: false,
      message: "请选择学科!",
    },
  ],
  class: [
    {
      required: false,
      message: "请选择班级!",
    },
  ],
});
</script>
