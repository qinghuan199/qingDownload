import { Menus } from "@/types/menu";

export const menuData: Menus[] = [
  {
    id: "0",
    title: "首页",
    index: "/index",
    icon: "Odometer",
    children: [
      {
        id: "6",
        pid: "0",
        index: "/index/dashboard",
        icon: "Odometer",
        title: "统计",
      },
      {
        id: "7",
        pid: "0",
        index: "/index/user",
        title: "授权统计",
      },
      {
        id: "8",
        pid: "0",
        index: "/index/equipment",
        title: "设备监控",
      },
      {
        id: "9",
        pid: "0",
        index: "/system-menu",
        icon: "HomeFilled",
        title: "业务统计",
      },
    ],
  },

  {
    id: "1",
    title: "个人中心",
    index: "1",
    icon: "HomeFilled",
    children: [
      {
        id: "10",
        pid: "1",
        index: "/user/userConfig",
        title: "个人配置",
      },
      {
        id: "11",
        pid: "1",
        index: "/system-user",
        title: "用户管理",
      },
      {
        id: "12",
        pid: "1",
        index: "/system-role",
        title: "角色管理",
      },
      {
        id: "13",
        pid: "1",
        index: "/system-menu",
        title: "菜单管理",
      },
    ],
  },
  {
    id: "12",
    title: "用户中心",
    index: "14",
    icon: "HomeFilled",
    children: [
      {
        id: "14",
        pid: "12",
        index: "/userInfo/operate",
        title: "操作端",
      },
      {
        id: "15",
        pid: "12",
        index: "/whiteList",
        title: "白名单组",
      },
      {
        id: "16",
        pid: "12",
        index: "/webrtc",
        title: "webrtc推流",
      },
    ],
  },

  {
    id: "13",
    title: "银行管理",
    index: "17",
    icon: "HomeFilled",
    children: [
      {
        id: "17",
        pid: "13",
        index: "/bankList",
        title: "银行列表",
      },
    ],
  },

  {
    id: "12",
    title: "apk管理",
    index: "/",
    icon: "Odometer",
    children: [
      {
        id: "12",
        pid: "1",
        index: "/apkList",
        title: "apk列表",
      },
      {
        id: "12",
        pid: "1",
        index: "/system-role",
        title: "角色管理",
      },
    ],
  },
  {
    id: "13",
    title: "系统",
    index: "/",
    icon: "Odometer",
    children: [
      {
        id: "14",
        pid: "13",
        index: "/personList",
        title: "人员列表",
      },
      {
        id: "15",
        pid: "13",
        index: "/",
        title: "监控日志",
        children: [
          {
            id: "1",
            pid: "13",
            index: "/monitoringLogs",
            title: "操作日志",
          },
          {
            id: "1",
            pid: "13",
            index: "/config",
            title: "配置项",
          },
        ],
      },
    ],
  },

  // {
  //   id: "3",
  //   title: "组件",
  //   index: "3-1",
  //   icon: "Calendar",
  //   children: [
  //     {
  //       id: "21",
  //       pid: "3",
  //       index: "/form",
  //       title: "表单",
  //     },
  //     {
  //       id: "22",
  //       pid: "3",
  //       index: "/upload",
  //       title: "上传",
  //     },
  //     {
  //       id: "23",
  //       pid: "2",
  //       index: "/carousel",
  //       title: "走马灯",
  //     },
  //     {
  //       id: "24",
  //       pid: "2",
  //       index: "/calendar",
  //       title: "日历",
  //     },
  //     {
  //       id: "25",
  //       pid: "2",
  //       index: "/watermark",
  //       title: "水印",
  //     },
  //     {
  //       id: "26",
  //       pid: "2",
  //       index: "/tour",
  //       title: "分布引导",
  //     },
  //     {
  //       id: "27",
  //       pid: "2",
  //       index: "/steps",
  //       title: "步骤条",
  //     },
  //     {
  //       id: "28",
  //       pid: "2",
  //       index: "/statistic",
  //       title: "统计",
  //     },
  //     {
  //       id: "29",
  //       pid: "3",
  //       index: "29",
  //       title: "三级菜单",
  //       children: [
  //         {
  //           id: "291",
  //           pid: "29",
  //           index: "/editor",
  //           title: "富文本编辑器",
  //         },
  //         {
  //           id: "292",
  //           pid: "29",
  //           index: "/markdown",
  //           title: "markdown编辑器",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: "4",
  //   title: "表格",
  //   index: "3",
  //   icon: "Calendar",
  //   children: [
  //     {
  //       id: "31",
  //       pid: "3",
  //       index: "/table",
  //       title: "基础表格",
  //     },
  //     {
  //       id: "32",
  //       pid: "3",
  //       index: "/table-editor",
  //       title: "可编辑表格",
  //     },
  //     {
  //       id: "33",
  //       pid: "3",
  //       index: "/import",
  //       title: "导入Excel",
  //     },
  //     {
  //       id: "34",
  //       pid: "3",
  //       index: "/export",
  //       title: "导出Excel",
  //     },
  //   ],
  // },
  // {
  //   id: "5",
  //   icon: "PieChart",
  //   index: "4",
  //   title: "图表",
  //   children: [
  //     {
  //       id: "41",
  //       pid: "4",
  //       index: "/schart",
  //       title: "schart图表",
  //     },
  //     {
  //       id: "42",
  //       pid: "4",
  //       index: "/echarts",
  //       title: "echarts图表",
  //     },
  //   ],
  // },
  // {
  //   id: "6",
  //   icon: "Guide",
  //   index: "/icon",
  //   title: "图标",
  //   permiss: "5",
  // },
  // {
  //   id: "7",
  //   icon: "Brush",
  //   index: "/theme",
  //   title: "主题",
  // },
  {
    id: "6",
    icon: "DocumentAdd",
    index: "6",
    title: "附加页面",
    children: [
      {
        id: "61",
        pid: "6",
        index: "/ucenter",
        title: "个人中心",
      },
      {
        id: "62",
        pid: "6",
        index: "/login",
        title: "登录",
      },
      {
        id: "63",
        pid: "6",
        index: "/register",
        title: "注册",
      },
      {
        id: "64",
        pid: "6",
        index: "/reset-pwd",
        title: "重设密码",
      },
      {
        id: "65",
        pid: "6",
        index: "/403",
        title: "403",
      },
      {
        id: "66",
        pid: "6",
        index: "/404",
        title: "404",
      },
      {
        id: "67",
        pid: "6",
        index: "/whiteListDate",
        title: "白名单列表",
      },
    ],
  },
];
