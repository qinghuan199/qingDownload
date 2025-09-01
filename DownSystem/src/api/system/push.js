import request from "@/utils/request";

// 获取推送数据
export function getPushPage(data) {
  return request({
    url: "/pushSet/getSet",
    method: "post",
    data,
  });
}

//保存推送数据
export function setPushPage(data) {
  return request({
    url: "/pushSet/save",
    method: "post",
    data: data,
  });
}

// 上传落地页文件
export function uploadFile() {
  return request({
    url: "/sysPage/uploadFile?folderName=image",
    method: "post",
  });
}




