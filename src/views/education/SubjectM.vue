<template>
  <div>
    <MyTitle
      style="margin: 10px 0"
      :level="2"
      direction="center"
      title="学科管理"
    ></MyTitle>
    <a-row class="mt10">
      <a-col>
        <a-button style="margin-left: 55px" type="primary" @click="showModal"
          >添加学科</a-button
        >
      </a-col>
      <a-col>
        <a-input
          placeholder="请输入搜索关键字"
          v-model:value="keyword"
        ></a-input>
      </a-col>
      <a-col>
        <a-button type="primary" @click="todoSearch">搜索</a-button>
        <a-button danger @click="resetData">重置</a-button>
      </a-col>
    </a-row>
    <form-modal
      ref="alertform"
      v-model:visible="visible"
      :title="dialogFlag ? '添加学科' : '修改学科'"
      :rules="rules"
      :submit="submitSubject"
    >
      <template #cake="{ form }">
        <a-form-item label="学科名称" name="label" has-feedback>
          <a-input v-model:value="form.label"></a-input>
        </a-form-item>
        <a-form-item label="学科编码" name="subjectCode" has-feedback>
          <a-input v-model:value="form.subjectCode"></a-input>
        </a-form-item>
      </template>
    </form-modal>

    <!-- 表格 -->
    <a-row class="mt10">
      <a-col :span="23" :offset="1">
        <!-- pagination每一页显示多少条 -->
        <a-table
          :dataSource="subjects"
          :columns="columns"
          :pagination="{ pageSize: 7 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <!-- 删除显示弹框 -->
              <a-popconfirm
                title="你真的要删除吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="deleteItem(record, index)"
              >
                <a-button size="small" danger> 删除 </a-button>
              </a-popconfirm>

              <a-button
                size="small"
                type="primary"
                class="ml10"
                @click="updateItem(record)"
              >
                修改
              </a-button>
            </template>

            <!-- 插槽控制其显示背景颜色 -->
            <template v-if="column.key === 'value'">
              <a-tag color="pink"> {{ record.subjectCode }} </a-tag>
            </template>

            <template v-if="column.key === '_id'">
              <a-tag color="skyblue"> {{ record._id }} </a-tag>
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import FormModal from "../../components/FormModal.vue";
import { ref, reactive, onMounted, nextTick } from "vue";
import {
  subjectAdd,
  getAllSubject,
  delSubject,
  changeSubject,
} from "@/api/education.ts";

const subjects = ref<Array<object>>([]);
const visible = ref<boolean>(false);
const alertform = ref<any>(null);
const dialogFlag = ref<boolean>(false); // 提交时分添加学科和修改学科   true -> 添加学科 false -> 修改学科
const updateId = ref<string>("");
const keyword = ref<string>("");

const rules = reactive({
  label: [{ required: true, message: "请输入学科名称" }],
  subjectCode: [{ required: true, message: "请输入学科编码" }],
});

// 添加学科控制弹框弹出
const showModal = () => {
  visible.value = !visible.value;
  dialogFlag.value = true;
};

// 提交学科【添加、修改】
const submitSubject = (value: any) => {
  // console.log(value);
  // 添加学科提交
  if (dialogFlag.value) {
    subjectAdd(value).then((res) => {
      if (res.data.code === 200) {
        visible.value = false;
        getAllSubjects();
      }
    });
  } else {
    // 修改学科提交
    value._id = updateId.value;
    changeSubject(value).then((res) => {
      if (res.data.code === 200) {
        visible.value = false;
        // 不分离，直接查询所有学科
        getAllSubjects();
      }
    });
  }
};

// 查询学科
const getAllSubjects = (data?: any) => {
  getAllSubject(data).then((res) => {
    if (res.data.code === 200) {
      // 数据保存
      subjects.value = res.data.result;
    }
  });
};

// 删除学科
const deleteItem = (record) => {
  // console.log(record)
  delSubject({ _id: record._id }).then((res) => {
    // console.log(res.data);
    // 后端删除成功
    if (res.data.code === 200) {
      // 前端删除
      subjects.value = subjects.value.filter(
        (item, index) => item._id !== record._id
      );
    }
  });
};

// 修改学科【包含了修改学科弹框弹出】
const updateItem = (record) => {
  visible.value = true;
  dialogFlag.value = false;

  nextTick(() => {
    // console.log(1111, record);
    // console.log(1234, Object.assign({}, record));
    updateId.value = record._id;
    // reactive不要直接赋值【不管你是什么数据，响应式代理、普通数据】，只能通过.属性更改其中数据
    // alertform.value.form.label = record.label
    // 但是ref可以直接赋值，与reactive相反什么数据都可以赋值，但是保证其响应式，就通过.value 单向数据流，组件之间传递的是普通数据，响应式数据会造成子改父
    alertform.value.form = Object.assign({}, record);
  });
};

const todoSearch = () => {
  getAllSubjects({
    keyword: keyword.value
  })
};

const resetData = () => {
  keyword.value = "";
  getAllSubjects()
};

onMounted(() => {
  getAllSubjects();
});

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index",
    align: "center",
    customRender: ({ text, record, index }) => `${index + 1}`,
  },
  {
    title: "学科名称",
    dataIndex: "label",
    key: "label",
    align: "center",
  },
  {
    title: "学科编码",
    dataIndex: "subjectCode",
    key: "value",
    align: "center",
  },
  {
    title: "学科ID",
    dataIndex: "_id",
    key: "_id",
    align: "center",
  },
  {
    title: "操作",
    key: "action",
    align: "center",
  },
];
</script>

<style lang="scss" scoped>
.mt10 {
  height: 100%;
}
</style>
