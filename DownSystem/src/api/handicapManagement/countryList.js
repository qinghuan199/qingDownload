import request from "@/utils/request";

// 获取国家列表数据
export function getCountryListPage(data) {
  return request({
         url: "/handicap/getCountry",
    method: "post",
    data,
  });
}

//新增国家
export function setCountryPage(data) {
  return request({
    url: "/handicap/saveCountry",
    method: "post",
    data
  });
}
//删除国家
export function delCountryPage(data) {
    return request({
      url: "/handicap/deleteCountry?countryId=" + data,
      method: "get",
    });
  }