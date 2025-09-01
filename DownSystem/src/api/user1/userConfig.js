import request from "@/utils/request";

// 获取用户信息
export function getUserDetail(data) {
  return request({
    url: "/userDetail/getUserDetail",
    method: "post",
    data,
  });
}

//保存个人数据
export function editDetail(data) {
  return request({
    url: "/userDetail/editDetail",
    method: "post",
    data
  });
}
//保存line address数据
export function saveLineAddress(data) {
    return request({
      url: "/userDetail/saveLineAddress",
      method: "post",
      data
    });
  }
