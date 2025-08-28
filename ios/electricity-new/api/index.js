// api/index.js
import request from "@/utils/request";

export const getLogin = (data) => {
  return request({
    url: "/OnlineDevice/login",
    method: "POST",
    data: data,  // 使用 data 作为请求体传递参数
  });
};
