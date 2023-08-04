import { defineStore } from "pinia";
import { loginByPassword } from "@/api/sys/login";
import { getMenus } from "@/api/sys/menu";

import { useLocalStorage } from "@vueuse/core";
import { router } from "@/router/index";
export const useUserStore = defineStore("user", {
  state() {
    return {
      userMsg: {},
    };
  },
  getters: {
    isLogin(state) {
      return !!state.myToken;
    },
    getUser(state) {
      return state.userMsg;
    },
  },
  actions: {
    setUserMsg(value) {
      this.userMsg = value;
    },
    async loginbyPhone(values) {
      // const router = useRouter();
      console.log(25, router);
      try {
        // 执行登录逻辑，验证用户名和密码等
        let res = await loginByPassword(values);
        // 设置用户
        this.setUserMsg(res.data);
        const state = useLocalStorage("my-admin-user", {});
        state.value = this.userMsg;
        // let menus = await getMenus({ module: "walmart", myToken : this.userMsg.myToken});
        // console.log(36,menus);
        router.push("/");
      } catch (error) {
        console.log("err:", error);
      }
    },
    logout() {
      // 执行登出逻辑
      const state = useLocalStorage("my-admin-user", {});
      state.value = null;
      this.setUserMsg({});
      // 设置用户状态为未登录
    },
  },
});
