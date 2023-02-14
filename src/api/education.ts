import request from "../utils/request";

export const subjectAdd = (data: any) =>
  request({
    url: "/api/subjectadd",
    method: "post",
    data,
  });

export const getAllSubject = (data?: any) =>
  request({
    url: "/api/getallsubject",
    method: "post",
    data,
  });

export const delSubject = (data?: any) =>
  request({
    url: "/api/delsubject",
    method: "post",
    data,
  });

export const changeSubject = (data?: any) =>
  request({
    url: "/api/changesubject",
    method: "post",
    data,
  });

export const addClass = (data?: any) =>
  request({
    url: "/api/addclass",
    method: "post",
    data,
  });

export const getClasses = (data?: any) =>
  request({
    url: "/api/getclasses",
    method: "post",
    data,
  });

export const delClasses = (data?: any) =>
  request({
    url: "/api/delclasses",
    method: "post",
    data,
  });

export const updateClass = (data?: any) =>
  request({
    url: "/api/updateclass",
    method: "post",
    data,
  });
