import request from "../utils/request";

export const getroles = (data?: any) =>
  request({
    url: "/api/getroles",
    method: "post",
    data,
  });

