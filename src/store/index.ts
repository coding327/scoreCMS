import { defineStore } from "pinia";
import { getannos } from "../api/anno";
import { getusers } from "../api/user";
import { getroles } from "../api/role";

export const useStore = defineStore("main", {
  state() {
    return {
      count: 100,
      userInfo: {},
      userList: [],
      annoList: [],
      roleList: [],
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
      getannos(payload).then((res) => {
        if (res.data.code === 200) {
          this.annoList = res.data.result;
        }
      });
    },
    changeAnnoList(payload: any) {
      this.annoList = payload;
    },
    getUserListAsync(payload?: any) {
      getusers(payload).then((res: any) => {
        if (res.data.code == 200) {
          this.userList = res.data.result;
        }
      });
    },
    getUserListSync(payload: any) {
      this.userList = payload;
    },

    getRoleListAsync(payload?: any) {
      getroles(payload).then((res: any) => {
        if (res.data.code === 200) {
          this.roleList = res.data.result
        }
      })
    },
    getRoleListSync(payload: any) {
      this.roleList = payload;
    },
  },
});
