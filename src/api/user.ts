import request from "../utils/request";

export const adduser = (data?: any) =>
  request({
    url: "/api/adduser",
    method: "post",
    data,
  });

export const getusers = (data?: any) =>
  request({
    url: "/api/getusers",
    method: "post",
    data,
  });

export const deluserone = (data?: any) =>
  request({
    url: "/api/deluserone",
    method: "post",
    data,
  });

export const setuserone = (data?: any) =>
  request({
    url: "/api/setuserone",
    method: "post",
    data,
  });
