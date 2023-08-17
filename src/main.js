import { createApp } from "vue";
import App from "./App.vue";
import { router, setupRouter } from "./router";
import { setupStore } from "./store";
import Antd from "ant-design-vue";
import { message } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import MyKeepAlive from "@/components/MyKeepAlive";
// import KeepAliveImpl from "@/components/MyKeepAlive/keepalive";

// import "ant-design-vue/dist/reset.css";
const app = createApp(App);
app.use(Antd);
// import {
//   Layout,
//   Menu,
//   MenuItem,
//   LayoutSider,
//   LayoutHeader,
//   LayoutContent,
// } from "ant-design-vue";

// app
//   .use(Menu)
//   .use(MenuItem)
//   .use(Layout)
//   .use(LayoutSider)
//   .use(LayoutHeader)
//   .use(LayoutContent);

// 添加全局错误处理器
// if (process.env.NODE_ENV === "development") {
//   app.config.warnHandler = function (msg, vm, trace) {
//     // 阻止Vue Router的警告信息输出到控制台
//     console.log(49, msg);
//     if (msg.startsWith("Navigation cancelled from")) {
//       return;
//     }
//     // 处理其他警告信息
//     // ...
//   };
// }
// 配置pina
setupStore(app);
// 配置路由
setupRouter(app);

app.mount("#app");

message.config({
  top: `10px`,
  duration: 2,
  maxCount: 3,
  rtl: false,
  //   prefixCls: "my-message",
});

// 注册全局组件
app.component("MyKeepAlive", MyKeepAlive);
