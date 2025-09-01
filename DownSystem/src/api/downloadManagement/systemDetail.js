import request from "@/utils/request";

// 获取文件列表数据
export function getPersonPage(data) {
  return request({
    url: "/statistics/downloadUrlCount",
    method: "post",
    data,
  });
}
// 获取文件详情数据
// export function getPersonIdPage(id) {
//     return request({
//       url: "/file/getFileById?id="+id,
//       method: "get",
//     });
//   }
  export function getPersonIdPage(data) {
    return request({
      url: "/statistics/downloadUrlCount",
      method: "post",
      data,
    });
  }
  // 生成文件下载链接
export function getDownIdPage(id) {
    return request({
      url: "/file/generatorFileDownloadUrl?fileId="+id,
      method: "get",
    });
  }
// 获取下载链接列表数据
export function getFileDownloadUrlListPage(data) {
    return request({
      url: "/file/getFileDownloadUrlList",
      method: "post",
      data,
    });
  }

  // 下载
export function downloadFile(secretKey) {
    return request({
      url: `/downloadFile/${secretKey}`,
      method: "get",
    });
  }


//新增文件
export function setPersonPage(data) {
  return request({
    url: "/file/saveFile",
    method: "post",
    data
  });
}
//删除文件
export function delPersonPage(data) {
    return request({
      url: "/userM/del/" + data,
      method: "post",
    });
  }
// 获取系统角色
export function getRolePage(data) {
    return request({
      url: "/userM/roleList",
      method: "post",
      data,
    });
  }

 //修改文件信息
export function editPersonPage(data) {
  return request({
    url: "/file/saveFile",
    method: "post",
    data
  });
}

 //修改用户状态
 export function updateStatusPage(data) {
  return request({
    url: "/user/modifyUserStatus",
    method: "post",
    data
  });
}