
import { defineStore } from 'pinia'


export const useStore = defineStore('main', {
  state() {
    return {
      count: 100,
      userInfo: {}
    }
  },
  getters: {
    newCount: state => {
      return state.count * 2
    }
  },
  actions: { // 修改数据
    getAsyncData(payload:any){
        this.userInfo = {...payload.userInfo , ...payload.role}
    },
    clearUserInfo(){
        this.userInfo = {}
    },
    changeUserInfo(payload:any){
        this.userInfo = payload;
    },
  }
})