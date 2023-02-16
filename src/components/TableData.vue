<script lang="ts" setup>
import {
  SearchOutlined,
  DeleteOutlined,
  FormOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";
import { toRef } from "vue";
import { useStore } from "../store";
const store = useStore();
const userInfo: any = toRef(store, "userInfo");
const emits: any = defineEmits();
const props: any = defineProps({
  dataSource: [Array, Object],
  columns: [Array, Object],
  pagination: {
    type: Object,
    default: {
      pageSize: 5,
    },
  },
  role: {
    //  添加权限
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <a-row class="mt10">
    <a-col :span="22" :offset="1">
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :pagination="pagination"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            <span>{{ index + 1 }}</span>
          </template>
          <template v-if="column.key === 'action'">
            <!-- v-if="userInfo.role>record.role" -->
            <template v-if="userInfo.role > record.role || !role">
              <a-popconfirm
                title="你真的要删除吗???"
                ok-text="确定"
                cancel-text="不"
                @confirm="emits('deleteOne', record)"
              >
                <a-button danger size="small" shape="circle" class="ml10">
                  <template #icon><DeleteOutlined /></template>
                </a-button>
              </a-popconfirm>

              <a-button
                @click="emits('updateOne', record)"
                type="primary"
                size="small"
                shape="circle"
                class="ml10"
              >
                <template #icon><FormOutlined /></template>
              </a-button>
            </template>
          </template>
          <slot :record="record" :column="column"></slot>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>
