import request from "../utils/request";

export const addgradeone = (data?: any) =>
  request({
    url: "/api/addgradeone",
    method: "post",
    data,
  });



