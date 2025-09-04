import request from "@/utils/request";

// 获取盘口列表数据
export function getTelegramGroupListPage(data) {
    return request({
        url: "/message/getTelegramGroupList?telegramGroupType="+data,
        method: "get",
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