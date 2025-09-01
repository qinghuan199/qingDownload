import request from "@/utils/request";

// 获取翻译列表数据
export function getTranslatePage(data) {
  return request({
    url: "/translate/list",
    method: "post",
    data,
  });
}

//新增翻译列表数据
export function setTranslatePage(data) {
  return request({
    url: "/translate/save",
    method: "post",
    data
  });
}
//删除数据
export function delTranslatePage(data) {
    return request({
      url: "/translate/del/" + data,
      method: "post",
    });
  }
