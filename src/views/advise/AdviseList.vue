<template>
  <div>
    <MyTitle title="意见列表"></MyTitle>
    <a-col :span="22" :offset="2" style="margin-top: 20px">
      <SearchData :searchApi="store.getAdviseListAsync">
        <template #default="{ form }">
          <a-col :span="4" :offset="1">
            <a-cascader
              v-model:value="form.type"
              :options="AdviseTypes"
              placeholder="请选择意见分类"
            />
          </a-col>
          <a-col :span="4" :offset="1">
            <a-range-picker v-model:value="form.date" />
          </a-col>
        </template>
      </SearchData>
    </a-col>

    <a-col :span="22" :offset="2">
      <a-list
        item-layout="vertical"
        size="large"
        :pagination="pagination"
        :data-source="adviseList"
      >
        <template #footer>
          <div>
            <b class="mr10">截止日期</b>
            <span> {{ moment().format("YYYY-MM-DD") }}</span>
          </div>
        </template>
        <template #renderItem="{ item }">
          <a-list-item key="item.title" class="aitem">
            <template #extra>
              <tempalte v-if="userInfo.username == item.author.username">
                <a-popconfirm
                  title="你真的要删除吗???"
                  ok-text="确定"
                  cancel-text="不"
                  @confirm="delItemOne(item)"
                >
                  <a class="mr10">删除</a>
                </a-popconfirm>

                <router-link style="margin-right: 14px" :to="'/layout/advise/update/' + item._id"
                  >编辑</router-link
                >
              </tempalte>

              <router-link :to="'/layout/advise/detail/' + item._id"
                >查看</router-link
              >
            </template>
            <template #actions>
              <div>
                <div class="info">
                  <div class="">
                    <a-avatar
                      v-if="item.author.avatar"
                      :src="
                        item.author.avatar.replace(
                          /public/,
                          'http://localhost:3000'
                        )
                      "
                    />
                    <a-avatar v-else>
                      <template #icon><UserOutlined /></template>
                    </a-avatar>
                  </div>
                  <h4 style="margin-right: 10px">{{ item.author.username }}</h4>
                  <a-tag :color="item.author.color">
                    {{ item.author.label }}</a-tag
                  >
                </div>

                <div class="mt10">
                  <a-tag color="#a256fe" v-for="(l, i) in item.type">
                    {{ l }}</a-tag
                  >
                </div>
              </div>
            </template>
            <a-list-item-meta :description="timeFormat(item.time)">
              <template #title>
                <router-link to="/"> {{ item.title }} </router-link>
              </template>
            </a-list-item-meta>
            <div v-html="item.content" class="content"></div>
          </a-list-item>
        </template>
      </a-list>
    </a-col>
  </div>
</template>

<script lang="ts" setup>
import { toRef, onMounted } from "vue";
import { useStore } from "../../store";
import SearchData from "../../components/SearchData.vue";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons-vue";
import { useCommon } from "../../hooks/common/useCommon";
import { deladviseone } from "@/api/advise";
import _ from "lodash";
import { AdviseTypes } from "../../utils";

const { timeFormat } = useCommon();
const store = useStore();
const adviseList: any = toRef(store, "adviseList");
const userInfo: any = toRef(store, "userInfo");
const pagination = {
  onChange: (page: number) => {
    console.log(page);
  },
  pageSize: 3,
};
onMounted(() => {
  store.getAdviseListAsync();
});

const delItemOne = (item: any) => {
  deladviseone({ _id: item._id }).then((res) => {
    if (res.data.code == 200) {
      // store.getAdviseListAsync();
      var list = _.filter(adviseList.value, (v: any) => v._id != item._id);
      store.setAdviseListSync(list);
    }
  });
};
</script>

<style lang="scss" scoped>
.aitem {
  border: 1px solid #dddddd;
  margin: 20px 0;
  width: 90%;
  .content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 100px;
    padding: 5px;
  }

  .info {
    display: flex;
    align-items: center;
    h4 {
      margin-left: 10px;
      margin-bottom: 0;
    }
  }
}
</style>
