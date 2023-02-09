<template>
    <div class='reg-box lgbox'>
        <div class="login-box">
            <h2 class="title">学员成绩管理系统</h2>
            <a-tabs centered>
                <a-tab-pane key="phone" tab="找回密码" force-render>
                  <a-form
                      ref="formRef"
                      :model="formState"
                      name="basic"
                      :label-col="{ span: 6 }"
                      :wrapper-col="{ span: 16 }"
                      autocomplete="off"
                      @finish="onFinish"
                      @finishFailed="onFinishFailed('提交数据信息有误!')"
                  >
                      <a-form-item
                          label="手机号"
                          name="phone"
                          :rules="[
                              { required: true, message: '请输入手机号!' },
                              {
                                  pattern: phone,
                                  message:'请输入正确格式的手机号码'
                              }
                          ]"
                      >
                          <a-input v-model:value="formState.phone" />
                      </a-form-item>
                      <a-form-item
                        label="新的密码"
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
                      <a-form-item class="lastitem" :wrapper-col="{ offset: 6, span: 16 }">
                          <div class="alinks">
                              <router-link to="/reg" class="litem ">立即注册</router-link>
                          </div>
                      </a-form-item>
                      <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                          <a-button type="primary" html-type="submit" block>提交验证</a-button>
                          <a-button danger class="mt10"  @click="resetData" block>重置</a-button>
                      </a-form-item>
                  </a-form>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref,reactive  } from 'vue';
import { FormInstance } from 'ant-design-vue';
import { useCommon } from '../../hooks/common/useCommon';
import type { FormState } from '../../utils/types';
import { useVerification } from '../../hooks/demo/useVerification'
import {useRouter} from 'vue-router'
import { findPwd } from '../../api'

const router = useRouter()
const { phone, pwd } = useVerification()

const formRef = ref<FormInstance>(null)

const { onFinishFailed } = useCommon()
const formState = reactive<FormState>({})

const onFinish = (value: FormState) => {
  findPwd(value).then(res => {
    console.log(res);
    if (res.data.code === 200) {
      router.push('/login')
    }
  })
}

const resetData = ()=>{
    formRef.value?.resetFields()
}

</script>

<style lang="scss" scoped>
.lgbox{
  :deep(.ant-form-item-required) {
    color:#fff;
  }
  height: 100vh;
  background-image: url(../../assets/images/loginBg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}
</style>