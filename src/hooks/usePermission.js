import { usePermissonStore } from "@/store/modules/permission";
import { computed } from "vue";

export function usePermission() {
  const userStore = usePermissonStore();
  const getOriginRouteList = computed(() => userStore.getOriginRouteList);
  const getMenuRoutes = computed(() => userStore.getMenuRoutes);

  function buildRoutes() {
    userStore.buildRoutes();
  }
  function setMenuRoutes() {
    userStore.setMenuRoutes();
  }
  function setOriginRouteList() {
    userStore.setOriginRouteList();
  }
  async function requstOriginMenus() {
    return await userStore.requstOriginMenus();
  }
  return {
    getMenuRoutes,
    setMenuRoutes,
    getOriginRouteList,
    setOriginRouteList,
    requstOriginMenus,
    buildRoutes,
  };
}
