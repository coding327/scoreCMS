<template>
    <div class="myform">
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

            <a-form-item class="lastitem" :wrapper-col="{ offset: 6, span: 16 }">
                <div class="alinks">
                    <router-link to="/reg" class="litem ">立即注册</router-link>
                    <router-link to="/forgetPwd"  class="litem bg">找回密码</router-link>
                </div>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                <a-button type="primary" html-type="submit" block>验证登录</a-button>
                <a-button danger class="mt10"  @click="resetData" block>重置</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { ref,reactive,computed, onMounted  } from 'vue';
import { FormInstance } from 'ant-design-vue';
import { useCommon } from '../../hooks/common/useCommon';
import type { FormState } from '../../utils/types';
import { useIntervalFn } from '@vueuse/core'
import { useVerification } from '../../hooks/demo/useVerification'
import { sendCaptcha, checkCaptcha } from '../../api'
import { useRoute} from 'vue-router'

const route = useRoute()
const { phone, code } = useVerification()

const formRef = ref<FormInstance>(null)

const { onFinishFailed, gotowhere } = useCommon()

// 校验验证码
const onFinish = (value: FormState)=>{
  checkCaptcha(value).then(res => {
    console.log('token', res)
    if (res.data.code === 200) {
      // 跳转
      // router.push('/layout')
      gotowhere('/layout')
      localStorage.setItem('phone', value.phone)
      sessionStorage.setItem('token', res.data.token)
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

const formState = reactive<FormState>({})

const disabled = computed(()=>{
    return phone.test(formState.phone)
})

const toggle = ref<boolean>(true)
const counter = ref<number>(60)

const { pause, resume } = useIntervalFn(() => {
  if(counter.value > 0){
      counter.value--
  }else{
      pause()
      counter.value = 60;
      toggle.value = true;
  }
}, 1000, { immediate: false })


const resetData = ()=>{
    formRef.value?.resetFields()
}

onMounted(() => {
  formState.phone = route.query.phone ?? localStorage.getItem('phone')
})

</script>



