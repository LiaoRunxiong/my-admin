import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state() {
    return {
      projectConfig: {
        menuSetting: {
          collapsed: false,
        },
      },
    };
  },
  getters: {
    getProjectConfig() {
      return this.projectConfig || {};
    },
    getMenuSetting() {
      return this.getProjectConfig.menuSetting;
    },
  },
  actions: {
    setProjectConfig(config) {
      //   this.projectConfig = deepMerge(this.projectConfig || {}, config);
      this.projectConfig = config;
      //   Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },

    // setMenuSetting(config) {
    //   return this.getProjectConfig.menuSetting=config;
    // },
    setCollapsed(value) {
      this.projectConfig.menuSetting.collapsed = value;
    },
  },
});
