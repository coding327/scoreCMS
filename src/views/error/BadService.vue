<template>
  <div>
    <a-progress
      type="circle"
      :stroke-color="{
        '0%': '#108ee9',
        '100%': '#87d068',
      }"
      :percent="count"
    />
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue"

const count = ref<number>(0)
const progressBar = () => {
  let timer: any = setInterval(() => {
  if (count.value < 100) {
    count.value += 2
  } else {
    clearInterval(timer)
    timer = null
  }
}, 100)
}

onMounted(() => {
  progressBar()
})
</script>

<style lang="scss" scoped>

</style>