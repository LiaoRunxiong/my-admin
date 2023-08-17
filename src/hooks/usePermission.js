import { usePermissonStore } from "@/store/modules/permission";
import { computed } from "vue";
import { router } from "@/router/index";
export function usePermission() {
  const userStore = usePermissonStore();
  const getOriginRouteList = computed(() => userStore.getOriginRouteList);
  const getMenuRoutes = computed(() => userStore.getMenuRoutes);
  const getButtonPermissions = computed(() => userStore.getButtonPermissions);

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
  function hasPermission(permissionName) {
    console.log(
      233333,
      getButtonPermissions.value.includes(
        router.currentRoute.value.path + ":" + permissionName
      ),
      router.currentRoute.value.path+ ":" + permissionName
    );
    return getButtonPermissions.value.includes(
      router.currentRoute.value.path + ":" + permissionName
    );
  }
  return {
    getMenuRoutes,
    setMenuRoutes,
    getOriginRouteList,
    setOriginRouteList,
    requstOriginMenus,
    buildRoutes,
    hasPermission,
  };
}
