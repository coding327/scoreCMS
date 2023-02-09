<template>
    <div class='reg-box lgbox'>
        <div class="login-box">
            <h2 class="title">欢迎注册(学员)</h2>
            <div class="box">
                <!-- :label-col="labelCol" -->
                <a-form
                    :rules="rules"
                    ref="formRef"
                    :model="form"
                    name="normal_login"
                    class="login-form"
                    @finish="onFinish"
                    @finishFailed="onFinishFailed"
                    v-bind="layout"
                >
                    <a-form-item
                        label="用户名称"
                        name="username"
                        has-feedback
                    >
                        <a-input autocomplete="off"  v-model:value="form.username">
                            <template #prefix>
                                <UserOutlined class="site-form-item-icon" />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item
                        label="手机号码"
                        name="phone"
                        has-feedback
                    >
                        <a-input v-model:value="form.phone">
                            <template #prefix>
                                <MobileOutlined class="site-form-item-icon" />
                            </template>
                        </a-input>
                    </a-form-item>

                    <a-form-item
                        label="登录密码"
                        name="password"
                        has-feedback
                    >
                        <a-input-password v-model:value="form.password">
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item
                        label="确认密码"
                        name="dbpass"
                        has-feedback
                    >
                        <a-input-password v-model:value="form.dbpass">
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item  :wrapper-col="wrapperCol">
                        <a-button  type="primary" block html-type="submit" class="login-form-button">
                            注册
                        </a-button>
                    </a-form-item>
                    <a-form-item :wrapper-col="wrapperCol">
                        <a-button  danger  block  html-type="reset"  class="login-form-button">
                            重置
                        </a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { UserOutlined, LockOutlined , MobileOutlined } from '@ant-design/icons-vue';
import { FormState } from '@/utils/types.ts'
import { useVerification } from '@/hooks/demo/useVerification.ts'
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ShowFail } from '../../utils/message';
import { useRouter } from 'vue-router';
import { todoRegister } from '@/api/index.ts'

const router = useRouter()

const layout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span:18
    }
}
const wrapperCol = {
    span:18,
    offset:6,
}
const { phone, pwd  } = useVerification()
const form = reactive<FormState>({

})

// password 触发正则
const checkPassWord  = async (_rule: Rule, value: string) => {
  // 两个密码正则都通过，判断两次密码是否匹配
  if(pwd.test(value) && pwd.test(form.dbpass)) {
    formRef.value?.validateFields('dbpass')
  }
}

// 判断两次密码是否匹配
const checkPassCommon = async (_rule: Rule, value: string) => {   // dbpass
  if(pwd.test(value) && pwd.test(form.password)){
      if (value !== form.password) {
          return Promise.reject("两次密码不匹配");
      }else{
          return Promise.resolve();
      }
  }
}

const rules: any = reactive({
    username:[
        {
            required: true, message: '请输入用户名称!'
        }
    ],
    phone:[
        {
            required: true, message: '请输入手机号码!'
        },
        {
            pattern: phone,
            message: '请输入正确的手机号码'
        }
    ],
    password:[
        {
            required: true, message: '请输入密码!'
        },
        {
            pattern:pwd,
            message:'请输入正确的登录密码(6-16的数字+字母)'
        },
        {
            validator: checkPassWord
        }
    ],
    dbpass:[
        {
            required: true, message: '请输入密码!'
        },
        {
            pattern:pwd,
            message:'请输入正确的登录密码(6-16的数字+字母)'
        },
        {
            validator: checkPassCommon
        }
    ]
})

const formRef = ref<FormInstance>()
const onFinish = async (value: FormState)=>{
  console.log(value)
  todoRegister(value).then(res => {
    if (res.data.code === 200) {
      // router.push('/login')
      router.push({
        name: 'login',
        query: value
      })
    }
  })
}
const onFinishFailed = () => {
    ShowFail('表单数据校验失败')
}

const resetData = () => {
  console.log(formRef.value)
  formRef.value?.resetFields()
}

onMounted(() => {
  console.log(formRef.value)
})
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