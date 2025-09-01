import request from "@/utils/request";

// 获取封号数据
export function getBlackPage(data) {
  return request({
    url: "/unUse/getSet",
    method: "post",
    data,
  });
}

//设置封号数据
export function setBlackPage(data) {
  return request({
    url: "/unUse/setopen/" + data,
    method: "post",
  });
}
