import request from "../utils/request";

export const getroles = (data?: any) =>
  request({
    url: "/api/getroles",
    method: "post",
    data,
  });

export const addroleone = (data?: any) =>
  request({
    url: "/api/addroleone",
    method: "post",
    data,
  });

export const delroleone = (data?: any) =>
  request({
    url: "/api/delroleone",
    method: "post",
    data,
  });

export const setroleone = (data?: any) =>
  request({
    url: "/api/setroleone",
    method: "post",
    data,
  });
