import { defineStore } from "pinia";
import cn from "element-plus/dist/locale/zh-cn.mjs";
import en from "element-plus/dist/locale/en.mjs";
import th from "element-plus/dist/locale/th.mjs";
import hk from "element-plus/dist/locale/zh-tw.mjs";
import vi from "element-plus/dist/locale/vi.mjs";
// import ms from "element-plus/dist/locale/ms.mjs";

export const useLanguageStore = defineStore("language", {
  state: () => ({
    elementLocale: null,
    currentLocale: localStorage.getItem("locale") || "cn",
  }),

  actions: {
    initLocale() {
      const localeMap = {
        cn: cn,
        en: en,
        th: th,
        hk: hk,
        vi: vi,
        // ms: ms,
      };
      this.elementLocale = localeMap[this.currentLocale] || cn;
    },
  },
});
