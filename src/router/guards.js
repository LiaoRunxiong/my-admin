import { useLocalStorage } from "@vueuse/core";
import { useUser } from "@/hooks/useUser";
import { usePermission } from "@/hooks/usePermission";

export function setupRouterGuards(router) {
  let reload = true;
  // 全局前置守卫
  router.beforeEach(async (to, from, next) => {
    const state = useLocalStorage("my-admin-user", {});
    const { setUserMsg, logout, getUser } = useUser();
    const { requstOriginMenus, getMenuRoutes, getOriginRouteList } =
      usePermission();
    console.log(12, state.value.myToken);
    setUserMsg(state.value);
    const token = state.value.myToken;
    console.log(15, to);
    if (!token) {
      // token不存在，重定向到登录页或其他处理方式
      if (to.path !== "/login") {
        logout();
        next("/login");
      } else {
        logout();
        next();
      }
    } else {
      // token存在，继续导航

      if (to.path == "/login") {
        next("/");
      } else {
        let menu = getOriginRouteList.value;
        if (menu.length < 1) {
          await requstOriginMenus();
        }
        console.log(26, to);
        // next({
        //   ...to,
        //   replace: true,
        // });

        //刷新页面 动态添加路由后 matched还是空数组 ，重新路由一次 reload防止其他不能匹配的路由造成 死循环
        if (to.matched.length < 1 && reload) {
          reload = false;
          next({
            ...to,
            replace: true,
          });
        } else {
          next();
        }
      }
    }
  });
}
