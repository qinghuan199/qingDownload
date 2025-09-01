import request from "@/utils/request";

// 获取监控日志数据
export function getMonitoringLogPage(data) {
  return request({
    url: "/deviceLog/search",
    method: "post",
    data,
  });
}