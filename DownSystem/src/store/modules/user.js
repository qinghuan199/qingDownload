import { login, logout, getInfo, rootLogin } from "@/api/login";
import {
  getToken,
  setToken,
  removeToken,
  setUserId,
  removeUserId,
} from "@/utils/auth";
import defAva from "@/assets/images/profile.jpg";

const useUserStore = defineStore("user", {
  state: () => ({
    token: getToken(),
    id: "",
    name: "",
    avatar: "",
    roles: [],
    permissions: [],
  }),
  actions: {
    // 登录
    login(userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      const verifyCode = userInfo.verifyCode;
      // const code = userInfo.code;
      // const uuid = userInfo.uuid;
      console.log("登陆方法");

      return new Promise((resolve, reject) => {
        login(username, password, verifyCode)
          .then((res) => {
            console.log("登陆", res);
            setToken(res.data.token);
            setUserId(res.data.userId);

            this.token = res.data.token;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 超级管理员登录
    rootLogin(userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      const verifyCode = userInfo.verifyCode;
      // const code = userInfo.code;
      // const uuid = userInfo.uuid;
      console.log("登陆方法");

      return new Promise((resolve, reject) => {
        rootLogin(username, password,verifyCode)
          .then((res) => {
            console.log("登陆", res);
            setToken(res.data.token);
            setUserId(res.data.userId);

            this.token = res.data.token;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.user;
            const avatar =
              user.avatar == "" || user.avatar == null
                ? defAva
                : import.meta.env.VITE_APP_BASE_API + user.avatar;

            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.roles;
              this.permissions = res.permissions;
            } else {
              this.roles = ["ROLE_DEFAULT"];
            }
            this.id = user.userId;
            this.name = user.userName;
            this.avatar = avatar;
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = "";
            this.roles = [];
            this.permissions = [];
            removeToken();
            removeUserId();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

export default useUserStore;
