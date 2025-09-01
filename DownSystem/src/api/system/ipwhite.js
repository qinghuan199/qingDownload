import request from "@/utils/request";

// 获取白名单列表数据
export function getIpWhitePage(data) {
    return request({
      url: "/sysIp/search",
      method: "post",
      data,
    });
  }
  
  //保存白名单数据
  export function setIpWhitePage(data) {
    return request({
      url: "/sysIp/save",
      method: "post",
      data
    });
  }
  //删除白名单数据
  export function delIpWhitePage(data) {
      return request({
        url: "/sysIp/del/" + data,
        method: "post",
      });
    }
  

// 获取ip限制数据
export function getIpWhiteStatus(data) {
  return request({
    url: "/sysIp/getIpStatus",
    method: "post",
    data,
  });
}

//设置白名单是否开启
export function setIpWhiteStatus(data) {
  return request({
    url: "/sysIp/setOpen/" + data,
    method: "post",
  });
}
