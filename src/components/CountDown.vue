<template>
  <div class="countDown" :style="style">
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
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  url: {
    type: String,
    default: '/login'
  },
  interval: {
    type: Number,
    default: 100
  },
  style: {
    type: Object,
    default: () => {
      return {
        top: 0,
        right: 0
      }
    }
  }
})

const router = useRouter()
const count = ref<number>(0)

const gotowhere = () => {
  router.push(props.url)
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
}, props.interval)
}

onMounted(() => {
  progressBar()
})
</script>

<style lang="scss" scoped>
.countDown {
  position: absolute;
  z-index: 100;
}
</style>