<template>
    <div class='reg-box lgbox'>
        <div class="login-box">
            <h2 class="title">学员成绩管理系统</h2>
            <a-tabs v-model:activeKey="activeKey" centered>
                <a-tab-pane key="account" tab="账号登录">
                  <LoginByAccount></LoginByAccount>
                </a-tab-pane>
                <a-tab-pane key="phone" tab="手机号登录" force-render>
                  <LoginByPhone></LoginByPhone>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LoginByAccount from './LoginByAccount.vue'
import LoginByPhone from './LoginByPhone.vue'

const activeKey = ref('account')


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