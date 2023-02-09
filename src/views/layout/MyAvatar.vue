

<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue';
import { ref , toRefs } from 'vue';
import { uploadFile, changeuserinfo } from '../../api/index.ts'
import { useStore } from '../../store/index';

const fileRef = ref<any>()
const store = useStore()
const { userInfo } = toRefs(store)

// 点击上传
const todoUpload = ()=>{
    fileRef.value?.click()
}

// 上传文件
const startSendFile = () => {
    const file = fileRef.value?.files[0]
    console.log(file)

    const data = new FormData()  // 新建的JS 表单对象
    data.append('file',file)     // 上传文件的数据  <input type="file" name='file' ref="fileRef" @change='startSendFile'  class="file">
    console.log(data)
    // 1. 先上传文件
    uploadFile(data).then((res) => {
      console.log(res);
      // 2. 再修改数据库信息
      changeuserinfo({
          avatar: res.data.path
      }).then(rel => {
        // 3. 最后修改前端的本地数据 pinia
        if(rel.data.code==200){
            console.log(userInfo)
            console.log('zx', rel);
            userInfo.value.avatar = res.data.path;
            store.changeUserInfo(userInfo.value)
        }
      })
    })
}
</script>

<template>
     <a-tooltip title="切换头像">
        <div class="ml15">
            <input type="file" ref="fileRef" @change='startSendFile'  class="file">

            <a-avatar
                v-if="userInfo.avatar"
                size="middle"
                :src="userInfo.avatar.replace(/public/, 'http://localhost:3000/')"
                @click="todoUpload" >
            </a-avatar>

            <!-- 默认头像  -->
            <a-avatar v-else size="middle" @click="todoUpload" >
                <template #icon><UserOutlined /></template>
            </a-avatar>
        </div>
       
    </a-tooltip>
</template>

<style lang="scss" scoped>
.file{
    display:none;
}
</style>