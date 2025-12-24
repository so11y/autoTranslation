import App from "./App.vue";
import { createApp } from "vue";
import { i18n } from "./i18";
const app = createApp(App);
app.use(i18n);
app.mount("#app");
