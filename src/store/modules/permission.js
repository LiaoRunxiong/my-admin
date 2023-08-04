import { defineStore } from "pinia";
import { getMenus } from "@/api/sys/menu";
import { useUser } from "@/hooks/useUser";
import Layout from "@/layout/index";
import Blank from "@/layout/blank/index";

import { router } from "@/router/index";

export const usePermissonStore = defineStore("permisson", {
  state() {
    return {
      originRouteList: [],
      menuRoutes: [],
      buttonList: [],
      roles: [],
      weChatId: "",
    };
  },
  getters: {
    getOriginRouteList() {
      return this.originRouteList || [];
    },

    getMenuRoutes() {
      return this.menuRoutes || [];
    },
  },
  actions: {
    //生成对应路由
    buildRoutes() {
      let arr = this.originRouteList;

      arr.forEach((route) => {
        // pid 跟路由
        if (route.pid !== 0) {
          let parentRoute = arr.find((route2) => {
            return route2.id == route.pid;
          });
          parentRoute.children.push(route);
        }
      });
      arr = arr.filter((route) => {
        return route.pid == 0;
      });
      //orderline 排序
      function routeSort(arr) {
        arr.sort((a, b) => {
          return b.orderline - a.orderline;
        });
      }
      arr.forEach((list) => {
        if (list.children.length > 0) {
          routeSort(list.children);
        }
      });
      routeSort(arr);

      function generateRouteObj(arr, parentArr = []) {
        //构建路由结构
        let arr2 = [];

        arr.forEach((route, index) => {
          let obj = {};
          if (route.pid == 0) {
            obj.component = Layout;
            console.log(68, route);
          } else if (route.resourceType == 2) {
            obj.component = Blank;
          } else {
            obj.component = () => import("@/views" + obj.path);
          }
          // obj.name = route.name;
          obj.path = route.routerKey;
          obj.hidden = route.isHide;
          obj.meta = {
            title: route.name,
            keepAlive:route.keepAlive,
            icon: route.icon,
            resourceType: route.resourceType,
            id: route.id,
            pid: route.pid,
          };
          if (route.resourceType == 3) {
            obj.children = [];
            parentArr.push(obj);
            // arr.splice(index, 1);
          }
          obj.children = generateRouteObj(route.children, arr);
          arr2.push(obj);
        });
        // arr = arr.filter((item) => item !== false);
        return arr2;
      }
      let obj = {
        path: "/walmart",
        hidden: true,
        children: [],
      };

      // arr = arr.filter((list) => list.module == "walmart");
      let res = generateRouteObj(arr);
      obj.children = res;
      router.addRoute(obj);
      // router.options.routes.push(...obj.children);
      // obj.children.forEach((item) => {
      //   router.addRoute(item);
      // });

      this.setMenuRoutes(obj.children);
    },
    setMenuRoutes(value) {
      this.menuRoutes = value || [];
    },
    setOriginRouteList(value) {
      this.originRouteList = value || [];
    },
    setButtonList(value) {
      this.buttonList = value || [];
    },
    setRoles(value) {
      this.roles = value || [];
    },
    setWeChatId(value) {
      this.weChatId = value || [];
    },
    async requstOriginMenus() {
      try {
        const { getUser } = useUser();
        let res = await getMenus({
          module: "walmart",
          myToken: getUser.value.myToken,
        });
        this.setOriginRouteList(res.data.powers);
        this.setButtonList(res.data.buttonKeys);
        this.setRoles(res.data.roleNames);
        this.setWeChatId(res.data.weChatId);
        this.buildRoutes();
      } catch (error) {
        console.log("err:", error);
      }
    },
  },
});
