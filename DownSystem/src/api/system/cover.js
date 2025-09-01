import request from "@/utils/request";

// 获取遮盖配置数据
export function getCoverPage(data) {
  return request({
    url: "/cover/getList",
    method: "post",
    data,
  });
}

//新增和修改遮盖数据  修改传id
export function setCoverPage(data) {
  return request({
    url: "/cover/saveData",
    method: "post",
    data
  });
}


// 删除遮盖数据
export function delCoverPage(data) {
  return request({
    url: "/cover/del/" + data,
    method: "post",
    // params:data
  });
}

// 上传遮盖文件
export function uploadFile() {
  return request({
    url: "/sysPage/uploadFile?folderName=image",
    method: "post",
  });
}
