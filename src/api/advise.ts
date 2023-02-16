import request from "../utils/request";

export const addadviseone = (data?: any) =>
  request({
    url: "/api/addadviseone",
    method: "post",
    data,
  });

export const deladviseone = (data?: any) =>
  request({
    url: "/api/deladviseone",
    method: "post",
    data,
  });

export const getadviselist = (data?: any) =>
  request({
    url: "/api/getadviselist",
    method: "post",
    data,
  });

export const setadviseone = (data?: any) =>
  request({
    url: "/api/setadviseone",
    method: "post",
    data,
  });

export const getadviseone = (data?: any) =>
  request({
    url: "/api/getadviseone",
    method: "post",
    data,
  });
