import request from "@/utils/request";

// 获取盘口列表数据
export function getHandListPage(data) {
    return request({
        url: "/handicap/getHandicapList",
        method: "post",
        data,
    });
}

// 发送群组消息
export function setGroupMessagePage(data) {
    return request({
        url: "/message/TelegramMessageRequest",
        method: "post",
        data,
    });
}