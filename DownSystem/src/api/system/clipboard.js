import request from "@/utils/request";

// 查询剪贴板规则列表
export function listClipboard(query) {
  return request({
    url: "/system/clipboard/list",
    method: "get",
    params: query,
  });
}

// 查询剪贴板规则详细
export function getClipboard(id) {
  return request({
    url: "/system/clipboard/" + id,
    method: "get",
  });
}

// 新增剪贴板规则
export function addClipboard(data) {
  return request({
    url: "/system/clipboard",
    method: "post",
    data: data,
  });
}

// 修改剪贴板规则
export function updateClipboard(data) {
  return request({
    url: "/system/clipboard",
    method: "put",
    data: data,
  });
}

// 删除剪贴板规则
export function delClipboard(id) {
  return request({
    url: "/system/clipboard/" + id,
    method: "delete",
  });
}
