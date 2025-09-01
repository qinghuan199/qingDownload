import request from "@/utils/request";

// 获取oss数据
export function getOssPage(data) {
  return request({
    url: "/oss/search",
    method: "post",
    data,
  });
}

//保存oss数据
export function setOssPage(data) {
  return request({
    url: "/oss/saveData",
    method: "post",
    data: data,
  });
}

// 删除oss数据
export function delOssPage(data) {
  return request({
    url: "/oss/del/" + data,
    method: "post",
    // params:data
  });
}


