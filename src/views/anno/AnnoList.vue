<template>
  <div>
    <MyTitle title="公告列表" :back="true"></MyTitle>

    <SearchData :searchApi="store.getAnnoList">
      <template #default="{ form }">
        <a-select
          class="ml10"
          v-model:value="form.type"
          placeholder="请选择公告类型"
        >
          <a-select-option
            :value="l.value"
            v-for="(l, i) in AnnoTypes"
            :key="i"
          >
            {{ l.label }}
          </a-select-option>
        </a-select>
      </template>
    </SearchData>

    <a-modal
      v-model:visible="visible"
      title="公告详情"
      width="30%"
      :footer="null"
    >
      <a-card hoverable style="width: 100%">
        <template #cover v-if="AnnoOne.desc">
          <img alt="example" :src="AnnoOne.desc.replace(/public/, 'http://localhost:3000')" />
        </template>
        <a-card-meta :title="AnnoOne.title">
          <template #description>{{ AnnoOne.content }}</template>
        </a-card-meta>
        <div class="mt10">
          <a-card-meta
            :title="AnnoOne.author.username"
            :description="moment(AnnoOne.time).format('YYYY-MM-DD HH:mm')"
          >
            <template #avatar v-if="AnnoOne.author.avatar">
              <a-avatar
                :src="
                  AnnoOne.author.avatar.replace(
                    /public/,
                    'http://localhost:3000'
                  )
                "
              />
            </template>
          </a-card-meta>
        </div>
      </a-card>
    </a-modal>
    <a-row class="mt10">
      <a-col :span="22" :offset="1">
        <a-table
          :dataSource="annoListStore"
          :columns="columns"
          :pagination="{ pageSize: 7 }"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'index'">
              <span>{{ index + 1 }}</span>
            </template>
            <template v-if="column.key === 'action'">
              <template v-if="record.author?.username == userInfoStore.username">
                <a-popconfirm
                  title="你真的要删除吗???"
                  ok-text="确定"
                  cancel-text="不"
                  @confirm="deleteItem(record, index)"
                >
                  <a-button danger size="small" shape="circle" class="ml10">
                    <template #icon><DeleteOutlined /></template>
                  </a-button>
                </a-popconfirm>

                <a-button
                  @click="gotowhere('/anno/update/' + record._id)"
                  type="primary"
                  size="small"
                  shape="circle"
                  class="ml10"
                >
                  <template #icon><FormOutlined /></template>
                </a-button>
              </template>
              <a-button
                type="dafault"
                @click="seeMoreData(record)"
                size="small"
                shape="circle"
                class="ml10"
              >
                <template #icon><EyeOutlined /></template>
              </a-button>
            </template>
            <template v-if="column.key === 'time'">
              <a-tag color="#989898">
                {{ moment(record.time).format("YYYY-MM-DD HH:mm") }}
              </a-tag>
            </template>
            <template v-if="column.key === 'type'">
              <a-tag
                :color="
                  AnnoTypes.find((item) => item.value == record.type)?.color
                "
              >
                {{ AnnoTypes.find((item) => item.value == record.type)?.label }}
              </a-tag>
            </template>
            <template v-if="column.key === 'author'">
              <span>
                {{ record.author?.username }}
              </span>
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "../../store";
import { toRefs, onMounted, computed, ref } from "vue";
import moment from "moment";
import { AnnoTypes } from "../../utils";
import {
  SearchOutlined,
  DeleteOutlined,
  FormOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";
import { delannoone } from "../../api/anno";
import { useCommon } from "../../hooks/common/useCommon";
import SearchData from "../../components/SearchData.vue";
const store = useStore()
const annoListStore: any = computed(() => store.annoList) // Proxy
const userInfoStore: any = computed(() => store.userInfo) // Proxy
const visible = ref<Boolean>(false)
const AnnoOne = ref<any>({})

const { gotowhere } = useCommon();
const columns = [
  {
    title: "序号",
    key: "index",
    align: "center",
  },
  {
    title: "公告标题",
    dataIndex: "title",
    key: "title",
    align: "center",
  },
  {
    title: "公告类型",
    dataIndex: "type",
    key: "type",
    align: "center",
  },
  {
    title: "发布时间",
    dataIndex: "time",
    key: "time",
    align: "center",
  },
  {
    title: "发布人",
    key: "author",
    align: "center",
  },
  {
    title: "操作",
    key: "action",
    align: "center",
  },
];

// 查看详情
const seeMoreData = (record: any) => {
  visible.value = true;
  AnnoOne.value = record;
};

// 删除
const deleteItem = (item: any) => {
  delannoone({
    _id: item._id,
  }).then((res) => {
    if (res.data.code == 200) {
      store.getAnnoList()
      // const list: any = store.annoList.filter((v: any) => v._id != item._id);
      // store.changeAnnoList(list)
    }
  })
}
onMounted(() => {
  store.getAnnoList();
});
</script>
