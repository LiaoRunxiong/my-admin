<template>
  <div class="tabs">
    <a-tabs
      v-model:activeKey="activeKey"
      hide-add
      type="editable-card"
      @edit="onEdit"
      size="small"
      @change="handelChange"
    >
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.key"
        :tab="pane.title"
        :closable="pane.closable"
      >
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTabs } from "@/hooks/useTabs";
export default {
  name: "Tabs",
  components: {},
  setup() {
    // const id = String(index + 1);
    const route = useRoute();
    const router = useRouter();

    const {
      addTabViews,
      getTabViews,
      getActiveKey,
      setActiveKey,
      removeTabViews,
    } = useTabs();
    console.log(31, route);
    const activeKey = ref(getActiveKey.value);
    const panes = computed(() => {
      let arr = [];
      arr = getTabViews.value.map((item) => {
        return {
          title: item.tabTitle,
          key: item.tabTitle,
          ...item,
        };
      });
      console.log(44, arr);

      return arr;
    });

    const newTabIndex = ref(0);
    // const add = () => {
    //   activeKey.value = `newTab${newTabIndex.value++}`;
    //   panes.value.push({
    //     title: activeKey.value,
    //     key: activeKey.value,
    //   });
    // };
    const remove = (targetKey) => {
      if (panes.value[0].title == "首页" && targetKey == "首页") {
        return;
      }
      removeTabViews(targetKey);
    };
    const handelChange = (targetKey) => {
      console.log(60, targetKey);
      setActiveKey(targetKey);
    };
    const onEdit = (targetKey) => {
      remove(targetKey);
    };
    watch(
      route,
      (n, o) => {
        console.log(59, n, o, n.matched[n.matched.length - 1].components);
        addTabViews({
          tabTitle: n.meta.title,
          name: n.name,
          fullPath: n.fullPath,
          components:
            n.matched.length > 0
              ? n.matched[n.matched.length - 1].components
              : null,
        });
      },
      {
        immediate: true,
      }
    );
    watch(
      getActiveKey,
      (n) => {
        activeKey.value = n;
        let tagret = panes.value.find((item) => item.key === activeKey.value);
        if (!tagret) {
          router.push("/");
        } else {
          router.push(tagret.fullPath);
        }
      },
      {
        immediate: true,
      }
    );
    return { onEdit, remove, activeKey, panes, handelChange };
  },
};
</script>

<style lang="less" scoped>
.tabs ::v-deep .ant-tabs-nav {
  margin: 10px 16px 0;
}
</style>
