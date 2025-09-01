import request from "@/utils/request";

// 获取声网数据
export function getSoundPage(data) {
  return request({
    url: "/voiceSet/getSet",
    method: "post",
    data,
  });
}

//保存声网数据
export function setSoundPage(data) {
  return request({
    url: "/voiceSet/save",
    method: "post",
    data: data,
  });
}




