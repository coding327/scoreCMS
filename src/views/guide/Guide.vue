<template>
    <div>
      <CountDown :url="'/login'" :style="{top: '50px', right: '100px'}"></CountDown>
      <div class="guide">
          <div class="guide-box">
              <a-carousel autoplay dots class="a-cars">
                  <div class="swipe-item" v-for="(item, index) in list" :key="index">
                      <img :src="item.imageUrl" alt="" class="aimg">
                  </div>
              </a-carousel>
          </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { getGuideBanner } from '../../api/guide'
import CountDown from '@/components/CountDown.vue'

const list = ref<any[]>([])

onMounted(() => {
  getGuideBanner().then(res => {
    console.log(res)
    list.value = res.data.banners
  })
})

</script>

<style lang="scss" scoped>
.guide{
  width:100%;
  height:100%;
  overflow: hidden;
  &-box{
    width:800px;
    height:400px;
    margin:120px auto;
    border:1px solid #ddd;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    .aimg, .a-cars{
      width:800px;
      height:400px;
    }
  }
}
</style>