<template>
  <a-layout-sider v-model:collapsed="acollapsed" style="overflow: auto">
    <div class="logo">
      <img
        class="logoImg"
        :style="{ height: acollapsed ? '30px' : '80px' }"
        :src="logo"
        alt=""
      />
    </div>
    <a-menu
      class="nopoint"
      v-model:selectedKeys="selectedKeys"
      :open-keys="openKeys"
      :theme="theme"
      mode="inline"
      @openChange="onOpenChange"
      @click="menuHandle"
    >
      <a-menu-item key="/layout/home">
        <template #icon>
          <AppstoreOutlined />
        </template>
        首页
      </a-menu-item>

      <a-sub-menu key="/layout/grade">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>成绩管理</template>
        <a-menu-item key="/layout/grade/add">
          <template #icon>
            <AppstoreOutlined />
          </template>
          提交项目
        </a-menu-item>
        <a-menu-item key="/layout/grade/list">
          <template #icon>
            <AppstoreOutlined />
          </template>
          成绩列表
        </a-menu-item>
        <a-menu-item key="/layout/grade/data">
          <template #icon>
            <AppstoreOutlined />
          </template>
          成绩分析
        </a-menu-item>
        <a-menu-item key="/layout/grade/mygrade">
          <template #icon>
            <AppstoreOutlined />
          </template>
          我的成绩
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="/layout/anno">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>公告管理</template>
        <a-menu-item key="/layout/anno/annolist">
          <template #icon>
            <AppstoreOutlined />
          </template>
          公告列表
        </a-menu-item>
        <a-menu-item key="/layout/anno/sendanno">
          <template #icon>
            <AppstoreOutlined />
          </template>
          发表公告
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="/layout/education">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>教务管理</template>
        <a-menu-item key="/layout/education/subjectm">
          <template #icon>
            <AppstoreOutlined />
          </template>
          学科管理
        </a-menu-item>
        <a-menu-item key="/layout/education/classm">
          <template #icon>
            <AppstoreOutlined />
          </template>
          班级管理
        </a-menu-item>
        <a-menu-item key="/layout/education/studentm">
          <template #icon>
            <AppstoreOutlined />
          </template>
          学员管理
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="/layout/user">
        <template #icon>
          <UserOutlined />
        </template>
        <template #title>用户管理</template>
        <a-menu-item key="/layout/user/add">
          <template #icon>
            <UserOutlined />
          </template>
          用户新增
        </a-menu-item>
        <a-menu-item key="/layout/user/list">
          <template #icon>
            <UserOutlined />
          </template>
          用户列表
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="/layout/role">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>角色管理</template>
        <a-menu-item key="/layout/role/list">
          <template #icon>
            <AppstoreOutlined />
          </template>
          角色列表
        </a-menu-item>
        <a-menu-item key="/layout/role/data">
          <template #icon>
            <AppstoreOutlined />
          </template>
          角色分析
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="/layout/advise">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>意见管理</template>
        <a-menu-item key="/layout/advise/add">
          <template #icon>
            <AppstoreOutlined />
          </template>
          意见新增
        </a-menu-item>
        <a-menu-item key="/layout/advise/list">
          <template #icon>
            <AppstoreOutlined />
          </template>
          意见列表
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
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons-vue";
import { reactive, computed, toRefs, onMounted } from "vue";
import logo from "@/assets/images/loginBg.jpg";
import { useRoute } from "vue-router";
import { useCommon } from "@/hooks/common/useCommon.ts";
import type { MenuTheme } from "ant-design-vue";

const { gotowhere } = useCommon();
const route = useRoute();
const props = defineProps({
  collapsed: {
    type: Boolean,
  },
});

const acollapsed = computed(() => props.collapsed);
const menuState: any = reactive({
  theme: "dark" as MenuTheme,
  rootSubmenuKeys: [
    "/layout/score",
    "/layout/anno",
    "/layout/education",
    "/layout/user",
    "/layout/role",
    "/layout/advise",
  ],
  selectedKeys: [],
  openKeys: [],
});

const { theme, selectedKeys, openKeys } = toRefs(menuState);

const menuHandle = (value: any) => {
  // console.log(11, value)
  gotowhere(value.key);
};

const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find(
    (key) => menuState.openKeys.indexOf(key) === -1
  );
  if (menuState.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
    menuState.openKeys = openKeys;
  } else {
    menuState.openKeys = latestOpenKey ? [latestOpenKey] : [];
  }
};

onMounted(() => {
  menuState.selectedKeys = [route.path];
});
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

.logo {
  padding: 20px;
  width: 100%;
  .logoImg {
    width: 100%;
    /* height:80px; */
    border-radius: 10px;
  }
}

.nopoint {
  user-select: none;
}
</style>
