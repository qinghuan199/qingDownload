import request from "@/utils/request";

// 获取统计员工列表数据
export function getEmployeeListPage(data) {
  return request({
    url: "/statistics/userDownloadUrlCount",
    method: "post",
    data,
  });
}

