import request from "@/utils/request";

// 获取落地页配置数据
export function getFallDownPage(data) {
  return request({
    url: "/sysPage/getList",
    method: "post",
    data,
  });
}

//保存落地页数据
export function setFallDownPage(data) {
  return request({
    url: "/sysPage/saveData",
    method: "post",
    data: data,
  });
}

// 修改落地页数据
export function upFallDownPage(data) {
  return request({
    url: "/sysPage/user",
    method: "post",
    data,
  });
}

// 删除落地页数据
export function delFallDownPage(data) {
  return request({
    url: "/sysPage/del/" + data,
    method: "post",
    // params:data
  });
}

