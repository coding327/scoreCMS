import { defineStore } from "pinia";
import { getannos } from "../api/anno";

export const useStore = defineStore("main", {
  state() {
    return {
      count: 100,
      userInfo: {},
      annoList: [],
    };
  },
  getters: {
    newCount: (state) => {
      return state.count * 2;
    },
  },
  actions: {
    // 修改数据
    getAsyncData(payload: any) {
      this.userInfo = { ...payload.userInfo, ...payload.role };
    },
    clearUserInfo() {
      this.userInfo = {};
    },
    changeUserInfo(payload: any) {
      this.userInfo = payload;
    },
    getAnnoList(payload?: any) {
      getannos(payload).then(res => {
        if (res.data.code === 200) {
          this.annoList = res.data.result;
        }
      })
    },
    changeAnnoList(payload: any) {
      this.annoList = payload;
    },
  },
});
