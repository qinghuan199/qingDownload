import request from "@/utils/request";

// 获取白名单用户数据
export function getWhiteListDatePage(params,data) {
  return request({
    url: `/whiteGroup/getGroupUser/${params}`,
    method: "post",
    data,
  });
}

//保存白名单用户数据
export function setWhiteListDatePage(data) {
  return request({
    url: "/whiteGroup/saveGroupUser",
    method: "post",
    data,
  });
}

//删除白名单用户数据
export function delWhiteListDatePage(data) {
  return request({
    url: "/whiteGroup/delGroupUser/" + data,
    method: "post",
  });
}

//编辑白名单用户跟进状态数据
export function updateTraceStatusPage(params,status, data) {
  return request({
    url: "/whiteGroup/updateTraceStatus/" + params + "/" + status,
    method: "post",
    data,
  });
}
