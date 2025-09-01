import request from "@/utils/request";

// 获取google数据
export function getGooglePage(data) {
  return request({
    url: "/google/search",
    method: "post",
    data,
  });
}

//保存google数据
export function setGooglePage(data) {
  return request({
    url: "/google/saveData",
    method: "post",
    data: data,
  });
}

// 删除google数据
export function delGooglePage(data) {
  return request({
    url: "/google/del/" + data,
    method: "post",
    // params:data
  });
}


