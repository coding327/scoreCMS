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
