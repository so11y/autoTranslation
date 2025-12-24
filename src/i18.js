import { createI18n } from "vue-i18n";
import zh from "../_i18_81i_/zh";
import en from "../_i18_81i_/en";

// import { en, zh } from "virtual:i18n";

const i18n = createI18n({
  legacy: false,
  locale: "zh",
  fallbackLocale: "en",
  messages: {
    en,
    zh
  }
});

window.$t = function (e) {
  return i18n.global.t(e);
};

window.test = function (e) {
  i18n.global.locale.value = e;
};
export { i18n };
