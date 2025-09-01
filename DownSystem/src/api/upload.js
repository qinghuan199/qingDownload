import request from "@/utils/request";

// 获取路由
export const uploadFile = () => {
  return request({
    url: "/file/uploadFile",
    method: "POST",
  });
};
