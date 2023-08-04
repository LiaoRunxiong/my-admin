<template>
  <div>
    <a-layout-header style="background: #fff; padding: 0">
      <div class="my-layout-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="toggleCollapsed"
        />
        <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
        <div class="avatar">
          <img :src="user.avatar" alt="" />
        </div>
      </div>
    </a-layout-header>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { Layout } from "ant-design-vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { useMenuSetting } from "@/hooks/setting/useMenueSetting";
import { useUser } from "@/hooks/useUser";

export default defineComponent({
  name: "LayoutHeader",
  components: {
    "a-layout-header": Layout.Header,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  props: {},
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting();
    const { getUser } = useUser();
    const collapsed = getCollapsed;
    const user = getUser;

    return { collapsed, toggleCollapsed, user };
  },
});
</script>
<style scoped lang="less">
.my-layout-header {
  display: flex;
  align-items: center;
  // width: calc(100vw - 200px);
  height: 100%;

  .avatar {
    width: 40px;
    height: 40px;
    justify-self: flex-end;
    border-radius: 50%;
    box-shadow: 0 0 2px 2px rgba(155, 153, 153, 0.466);
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
