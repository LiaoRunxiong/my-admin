import { defineStore } from "pinia";

export const useTabsStore = defineStore("tabs", {
  state() {
    return {
      tabViews: [],
      activeKey: "",
    };
  },
  getters: {
    getTabViews() {
      return this.tabViews || [];
    },
    getActiveKey() {
      return this.activeKey || "";
    },
  },
  actions: {
    addTabViews(tab) {
      let index = this.tabViews.findIndex(
        (item) => item.tabTitle === tab.tabTitle
      );
      if (index == -1) {
        this.tabViews.push(tab);
      }
      this.setActiveKey(tab.tabTitle);
    },
    setActiveKey(key) {
      this.activeKey = key;
    },
    removeTabViews(tabTitle) {
      let index = this.tabViews.findIndex((item) => item.tabTitle === tabTitle);
      if (index != -1) {
        this.tabViews.splice(index, 1);
        //更新激活页 
        // 左侧有页面则左侧 无则右侧
        if (index - 1 >= 0) {   
          let tab = this.tabViews[index - 1];
          this.setActiveKey(tab.tabTitle);
        } else if (this.tabViews.length > 0) {
          let tab = this.tabViews[index];
          this.setActiveKey(tab.tabTitle);
        } else {
          this.setActiveKey("/");
        }
      }
    },
  },
});
