<template>
  <div>
    <MyTitle title="用户列表"></MyTitle>
    <SearchData :searchApi="store.getUserListAsync">
      <template #default="{ form }">
        <a-col :span="4" :offset="1">
          <a-select
            class="ml10"
            style="width: 100%"
            v-model:value="form.role"
            placeholder="请选择用户类型"
          >
            <a-select-option :value="l.value" v-for="(l, i) in roles" :key="i">
              {{ l.label }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="4" :offset="1">
          <a-range-picker v-model:value="form.date" />
        </a-col>
      </template>
    </SearchData>
    <FormModal
      v-model:visible="visible"
      ref="alertform"
      :rules="rules"
      :submit="submitForm"
      title="修改用户信息"
    >
      <template #cake="{ form }">
        <a-form-item label="用户名称" name="username" has-feedback>
          <a-input
            autocomplete="off"
            placeholder="请输入用户名称"
            v-model:value="form.username"
          ></a-input>
        </a-form-item>

        <a-form-item label="手机号码" name="phone" has-feedback>
          <a-input
            autocomplete="off"
            placeholder="请输入手机号码"
            v-model:value="form.phone"
          ></a-input>
        </a-form-item>

        <a-form-item label="用户角色" name="role" has-feedback>
          <a-select v-model:value="form.role" placeholder="请选择用户角色">
            <a-select-option v-for="(l, i) in roles" :key="i" :value="l.value">
              {{ l.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </template>
    </FormModal>
    <TableData
      :dataSource="userList"
      :columns="columns"
      @deleteOne="delUserOne"
      @updateOne="setUserOne"
      :offset="1"
    >
      <template #default="{ record, column }">
        <template v-if="column.key === 'time'">
          <span> {{ timeFormat(record.time) }}</span>
        </template>

        <template v-if="column.key === 'role'">
          <a-tag
            v-if="roles.length > 0"
            :color="roles.find((item: any)=>item.value==record.role).color"
          >
            {{ roles.find((item: any) => item.value == record.role).label }}
          </a-tag>
        </template>
      </template>
    </TableData>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, toRefs, toRef, reactive, ref, nextTick } from "vue";
import SearchData from "@/components/SearchData.vue";
import { useStore } from "../../store";
import TableData from "@/components/TableData.vue";
import { useCommon } from "../../hooks/common/useCommon";
import { adduser, getusers, deluserone, setuserone } from "../../api/user";
import { getroles } from "../../api/role";
import FormModal from "@/components/FormModal.vue";
import { useVerification } from "../../hooks/demo/useVerification";


const store = useStore();
const userList: any = toRef(store, "userList");
const alertform = ref<any>();
const visible = ref<boolean>(false)
const { timeFormat } = useCommon();
const { phone } = useVerification();
const roles = ref<any>([]);
const updateId = ref<String>("");
const rules = {
  username: [
    {
      required: true,
      message: "请输入用户名称!",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入手机号码!",
    },
    {
      pattern: phone,
      message: "请输入正确的手机号码",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码!",
    },
  ],
  role: [
    {
      required: true,
      message: "请选择!",
    },
  ],
}
const getRoles = () => {
  getroles().then((res) => {
    if (res.data.code == 200) {
      roles.value = res.data.result;
    }
  });
}
const columns = [
  {
    title: "序号",
    key: "index",
    align: "center",
  },
  {
    title: "用户名称",
    dataIndex: "username",
    key: "username",
    align: "center",
  },
  {
    title: "联系方式",
    dataIndex: "phone",
    key: "phone",
    align: "center",
  },
  {
    title: "注册时间",
    dataIndex: "time",
    key: "time",
    align: "center",
  },
  {
    title: "角色",
    key: "role",
    dataIndex: "role",
    align: "center",
  },
  {
    title: "操作",
    key: "action",
    align: "center",
  },
];
onMounted(() => {
  getRoles();
  nextTick(() => {
    store.getUserListAsync();
  });
});

// 删除
const delUserOne = (record: any) => {
  deluserone({
    _id: record._id,
  }).then((res) => {
    if (res.data.code == 200) {
      store.getUserListAsync();
    }
  });
};

const setUserOne = (record: any) => {
  visible.value = true
  alertform.value.form = Object.assign({}, record);
  updateId.value = record._id;
};

// 提交修改
const submitForm = (value: any) => {
  setuserone({
    ...value,
    _id: updateId.value,
  }).then((res) => {
    if (res.data.code == 200) {
      visible.value = false
      var list = userList.value.map((item: any) => {
        if (item._id == updateId.value) {
          item = Object.assign(item, value);
        }
        return item;
      });
      store.getUserListSync(list);
    }
  });
};
</script>
