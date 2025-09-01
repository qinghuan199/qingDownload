import request from "@/utils/request";

// 获取app列表数据
export function getAppPage(data) {
  return request({
    url: "/adviceUpdate/getList",
    method: "post",
    data,
  });
}

//保存数据
export function setAppPage(data) {
  return request({
    url: "/adviceUpdate/saveData",
    method: "post",
    data
  });
}
//删除数据
export function delAppPage(data) {
    return request({
      url: "/adviceUpdate/del/" + data,
      method: "post",
    });
  }
