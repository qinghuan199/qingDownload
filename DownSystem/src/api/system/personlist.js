import request from "@/utils/request";

// 获取人员列表数据
export function getPersonPage(data) {
  return request({
    url: "/user/getUserList",
    method: "post",
    data,
  });
}

// 获取业务员登录密码
export function getVerifyCodePage(id) {
  return request({
    url: "/user/generateVerifyCode?userId="+id,
    method: "get",
  });
}

//新增人员
export function setPersonPage(data) {
  return request({
    url: "/user/saveUser",
    method: "post",
    data
  });
}
//删除人员
export function delPersonPage(data) {
    return request({
      url: "/userM/del/" + data,
      method: "post",
    });
  }
// 获取系统角色
export function getRolePage(data) {
    return request({
      url: "/userM/roleList",
      method: "post",
      data,
    });
  }

 //修改人员信息
export function editPersonPage(data) {
  return request({
    url: "/user/saveUser",
    method: "post",
    data
  });
}

 //修改用户状态
 export function updateStatusPage(data) {
  return request({
    url: "/user/modifyUserStatus",
    method: "post",
    data
  });
}