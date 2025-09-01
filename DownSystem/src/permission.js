import router from "./router";
import { ElMessage } from "element-plus";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import { isHttp } from "@/utils/validate";
import { isRelogin } from "@/utils/request";
import useUserStore from "@/store/modules/user";
import useSettingsStore from "@/store/modules/settings";
import usePermissionStore from "@/store/modules/permission";

NProgress.configure({ showSpinner: false });

const whiteList = ["/timihikivv","/hiadkhsakj","/404",];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    to.meta.title && useSettingsStore().setTitle(to.meta.title);
    /* has token*/
    // 登录login替换 (to.path === "/login")
    if (to.path === "/timihikivv") {
      next({ path: "/user1/userConfig" });
      NProgress.done();
    } else if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (useUserStore().roles.length === 0) {
        isRelogin.show = true;
        // 判断当前用户是否已拉取完user_info信息
        useUserStore().getInfo().then(() => {

        if (getToken()) {
          isRelogin.show = false;
          usePermissionStore()
            .generateRoutes()
            .then((accessRoutes) => {
              console.log("判断当前用户是否已拉取完user_info信息");

              // 根据roles权限生成可访问的路由表
              accessRoutes.forEach((route) => {
                if (!isHttp(route.path)) {
                  router.addRoute(route); // 动态添加可访问路由表
                }
              });
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
            });
        }
        }).catch(err => {
          useUserStore().logOut().then(() => {
            ElMessage.error(err)
            next({ path: '/' })
          })
        })
      } else {
        next();
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      const roleCode = ''; // 动态参数，假设为 'user'
      next(`/404`) // 否则全部重定向到登录页
      // next(`/timihikivv?redirect=${to.fullPath}`); // 否则全部重定向到登录页
      // next(`/login?redirect=${to.fullPath}&roleCode=${roleCode}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
