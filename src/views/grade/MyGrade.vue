<template>
  <div>
    <MyTitle title="我的成绩"> </MyTitle>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { getmygrades } from "@/api/grade";

const getMyGrade = () => {
  getmygrades().then((res) => {
    if (res.data.code === 200) {
      console.log(res.data.result);
    }
  });
};

onMounted(() => {
  getMyGrade();
});
</script>

<style lang="scss" scoped>

</style>