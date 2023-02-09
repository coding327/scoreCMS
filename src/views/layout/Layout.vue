<template>
  <div class="layout">
    <a-layout>
      <a-layout-sider>Sider</a-layout-sider>
      <a-layout>
        <my-head></my-head>

        <a-layout-content>{{ store.count }} - {{ count }}</a-layout-content>

        <my-foot></my-foot>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, toRefs } from 'vue'
import MyFoot from './MyFoot.vue'
import MyHead from './MyHead.vue'
import { getUserInfo } from '../../api/index.ts'
import { useStore } from '../../store/index.ts'

const store = useStore()
const { userInfo, count } = toRefs(store)

const getUserInfoData = async () => {
  let res = await getUserInfo()
  console.log(res.data)
  if (res.data.code === 200) {
    console.log(res.data.code)
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
</style>
