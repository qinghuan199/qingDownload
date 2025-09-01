import { createWebHistory, createRouter } from "vue-router";
/* Layout */
import Layout from "@/layout";

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  // {
  //   path: "/redirect",
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: "/redirect/:path(.*)",
  //       component: () => import("@/views/redirect/index.vue"),
  //     },
  //   ],
  // },
  // {
  //   path: "/userInfo",
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: "/userInfo/operate",
  //       component: () => import("@/views/userInfo/operate.vue"),
  //     },
  //   ],
  // },
  {
    path: "/timihikivv",
    component: () => import("@/views/timihikivv"),
    hidden: true,
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true,
  },
  {
    path: "/rootLogin",
    component: () => import("@/views/rootLogin"),
    hidden: true,
  },
  {
    path: "/hiadkhsakj",
    component: () => import("@/views/hiadkhsakj"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register"),
    hidden: true,
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error/401"),
    hidden: true,
  },
  {
    path: "",
    component: Layout,
    redirect: "/user1/userConfig",
    children: [
      {
        path: "/index",
        component: () => import("@/views/user1/userConfig"),
        name: "首页",
        hidden: true
        // meta: { title:  '首页', icon: "dashboard", affix: true },
      },
    ],
  },
  // {
  //   path: "/user",
  //   component: Layout,
  //   hidden: true,
  //   redirect: "noredirect",
  //   children: [
  //     {
  //       path: "profile",
  //       component: () => import("@/views/system/user/profile/index"),
  //       name: "Profile",
  //       meta: { title: "个人中心", icon: "user" },
  //     },
  //   ],
  // },
  {
    path: "/deviceControl",
    component: Layout,
    hidden: true,
    redirect: "noredirect",
    children: [
      {
        path: "deviceControl/:id",
        component: () => import("@/views/deviceControl/index"),
        name: "deviceControl",
        meta: { title: "设备操作", icon: "user" },
      },
    ],
  },
  {
    path: "/operate",
    component: Layout,
    hidden: true,
    redirect: "noredirect",
    children: [
      {
        path: "operate",
        component: () => import("@/views/userInfo/operate"),
        name: "operate",
        meta: { title: "操作面板", icon: "user", breadcrumb: true },
      },
    ],
  },
  {
    path: "/userInfo",
    component: Layout,
    hidden: true,
    redirect: "noredirect",
    children: [
      {
        path: "whiteListDate",
        component: () => import("@/views/userInfo/whiteListDate"),
        name: "whiteListDate",
        meta: { title: "白名单列表", icon: "user" },
      },
    ],
  },
  {
    path: "/remoteSystem",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "translate",
        component: () => import("@/views/remoteSystem/translate"),
        name: "translate",
        meta: { title: "翻译", icon: "user" },
      },
    ],
  },
  {
    path: "/downloadManagement",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "translate",
        component: () => import("@/views/downloadManagement/downloadDetail"),
        name: "translate",
        meta: { title: "下载统计", icon: "user" },
      },
    ],
  },
   {
    path: "/handicapManagement",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "countryList",
        component: () => import("@/views/handicapManagement/countryList"),
        name: "countryList",
        meta: { title: "国家列表", icon: "user" },

      },
    ],
  },
     {
    path: "/handicapManagement",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "handList",
        component: () => import("@/views/handicapManagement/handList"),
        name: "handList",
        meta: { title: "盘口列表", icon: "user" },

      },
    ],
  },
    {
    path: "/downloadManagement",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "employeeList",
        component: () => import("@/views/downloadManagement/employeeList"),
        name: "employeeList",
        meta: { title: "统计员工列表", icon: "user" },

      },
    ],
  },
  {
    path: "/remoteSystem",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "slectTranslate",
        component: () => import("@/views/remoteSystem/slectTranslate"),
        name: "slectTranslate",
        meta: { title: "适配翻译", icon: "user" },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    hidden: true,
    redirect: "noredirect",
    children: [
      {
        path: "profile",
        component: () => import("@/views/system/user/profile/index"),
        name: "Profile",
        meta: { title: "个人中心", icon: "user" },
      },
    ],
  },
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: "/system/user-auth",
    component: Layout,
    hidden: true,
    permissions: ["system:user:edit"],
    children: [
      {
        path: "role/:userId(\\d+)",
        component: () => import("@/views/system/user/authRole"),
        name: "AuthRole",
        meta: { title: "分配角色", activeMenu: "/system/user" },
      },
    ],
  },
  {
    path: "/system/role-auth",
    component: Layout,
    hidden: true,
    permissions: ["system:role:edit"],
    children: [
      {
        path: "user/:roleId(\\d+)",
        component: () => import("@/views/system/role/authUser"),
        name: "AuthUser",
        meta: { title: "分配用户", activeMenu: "/system/role" },
      },
    ],
  },
  {
    path: "/system/dict-data",
    component: Layout,
    hidden: true,
    permissions: ["system:dict:list"],
    children: [
      {
        path: "index/:dictId(\\d+)",
        component: () => import("@/views/system/dict/data"),
        name: "Data",
        meta: { title: "字典数据", activeMenu: "/system/dict" },
      },
    ],
  },
  {
    path: "/monitor/job-log",
    component: Layout,
    hidden: true,
    permissions: ["monitor:job:list"],
    children: [
      {
        path: "index/:jobId(\\d+)",
        component: () => import("@/views/monitor/job/log"),
        name: "JobLog",
        meta: { title: "调度日志", activeMenu: "/monitor/job" },
      },
    ],
  },
  {
    path: "/tool/gen-edit",
    component: Layout,
    hidden: true,
    permissions: ["tool:gen:edit"],
    children: [
      {
        path: "index/:tableId(\\d+)",
        component: () => import("@/views/tool/gen/editTable"),
        name: "GenEdit",
        meta: { title: "修改生成配置", activeMenu: "/tool/gen" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
// 使用全局路由守卫 beforeEach
// router.beforeEach((to, from, next) => {
//   if (to.name == "index" || to.name == "/") {
//     // 如果即将进入的路由是名为 'index' 的路由
//     // 则重定向到 '/operate'
//     // nextTick(() => {
//       next({ path: "/404" });
//       // next({ path: "/user1/userConfig" });
//     // });
//   } else {
//     // 否则，继续正常的路由导航
//     next();
//   }
// });




export default router;
