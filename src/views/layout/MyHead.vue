<template>
  <div>
    <a-layout-header class="a-head">
              <a-modal
            v-model:visible="visible"
            title="修改密码"
            @ok="changepass"
            okText="确认修改"
            cancelText="取消"
            okType="danger"
            width="30%"
            >
            <a-form
                    :rules="rules"
                    ref="formRef"
                    :model="form"
                    name="normal_login"
                    class="login-form"
                    :layout="layout"
                >
                    <a-form-item
                        label="旧密码"
                        name="oldpass"
                        has-feedback
                    >
                        <a-input v-model:value="form.oldpass" disabled >
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item
                        label="新密码"
                        name="newpass"
                        has-feedback
                    >
                        <a-input-password v-model:value="form.newpass">
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item
                      label="确认新密码"
                      name="dbnewpass"
                      has-feedback
                    >
                        <a-input-password v-model:value="form.dbnewpass">
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input-password>
                    </a-form-item>
                </a-form>
      </a-modal>
      <a-row style="height:100%">
        <a-col :span="8" class="a-item">
            <right-circle-two-tone v-if="collapsed"
              @click="changeSide" class="color size trigger" />

            <left-circle-two-tone  v-else @click="changeSide"  class="color size trigger" />
            <a-typography-title class="color" :level="3">学员成绩管理系统</a-typography-title>
        </a-col>
        <a-col :span="8" class="a-item">
            <marquee behavior="" direction="">
                <div class="tlist">
                    <h2>ABCD</h2>
                    <h2>EFGH</h2>
                </div>
            </marquee>
        </a-col>
        <a-col :span="8" class="a-item">
          <div class="info" v-if="userInfo.username">
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  <span class="color">{{ userInfo.username }}</span>
                  <DownOutlined class="color"/>
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a href="javascript:;">个人中心</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">设置</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">成绩中心</a>
                    </a-menu-item>
                    <a-button size="small" type="primary" @click="ShowModal">修改密码</a-button>
                  </a-menu>
                </template>
              </a-dropdown>

              <div class="ml15">
                <a-tag :color="userInfo.color">{{ userInfo.label }}</a-tag>
              </div>

              <my-avatar></my-avatar>

              <a-tooltip title="注销登录">
                <a-button danger  @click="todoLogout" class="ml15 btn"  shape="circle" size="middle">
                <template #icon><ExportOutlined /></template>
                </a-button>
              </a-tooltip>
          </div>
        </a-col>
      </a-row>
    </a-layout-header>
  </div>
</template>

<script lang="ts" setup>
import { ref,computed, reactive, defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../../store/index'
import { LeftCircleTwoTone, RightCircleTwoTone, ExportOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode, defineComponent } from 'vue';
import MyAvatar from './MyAvatar.vue'
import { useVerification } from '../../hooks/demo/useVerification';
import type { Rule } from 'ant-design-vue/es/form';
import { FormInstance } from 'ant-design-vue/es/form';
import { ShowFail } from '../../utils/message';
import { changeuserinfo } from '../../api/'

const store = useStore()
const userInfo = computed(() => store.userInfo)
const router = useRouter()
const visible = ref<boolean>(false)
const { pwd } = useVerification()
const props = defineProps({
  collapsed: {
    type: Boolean
  }
})

const emit = defineEmits(['changeSideEmit'])

const changeSide = () => {
  emit('changeSideEmit')
}


// 对话框
const todoLogout = ()=>{
    Modal.confirm({
        title: '友情提示',
        cancelText:"取消",
        okText:"确定",
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('h2', { style: 'color:red;' }, '你真的要退出登录吗???'),
        onOk() {
            localStorage.removeItem("homeAccount")
            localStorage.removeItem("phone")
            sessionStorage.removeItem('token')
            store.clearUserInfo()
            router.replace('/login')
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
    });
}

const layout = 'vertical'
const formRef = ref<FormInstance>()
const form = ref<any>({

})
const checkpasscommon = async (_rule: Rule, value: string)=>{   // dbnewpass
    if(pwd.test(value) && pwd.test(form.value.newpass)){
        if(value !== form.value.newpass){
            return Promise.reject("两次密码不匹配");
        }else{
            return Promise.resolve();
        }
    }
}

// newpass 触发正则
const checkpassword = async (_rule: Rule, value: string) => {
    if(pwd.test(value) && pwd.test(form.value.dbnewpass)){
        formRef.value?.validateFields('dbnewpass');  // 调起某个字段的正则语法
    }
}

const rules = reactive({
    newpass:[
        {
            required: true, message: '请输入密码!'
        },
        {
            pattern:pwd,
            message:'请输入正确的登录密码(6-16的数字+字母)'
        },
        {
            validator:checkpassword
        }
    ],
    dbnewpass:[
        {
            required: true, message: '请输入密码!'
        },
        {
            pattern:pwd,
            message:'请输入正确的登录密码(6-16的数字+字母)'
        },
        {
            validator:checkpasscommon
        }
    ]
})

const ShowModal = ()=>{
    visible.value = true;
    form.value.oldpass = userInfo.value.password;
}
const changepass = () => {
    formRef.value?.validate()
    .then( async (value:any)=>{
        console.log(value)
        if(value.newpass==value.oldpass){
            ShowFail("修改的新密码不能和旧密码一致")
        }else{
            changeuserinfo({
                password:value.newpass
            }).then((res) => {
              if(res.data.code == 200){
                router.replace('/login')
              }
            })
        }
    })
    .catch(err=>{
        ShowFail('密码格式不对')
    })
}

</script>

<style scoped lang="scss">
.a-head{
    padding:0 20px;
    .a-item{
        display: flex;
        align-items: center;
        height:100%;
    }
    .info{
        padding-left:20px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width:100%;
        .btn{
            margin-top:5px;
        }
    }
    .tlist{
        display: flex;
        align-items: center;
        h2{
            color:#f50;
            font-size: 18px;
            margin:0 50px;
        }
    }
    .size{
        font-size: 22px;
        cursor: pointer;
    }
    .color{
        color:#fff;
        margin:0;
    }
}
</style>