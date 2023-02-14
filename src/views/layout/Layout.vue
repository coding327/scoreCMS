<template>
  <div class="layout">
    <a-layout>

      <keep-alive include="MySide">
        <my-side :collapsed="collapsed"/>
      </keep-alive>

      <a-layout>

        <my-head :collapsed="collapsed" @changeSideEmit="changeSideEmit"></my-head>

        <a-layout-content class="mainbox">
          <router-view></router-view>
        </a-layout-content>

        <my-foot></my-foot>

      </a-layout>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, toRefs } from 'vue'
import MyFoot from './MyFoot.vue'
import MyHead from './MyHead.vue'
import MySide from './MySide.vue'
import { getUserInfo } from '../../api/index.ts'
import { useStore } from '../../store/index.ts'

const store = useStore()
const { userInfo, count } = toRefs(store)
const collapsed = ref<boolean>(false)
const changeSideEmit = () => {
  collapsed.value = !collapsed.value
}

const getUserInfoData = async () => {
  let res = await getUserInfo()
  // console.log(res.data)
  if (res.data.code === 200) {
    // console.log(res.data.code)
    store.getAsyncData(res.data.result)
  }
}

onMounted(() => {
  getUserInfoData()
})

</script>

<style scoped lang="scss">
.ant-layout.ant-layout-has-sider {
  height: 100vh;
}
.layout {
  padding: 0 12px 0 0;
  overflow: auto;
}
</style>
