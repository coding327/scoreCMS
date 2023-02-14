<template>
    <a-layout-sider v-model:collapsed="acollapsed" style="overflow: auto;">
      <div class="logo">
        <img class="logoImg" :style="{height: acollapsed? '30px' : '80px'}" :src="logo" alt="">
      </div>
      <a-menu
        class="nopoint"
        v-model:selectedKeys="selectedKeys"
        :open-keys="openKeys"
        :theme="theme"
        mode="inline"
        @openChange="onOpenChange"
        @click="menuHandle">

          <a-menu-item key="/layout/home">
            <template #icon>
              <MailOutlined />
            </template>
            首页
          </a-menu-item>

          <a-sub-menu key="/layout/score">
            <template #icon>
              <AppstoreOutlined />
            </template>
            <template #title>成绩管理</template>
            <a-menu-item key="/layout/score/myscore">
              <template #icon>
                <MailOutlined />
              </template>
              我的成绩
            </a-menu-item>
            <a-menu-item key="/layout/score/commitscore">
              <template #icon>
                <MailOutlined />
              </template>
              提交成绩
            </a-menu-item>
            <a-menu-item key="/layout/score/grade">
              <template #icon>
                <MailOutlined />
              </template>
              成绩打分
            </a-menu-item>
            <a-menu-item key="/layout/score/analyze">
              <template #icon>
                <MailOutlined />
              </template>
              成绩分析
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="/layout/anno">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>公告管理</template>
            <a-menu-item key="/layout/anno/annolist">
              <template #icon>
                <MailOutlined />
              </template>
              公告列表
            </a-menu-item>
            <a-menu-item key="/layout/anno/sendanno">
              <template #icon>
                <MailOutlined />
              </template>
              发表公告
            </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="/layout/education">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>教务管理</template>
            <a-menu-item key="/layout/education/subjectm">
              <template #icon>
                <MailOutlined />
              </template>
              学科管理
            </a-menu-item>
            <a-menu-item key="/layout/education/classm">
              <template #icon>
                <MailOutlined />
              </template>
              班级管理
            </a-menu-item>
            <a-menu-item key="/layout/education/studentm">
              <template #icon>
                <MailOutlined />
              </template>
              学员管理
            </a-menu-item>
          </a-sub-menu>

          <a-menu-item key="/layout/me">
            <template #icon>
              <UserOutlined />
            </template>
            个人中心
          </a-menu-item>

      </a-menu>
    </a-layout-sider>
</template>

<script lang="ts" setup>
import { MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons-vue';
import { reactive, defineProps, computed, toRefs, onMounted } from 'vue'
import logo from '@/assets/images/loginBg.jpg'
import { useRoute } from 'vue-router'
import { useCommon } from '@/hooks/common/useCommon.ts'
import type { MenuTheme } from 'ant-design-vue';

const {gotowhere} = useCommon()
const route = useRoute()
const props = defineProps({
  collapsed: {
    type: Boolean
  }
})

const acollapsed = computed(() => props.collapsed)
const menuState: any = reactive({
  theme: 'dark' as MenuTheme,
  rootSubmenuKeys: ['/layout/score', '/layout/anno', '/layout/education'],
  selectedKeys: [],
  openKeys: []
})

const { theme, selectedKeys, openKeys } = toRefs(menuState)

const menuHandle = (value: any) => {
  // console.log(11, value)
  gotowhere(value.key)
}

const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find(key => menuState.openKeys.indexOf(key) === -1);
  if (menuState.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
    menuState.openKeys = openKeys;
  } else {
    menuState.openKeys = latestOpenKey ? [latestOpenKey] : [];
  }
}

onMounted(() => {
  menuState.selectedKeys = [route.path]
})

</script>

<style lang="scss" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.logo{
  padding:20px;
  width:100%;
  .logoImg{
    width:100%;
    /* height:80px; */
    border-radius: 10px;
  }
}

.nopoint {
  user-select: none;
}
</style>