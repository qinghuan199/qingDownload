import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "", // 默认语言为中文
  fallbackLocale: "cn", // 如果当前语言找不到翻译，回退到中文
  messages: {
    cn: {}, // 初始为空，动态加载
    en: {}, // 初始为空，动态加载
  },
  globalInjection: true,
});

export default i18n;
