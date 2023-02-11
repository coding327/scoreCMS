<template>
  <div>
    <MyTitle style="margin: 10px 0" :level="2" direction="center" title="学科管理"></MyTitle>
    <a-button style="margin-left: 55px" type="primary" @click="showModal">添加学科</a-button>
    <form-modal
      v-model:visible="visible"
      title="添加学科"
      :rules="rules"
      :submit="submitSubject"
    >
      <template #cake="{form}">
        <a-form-item
          label="学科名称"
          name="label"
          has-feedback
        >
          <a-input  v-model:value="form.label"></a-input>
        </a-form-item>
        <a-form-item
          label="学科编码"
          name="subjectCode"
          has-feedback
        >
          <a-input  v-model:value="form.subjectCode"></a-input>
        </a-form-item>
      </template>
    </form-modal>

    <a-row class="mt10">
      <a-col :span="23" :offset="1">
          <a-table :dataSource="subjects" :columns="columns" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import FormModal from '../../components/FormModal.vue'
import { ref, reactive, onMounted } from 'vue'
import { subjectAdd, getAllSubject } from '@/api/education.ts'

const subjects = ref<Array<object>>([])
const visible = ref<boolean>(false)
const showModal = () => {
  visible.value = !visible.value
}

const rules = reactive({
    label:[
        {required:true,message:'请输入学科名称'}
    ],
    subjectCode:[
        {required:true,message:'请输入学科编码'}
    ]
})
// 添加学科
const submitSubject = (value:any)=>{
  console.log(value)
  subjectAdd(value).then((res) => {
    if (res.data.code === 200) {
      visible.value = false
      getAllSubjects()
    }
  })
}

// 查询学科
const getAllSubjects = () => {
  getAllSubject().then((res) => {
    if (res.data.code === 200) {
      // 数据保存
      subjects.value = res.data.result
    }
  })
}

onMounted(() => {
  getAllSubjects()
})

const columns = [
    {
        title: '序号',
        dataIndex:'index',
        key: 'index'
    },
    {
        title: '学科名称',
        dataIndex: 'label',
        key: 'label',
    },
    {
        title: '学科编码',
        dataIndex: 'subjectCode',
        key: 'value',
    },
    {
        title: '学科ID',
        dataIndex: '_id',
        key: '_id',
    },
]

</script>

<style lang="scss" scoped>
.mt10 {
  height: 100%;
}
</style>