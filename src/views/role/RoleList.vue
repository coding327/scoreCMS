<template>
  <div>
    <MyTitle title="角色列表"></MyTitle>
    <a-button danger class="mt10">添加角色</a-button>
    <SearchData> </SearchData>

    <!--  @deleteOne="delUserOne"
            @updateOne="setUserOne" -->
    <TableData :dataSource="roleList" :columns="columns">
      <template #default="{ record, column }">
        <template v-if="column.key == 'label'">
          <a-tag :color="record.color"> {{ record.label }}</a-tag>
        </template>
        <template v-if="column.key == 'color'">
          <a-input type="color" v-model:value="record.color" />
        </template>
        <template v-if="column.key == '_id'">
          <a-tag color="#333"> {{ record._id }}</a-tag>
        </template>
      </template>
    </TableData>
  </div>
</template>

<script lang="ts" setup>
import { toRef, onMounted, reactive } from "vue";
import { useStore } from "../../store";
import TableData from "../../components/TableData.vue";
import SearchData from "../../components/SearchData.vue";
const store = useStore();
const roleList: any = toRef(store, "roleList");
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
onMounted(() => {
  store.getRoleListAsync();
});
</script>
