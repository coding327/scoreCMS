<template>
  <div class="colitem" ref="echartRef"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps({
  data: Object
})

const echartRef = ref<any>(null)

const echartinit = (container, data) => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(container.value)
  // 绘制图表
  myChart.setOption(data)
}

onMounted(() => {
  echartinit(echartRef, props.data)
})

</script>

<style scoped>

</style>