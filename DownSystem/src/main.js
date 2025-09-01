import { createApp } from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import Cookies from "js-cookie";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { useLanguageStore } from "./store/modules/language";
import i18n from "./i18n";
import { fetchTranslation } from "./utils/i18n";

import "@/assets/styles/index.scss"; // global css

import directive from "./directive"; // directive

// 注册指令
import plugins from "./plugins"; // plugins
import { download } from "@/utils/request";

// svg图标
import "virtual:svg-icons-register";
import SvgIcon from "@/components/SvgIcon";
import elementIcons from "@/components/SvgIcon/svgicon";

import "./permission"; // permission control

import { useDict } from "@/utils/dict";
import {
  parseTime,
  resetForm,
  addDateRange,
  handleTree,
  selectDictLabel,
  selectDictLabels,
} from "@/utils/ruoyi";

// 分页组件
import Pagination from "@/components/Pagination";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar";
// 富文本组件
import Editor from "@/components/Editor";
// 文件上传组件
import FileUpload from "@/components/FileUpload";
// 文件导入组件
import exportUpload from "@/components/exportUpload";
// 图片上传组件
import ImageUpload from "@/components/ImageUpload";
// 图片预览组件
import ImagePreview from "@/components/ImagePreview";
// 自定义树选择组件
import TreeSelect from "@/components/TreeSelect";
// 字典标签组件
import DictTag from "@/components/DictTag";
const app = createApp(App);
app.use(store);

const languageStore = useLanguageStore();
languageStore.initLocale();

const loadLanguage = async (locale) => {
  const targetLocale = locale || "cn";
  const translation = await fetchTranslation(targetLocale); // 假设 fetchTranslation 从服务器获取语言包
  i18n.global.setLocaleMessage(targetLocale, translation);
  i18n.global.locale = locale; // 设置当前语言
  localStorage.setItem("locale", targetLocale);
};
loadLanguage(localStorage.getItem("locale"));

export { loadLanguage };

if (import.meta.env.MODE === "production") {
  console.log = function () {}; // 仅屏蔽 console.log，保留 console.error
}

// 全局方法挂载
app.config.globalProperties.useDict = useDict;
app.config.globalProperties.download = download;
app.config.globalProperties.parseTime = parseTime;
app.config.globalProperties.resetForm = resetForm;
app.config.globalProperties.handleTree = handleTree;
app.config.globalProperties.addDateRange = addDateRange;
app.config.globalProperties.selectDictLabel = selectDictLabel;
app.config.globalProperties.selectDictLabels = selectDictLabels;
app.config.globalProperties.$t = i18n.global.t;

// 全局组件挂载
app.component("DictTag", DictTag);
app.component("Pagination", Pagination);
app.component("TreeSelect", TreeSelect);
app.component("FileUpload", FileUpload);
app.component("ExportUpload", exportUpload);
app.component("ImageUpload", ImageUpload);
app.component("ImagePreview", ImagePreview);
app.component("RightToolbar", RightToolbar);
app.component("Editor", Editor);

app.use(router);
app.use(plugins);
app.use(i18n);
app.use(elementIcons);
app.component("svg-icon", SvgIcon);

directive(app);
// 使用element-plus 并且设置全局的大小

app.use(ElementPlus, {
  locale: languageStore.elementLocale,
  // 支持 large、default、small
  size: Cookies.get("size") || "default",
});

app.mount("#app");
