<template>
  <div>
    <div class="countDown">
      <a-progress
        type="circle"
        :stroke-color="{
          '0%': '#108ee9',
          '100%': '#87d068',
        }"
        :percent="count"
        :width="60"
      />
    </div>
    <img :src="bgImg" alt="" class="bgImg">
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue"
import { useRouter } from 'vue-router'
import bgImg from "@/assets/images/503.png"

const router = useRouter()
const count = ref<number>(0)

const gotowhere = () => {
  router.push({
    path: '/login'
  })
}

const progressBar = () => {
  let timer: any = setInterval(() => {
  if (count.value < 100) {
    count.value += 2
  } else {
    clearInterval(timer)
    timer = null
    gotowhere()
  }
}, 100)
}

onMounted(() => {
  progressBar()
})
</script>

<style lang="scss" scoped>
.countDown {
  position: absolute;
  z-index: 100;
  right: 0;
}
.bgImg{
  width:270px;
  height:270px;
  position: absolute;
  top:0;
  right:0;
  left:0;
  bottom:0;
  margin:auto;
  z-index:10;
}
</style>