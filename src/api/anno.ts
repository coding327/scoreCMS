import request from "../utils/request";

export const addanno = (data?: any) =>
  request({
    url: "/api/addtoanno",
    method: "post",
    data,
  });

export const getannos = (data?: any) =>
  request({
    url: "/api/getannos",
    method: "post",
    data,
  });

export const delannoone = (data?: any) =>
  request({
    url: "/api/delannoone",
    method: "post",
    data,
  });

export const changeannoone = (data?: any) =>
  request({
    url: "/api/changeannoone",
    method: "post",
    data,
  });
