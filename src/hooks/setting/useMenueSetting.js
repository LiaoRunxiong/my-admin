import { useAppStore } from "@/store/modules/app";
import { computed, unref } from "vue";

export function useMenuSetting() {
  const appStore = useAppStore();
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);
  function toggleCollapsed() {
    appStore.setCollapsed(!unref(getCollapsed));
  }
  return { toggleCollapsed, getCollapsed };
}
