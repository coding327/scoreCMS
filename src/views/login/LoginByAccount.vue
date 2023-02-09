<template>
  <div class="myform">
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed('登录数据信息有误!')"
    >
      <a-form-item
        label="账号"
        name="account"
        :rules="[{ required: true, message: '请输入账号!' }]"
      >
        <a-input v-model:value="formState.account">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[
          { required: true, message: '请输入密码!' },
          {
            pattern: pwd,
            message:'请输入正确的登录密码(6-16的数字+字母)'
          }
        ]"
      >
        <a-input-password v-model:value="formState.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit" block>登录</a-button>
        <a-button danger class="mt10" @click="resetForm" block>重置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { FormState } from '@/utils/types.ts'
import { useVerification } from '@/hooks/demo/useVerification.ts'
import type { FormInstance } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router'
import { ShowFail, ShowSuccess } from '@/utils/message.ts'
import { todoLogin } from '@/api'
import { useCommon } from '@/hooks/common/useCommon.ts'

const route = useRoute()
const router = useRouter()

const { pwd } = useVerification()

const { onFinishFailed } = useCommon()
// 点击登录，正则验证失败触发
// const onFinishFailed = () => {
//   // 正则都没通过不会发请求
//   ShowFail('登录数据信息有误')
// }

// 点击登录，正则验证成功，发请求
const onFinish = (value: FormState) => {
  todoLogin(formState).then(res => {
    console.log(res)
    if (res.data.code === 200) {
      router.push({
        name: 'layout',
        // query: value
      })
      localStorage.setItem('homeAccount', value.account)
      sessionStorage.setItem('homeToken', res.data.token)
    }
  })
}

// 表单数据
const formState = reactive<FormState>({})

// 重置表单绑定表单的ref
const formRef = ref<FormInstance>(null)
const resetForm = () => {
  formRef.value?.resetFields()
}

onMounted(()=> {
  formState.account = route.query.username ?? localStorage.getItem('homeAccount')
})

</script>

<style scoped>

</style>