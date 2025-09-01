import request from "@/utils/request";

// 获取盘口列表数据
export function getHandListPage(data) {
    return request({
        url: "/handicap/getHandicapList",
        method: "post",
        data,
    });
}

// 获取盘口详情数据
export function getHandIdPage(id) {
    return request({
      url: "/handicap/getHandicapById?handicapId="+id,
      method: "get",
    });
  }
//新增盘口
export function setHandPage(data) {
    return request({
        url: "/handicap/saveHandicap",
        method: "post",
        data
    });
}
//删除盘口
export function delHandPage(data) {
    return request({
        url: "/handicap/deleteHandicapById?handicapId=" + data,
        method: "get",
    });
}


