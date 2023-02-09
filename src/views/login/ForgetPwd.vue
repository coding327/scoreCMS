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
                        label="验证码"
                        name="captcha"
                        :rules="[
                            { required: true, message: '请输入验证码' },
                            {
                                pattern: code,
                                message: '请输入正确的验证码(4位数字)'
                            }
                        ]"
                    >
                        <a-row>
                            <a-col :span="12">
                                <a-input v-model:value="formState.captcha" />
                            </a-col>
                            <a-col :span="11" :offset="1">
                                <a-button v-if="toggle" type="primary" :disabled="!disabled"  @click="todoSendCaptcha"  block>发送验证码</a-button>
                                <a-button v-else danger :disabled="true" block> 剩余 {{ counter }} S </a-button>
                            </a-col>
                        </a-row>
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
import { ref,reactive,computed  } from 'vue';
import { FormInstance } from 'ant-design-vue';
import { useCommon } from '../../hooks/common/useCommon';
import { useIntervalFn } from '@vueuse/core'
import type { FormState } from '../../utils/types';
import { useVerification } from '../../hooks/demo/useVerification'
import {useRouter} from 'vue-router'
import { findPwd, sendCaptcha } from '../../api'

const counter = ref<number>(60)
const toggle = ref<boolean>(true)
const router = useRouter()
const { phone, pwd, code } = useVerification()
const disabled = computed(()=>{
    return phone.test(formState.phone)
})
const { pause, resume } = useIntervalFn(() => {
  if(counter.value > 0){
      counter.value--
  }else{
      pause()
      counter.value = 60;
      toggle.value = true;
  }
}, 1000, { immediate: false })
const formRef = ref<FormInstance>(null)

const { onFinishFailed, gotowhere } = useCommon()
const formState = reactive<FormState>({})

const onFinish = (value: FormState) => {
  findPwd(value).then(res => {
    console.log(res);
    if (res.data.code === 200) {
      // router.push('/login')
      gotowhere('/login')
    }
  })
}

// 点击发送验证码
const todoSendCaptcha = () => {
  sendCaptcha({
    phone: formState.phone
  }).then(res => {
    console.log(res);
    if(res.data.code == 200){
      toggle.value = false
      // 启动计时器
      resume()
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