<template>
  <div>
    <MyTitle title="角色列表"></MyTitle>
    <a-button
      style="margin-left: 55px"
      type="primary"
      class="mt10"
      @click="addRole"
      >添加角色</a-button
    >
    <SearchData :searchApi="store.getRoleListAsync"></SearchData>

    <!-- 表单 -->
    <FormModal
      v-model:visible="visible"
      ref="alertform"
      :rules="rules"
      :title="flag ? '添加角色' : '修改角色'"
      :submit="submitForm"
    >
      <template #cake="{ form }">
        <a-form-item label="用户名称" name="label" has-feedback>
          <a-input
            placeholder="请输入用户名称"
            v-model:value="form.label"
          ></a-input>
        </a-form-item>

        <a-form-item label="角色值" name="value" has-feedback>
          <a-input
            autocomplete="off"
            placeholder="请输入角色值"
            v-model:value="form.value"
          ></a-input>
        </a-form-item>

        <a-form-item label="颜色属性" name="color" has-feedback>
          <a-input type="color" v-model:value="form.color"> </a-input>
        </a-form-item>
      </template>
    </FormModal>

    <TableData
      :dataSource="roleList"
      :columns="columns"
      @updateOne="setUserOne"
      @deleteOne="delUserOne"
    >
      <template #default="{ record, column }">
        <template v-if="column.key == 'label'">
          <a-tag :color="record.color"> {{ record.label }}</a-tag>
        </template>
        <template v-if="column.key == 'color'">
          <a-input disabled type="color" v-model:value="record.color" />
        </template>
        <template v-if="column.key == '_id'">
          <a-tag color="#333"> {{ record._id }}</a-tag>
        </template>
      </template>
    </TableData>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRef, onMounted, nextTick } from "vue";
import { useStore } from "../../store";
import TableData from "../../components/TableData.vue";
import FormModal from "@/components/FormModal.vue";
import SearchData from "../../components/SearchData.vue";
import { addroleone, setroleone, delroleone } from "@/api/role";
import { getUserInfo } from "@/api";
import _ from "lodash";

const store = useStore();
const roleList: any = toRef(store, "roleList");
const visible = ref<boolean>(false);
const flag = ref<boolean>(true);
const uid = ref<string>("");
const alertform = ref(null);
const columns = [
  {
    title: "序号",
    key: "index",
    align: "center",
  },
  {
    title: "角色名称",
    dataIndex: "label",
    key: "label",
    align: "center",
  },
  {
    title: "角色值",
    dataIndex: "value",
    key: "value",
    align: "center",
  },
  {
    title: "角色ID",
    dataIndex: "_id",
    key: "_id",
    align: "center",
  },
  {
    title: "颜色属性",
    dataIndex: "color",
    key: "color",
    align: "center",
  },
  {
    title: "操作",
    key: "action",
    align: "center",
  },
];
const rules = {
  label: [
    {
      required: true,
      message: "请输入用户名称!",
    },
  ],
  value: [
    {
      required: true,
      message: "请输入角色值!",
    },
  ],
  color: [
    {
      required: true,
      message: "请选择颜色!",
    },
  ],
};

// 添加角色【控制表单显示】
const addRole = () => {
  visible.value = true;
  flag.value = true;
  nextTick(() => {
    alertform.value.form.value = _.last(roleList.value)?.value + 1;
  });
};

// 修改角色【控制表单显示】
const setUserOne = (value) => {
  visible.value = true;
  flag.value = false;
  uid.value = value._id;
  nextTick(() => {
    alertform.value.form = Object.assign({}, value);
  });
};

// 提交表单【添加、修改】
const submitForm = (value) => {
  if (flag.value) {
    addroleone(value).then((res) => {
      if (res.data.code === 200) {
        store.getRoleListAsync();
        visible.value = false;
      }
    });
  } else {
    value._id = uid.value;
    setroleone(value).then((res) => {
      if (res.data.code === 200) {
        visible.value = false;
        let list = _.map(roleList.value, (v: any) => {
          if (value._id == v._id) {
            v = { ...value };
          }
          return v;
        });
        store.getRoleListSync(list);

        getUserInfoData();
      }
    });
  }
};

// 删除
const delUserOne = (item: any) => {
  delroleone({ _id: item._id }).then((res) => {
    if (res.data.code === 200) {
      store.getRoleListAsync();
      // let list = _.filter(roleList.value, (v: any) => item._id != v._id);
      // store.getRoleListSync(list);
    }
  });
};

const getUserInfoData = () => {
  getUserInfo().then((res) => {
    if (res.data.code == 200) {
      store.getAsyncData(res.data.result);
    }
  });
};

onMounted(() => {
  store.getRoleListAsync();
});
</script>

<style scoped>
.c {
  color: #ffc0cb;
}
</style>
