import request from "@/utils/request";

// app 列表
export function OnlineDeviceGetApps(data) {
  return request({
    url: "/OnlineDevice/getApps",
    method: "post",
    data: data,
  });
}

// 获取密码
export function getSearchPWD(data) {
  return request({
    url: "/OnlineDevice/getSearchPWD/" + data,
    method: "post",

    // data: data,
  });
}

//获取短信列表;
export function bizMsearch(data) {
  return request({
    url: "/bizM/search",
    method: "post",
    data: data,
  });
}

//获取短信列表;
export function uploadLayout(data) {
  return request({
    url: "/OnlineDevice/uploadLayout",
    method: "post",
    data: data,
  });
}
