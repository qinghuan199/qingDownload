import request from "@/utils/request";

// 获取白名单组数据
export function getWhitePage(data) {
  return request({
    url: "/whiteGroup/search",
    method: "post",
    data,
  });
}

//保存数据
export function setWhitePage(data) {
  return request({
    url: "/whiteGroup/save  ",
    method: "post",
    data
  });
}
//删除数据
export function delWhitePage(data) {
    return request({
      url: "/whiteGroup/del/" + data,
      method: "post",
    });
  }

  //上传文件
export function importWhiteListDatePage(params,data) {
  return request({
    url: `/whiteGroup/import/${params}`,
    method: "post",
    data,
  });
}

