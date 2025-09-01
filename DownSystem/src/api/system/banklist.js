import request from "@/utils/request";

// 获取银行列表数据
export function getBankPage(data) {
  return request({
    url: "/sysBank/getList",
    method: "post",
    data,
  });
}

//保存数据
export function setBankPage(data) {
  return request({
    url: "/sysBank/saveData",
    method: "post",
    data
  });
}
//删除数据
export function delBankPage(data) {
    return request({
      url: "/sysBank/del/" + data,
      method: "post",
    });
  }
