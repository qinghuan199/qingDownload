import protobuf from "protobufjs";
import { nanoid } from "nanoid";
import Cookies from "js-cookie";
import { useRoute } from "vue-router"; // 引入 useRoute
const route = useRoute();

const phoneStore = defineStore("phone", {
  state: () => ({
    // 必传的参数
    basePackType: {},
    // 动态参数，每次会根据页面加入不同参数
    dynamicParams: {},
    globalText: [], //获取全局文本
    checkStaus: {},
    // packType: {
    //   terminal: 1, //终端类型1为管理终端  必传
    //   packType: 5, //必传
    //   // userId: route.query.deviceId, //发给哪个终端
    //   // INIT: 3, // 初始化
    //   adminId: Cookies.get("UUID"), //必传
    //   reqId: nanoid(), //必传
    //   // int32Pack: 3, //1.全局事件，需传参
    //   // 返回按钮：1
    //   // 桌面按钮：2
    //   // 菜单按钮：3
    //   // 显示通知：4
    //   // 显示快捷设置：5
    //   // 屏幕锁屏：8
    //   // 屏幕截图：9
    //   // touchXY: ,//2.屏幕触摸，需传参
    //   // str_pack: "我是测试文本", //3.填入文本，需传参
    //   // strPack: 1234569, //4.唤醒屏幕，需传参  14789
    //   // input_password: "123456", //5.输入密码，需传参
    //   // str_pack:'',//6.点击文本，需传参
    //   // sms: "我是测试短信1627", //7.发送短信，需传参
    //   // scriptType.number,req_id :'',//8.运行脚本，需传参
    //   // LOGIN_ADMIN: 1, // 管理端登录
    //   // TOUCH: 2, // 触摸事件
    //   // ACCESSIBLE_GLOBAL: 3, // 无障碍全局动作
    //   // INPUT_TEXT: 4, // 填入文本
    //   // START_RECORD_SCREEN: 5, // 启动录屏
    //   // STOP_RECORD_SCREEN: 6, // 停止录屏
    //   // USER_TERMINAL_STATE: 7, // 上传用户端状态
    //   // OPERATIONAL_LOG: 8, // 上传操作日志
    //   // UNLOCK_SCREEN: 9, // 解锁屏幕
    //   // INPUT_PASSWORD: 10, // 输入密码
    //   // CLICK_TEXT: 11, // 点击文本
    //   // OPEN_BLACK_MASK: 12, // 开启黑屏遮罩
    //   // LAYOUT_READER: 13, // 布局数据
    //   // PING: 14, // Ping
    //   // PONG: 15, // Pong
    // },
    // packType: "",
  }),
  actions: {
    // 更新 basePackType 中的 packType 值
    // setPackType(packType) {
    //   this.basePackType.packType = packType;
    // },
    // 用于更新动态参数
    setDynamicParams(params) {
      this.dynamicParams = { ...params };
    },
    // 返回完整的参数对象
    getPackTypeWithParams() {
      return {
        ...this.basePackType,
        ...this.dynamicParams,
      };
    },
    // 重置动态参数
    resetDynamicParams() {
      this.dynamicParams = {};
    },
    // 更新 reqId，每次请求时生成新值
    // updateReqId() {
    //   this.basePackType.reqId = nanoid();
    // },
    setGlobalText(params) {
      console.log("全局文本", params);

      this.globalText.unshift(params);
    },
    setCheckStaus(params) {
      this.checkStaus = { ...params };
    },
  },
  getters: {
    getDynamicParams: (state) => state.dynamicParams,
    getGlobalText: (state) => state.globalText,
    getCheckStaus: (state) => state.checkStaus,
  },
});

export default phoneStore;
