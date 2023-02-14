<template>
  <div>
    <MyTitle
      style="margin: 10px 0"
      :level="2"
      direction="center"
      title="班级管理"
    ></MyTitle>
    <a-row class="mt10">
      <a-col>
        <a-button style="margin-left: 55px" type="primary" @click="showModal"
          >添加班级</a-button
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

    <!-- 弹框 -->
    <form-modal
      ref="alertform"
      v-model:visible="visible"
      :title="title"
      :rules="rules"
      :submit="submitClass"
    >
      <template #cake="{ form }">
        <a-form-item label="学科选择" name="subject" has-feedback>
          <a-select v-model:value="form.subject">
            <a-select-option
              :value="item.label"
              v-for="(item, index) in subjects"
              :key="index"
            >
              {{ item.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="班级年份" name="year" has-feedback>
          <a-select v-model:value="form.year">
            <a-select-option
              :value="item"
              v-for="(item, index) in years"
              :key="index"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="班级序号" name="index" has-feedback>
          <a-select v-model:value="form.index">
            <a-select-option
              :value="item < 10 ? '0' + item : index"
              v-for="(item, index) in 30"
              :key="index"
            >
              {{ item < 10 ? "0" + item : item }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </template>
    </form-modal>

    <!-- 表格 -->
    <a-row class="mt10">
      <a-col :span="23" :offset="1">
        <!-- pagination每一页显示多少条 -->
        <a-table
          :dataSource="classList"
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

<script>
import FormModal from "../../components/FormModal.vue";
import {
  addClass,
  getClasses,
  getAllSubject,
  delClasses,
  updateClass,
} from "@/api/education.ts";

export default {
  components: {
    FormModal,
  },
  data() {
    return {
      rules: {
        year: [{ required: true, message: "请输入年份" }],
        index: [{ required: true, message: "请输入班级序号" }],
        subject: [{ required: true, message: "请输入学科" }],
      },
      visible: false,
      dialogFlag: true, // 弹框提交时是添加还是修改 true -> 添加 false -> 修改
      subjects: [],
      years: [],
      classList: [], // 班级数据
      updateId: "", // 修改id
      keyword: "",
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
          align: "center",
          customRender: ({ text, record, index }) => `${index + 1}`,
        },
        {
          title: "班级名称",
          dataIndex: "label",
          key: "label",
          align: "center",
        },
        {
          title: "班级编码",
          dataIndex: "value",
          // key: "value",
          align: "center",
        },
        {
          title: "年份",
          dataIndex: "year",
          key: "year",
          align: "center",
        },
        {
          title: "编号",
          dataIndex: "index",
          key: "index",
          align: "center",
        },
        {
          title: "班级ID",
          key: "_id",
          align: "center",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
        },
      ],
    };
  },
  methods: {
    showModal() {
      this.$refs.alertform.form = {}
      this.visible = true;
      this.dialogFlag = true;
    },
    getClass() {
      getClasses().then((res) => {
        if (res.data.code === 200) {
          // 获取到的班级数据保存起来
          this.classList = res.data.result;
        }
      });
    },
    submitClass(value) {
      console.log(111, value);
      if (this.dialogFlag) {
        addClass(value).then((res) => {
          if (res.data.code === 200) {
            this.visible = false;
            this.getClass();
          }
        });
      } else {
        value._id = this.updateId;
        updateClass(value).then((res) => {
          if (res.data.code === 200) {
            this.visible = false;
            this.getClass();
            // 或者前后端分离修改
            // this.classList = this.classList.map(item=>{
            //     if(item._id==value._id){
            //         item = {...value}
            //     }
            //     return item;
            // })
            this.$refs.alertform.form = {};
          }
        });
      }
    },
    getSubjectList() {
      getAllSubject().then((res) => {
        if (res.data.code === 200) {
          this.subjects = res.data.result;
        }
      });
    },
    deleteItem(item, index) {
      delClasses({ _id: item._id }).then((res) => {
        if (res.data.code === 200) {
          console.log(1111111);
          this.classList = this.classList.filter((val) => val._id !== item._id);
        }
      });
    },
    updateItem(record) {
      this.visible = true;
      this.dialogFlag = false;
      this.$refs.alertform.form = Object.assign({}, record);
      this.updateId = record._id;
    },
    todoSearch() {
      this.getClass({ keyword: this.keyword });
    },
    resetData() {
      this.keyword = "";
      this.getClass();
    },
  },
  computed: {
    title() {
      return this.dialogFlag ? "添加班级" : "修改班级";
    },
  },
  created() {
    this.getClass();
  },
  mounted() {
    this.getSubjectList();
    let year = new Date().getFullYear();
    for (let i = -5; i < 5; i++) {
      this.years.push(i + year);
    }
  },
};
</script>

<style scoped></style>
