import { useTabsStore } from "@/store/modules/tabs";
import { computed } from "vue";

export function useTabs() {
  const tabsStore = useTabsStore();
  const getTabViews = computed(() => tabsStore.getTabViews);
  const getActiveKey = computed(() => tabsStore.getActiveKey);

  function addTabViews(value) {
    tabsStore.addTabViews(value);
  }
  function removeTabViews(value) {
    tabsStore.removeTabViews(value);
  }
  function setActiveKey(value) {
    tabsStore.setActiveKey(value);
  }
  return {
    addTabViews,
    getTabViews,
    removeTabViews,
    setActiveKey,
    getActiveKey,
  };
}
