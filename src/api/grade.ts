import request from "../utils/request";

export const addgradeone = (data?: any) =>
  request({
    url: "/api/addgradeone",
    method: "post",
    data,
  });

export const getmygrades = (data?: any) =>
  request({
    url: "/api/getmygrades",
    method: "post",
    data,
  });

export const getallgrades = (data?: any) =>
  request({
    url: "/api/getallgrades",
    method: "post",
    data,
  });

export const delgradeone = (data?: any) =>
  request({
    url: "/api/delgradeone",
    method: "post",
    data,
  });

export const getgradeone = (data?: any) =>
  request({
    url: "/api/getgradeone",
    method: "post",
    data
  })

export const setgradeone = (data?: any) =>
  request({
    url: "/api/setgradeone",
    method: "post",
    data
  })



