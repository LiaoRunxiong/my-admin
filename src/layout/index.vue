<template>
  <a-layout class="my-layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      theme="light"
      :trigger="null"
      collapsible
    >
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="light"
        mode="vertical"
        triggerSubMenuAction="click"
        @openChange="open"
        :subMenuOpenDelay="0.1"
      >
        <MyMenuItem :menu="allRoutes" />
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <LayoutHeader></LayoutHeader>
      <Tabs></Tabs>
      <a-layout-content
        :style="{
          margin: '0px 16px 0',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view v-slot="{ Component }">
          <!-- <MyKeepAlive>
            <component :is="Component" />
          </MyKeepAlive> -->
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        My Adimin ©2023 Created by LRX
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

import LayoutHeader from "./header/index.vue";
import Blank from "./blank/index.vue";
import Tabs from "./tabs/index.vue";
import MyMenuItem from "./menu/menuItem.vue";
import { useMenuSetting } from "@/hooks/setting/useMenueSetting";
import { usePermission } from "@/hooks/usePermission";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AppstoreOutlined,
    LayoutHeader,
    Blank,
    Tabs,
    MyMenuItem,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    console.log(75, route, router.getRoutes());
    function filterHidden(arr) {
      if (arr.length < 1) {
        return [];
      }
      arr = arr.filter((item) => !item.hidden);
      arr.forEach((item) => {
        item.children = filterHidden(item.children);
      });
      return arr;
    }
    let allRoutes = computed(() => {
      let routes = cloneDeep(usePermission().getMenuRoutes.value);
      let arr = filterHidden(routes);
      return arr;
    });
    console.log(78, allRoutes);

    const { getCollapsed } = useMenuSetting();
    const collapsed = getCollapsed;
    const open = (k) => {};
    return {
      selectedKeys: ref([]),
      collapsed,
      allRoutes,
      route,
      open,
    };
  },
});
</script>
<style lang="less">
.my-layout {
  .ant-layout {
    min-height: 100vh;
  }
  .ant-layout-content {
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }

  .logo {
    height: 32px;
    background: rgba(24, 15, 15, 0.3);
    margin: 16px;
  }

  .site-layout-background {
    background: #fff;
  }
}
</style>
