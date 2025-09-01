import request from "@/utils/request";

// 终端在线列表
export function getOnlineDevicePage(data) {
  return request({
    url: "/OnlineDevice/search",
    method: "post",
    data,
  });
}

// 检验终端是否
export function checkControlDevice(data) {
  return request({
    url: `/OnlineDevice/checkControlDevice/${data.deviceId}`,
    method: "post",
  });
}
