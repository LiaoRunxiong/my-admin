<template>
  <div class="visual-design main">
    <div @click="a = !a">++</div>
    <a-divider orientation="left">我参与的项目</a-divider>
    <div class="card">
      <a-row :gutter="[16, 16]">
        <a-col :span="4" v-for="(design, index) in designRoutes" :key="index">
          <a-card @click="handleGo(design.path)">
            {{ design.meta.title }}
          </a-card>
        </a-col>
        <a-col :span="4">
          <a-card @click="handleGoStatistical"> 数量统计表 </a-card>
        </a-col>

        <a-col :span="4">
          <a-card @click="handleGo('sampleReceiptDelivery')">
            样品收发情况
          </a-card>
        </a-col>
      </a-row>
    </div>
    <KeepAlive>
      <Pattern v-if="a"></Pattern>
      <Photo v-else></Photo>
    </KeepAlive>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onActivated, onDeactivated } from "vue";
import { useUser } from "@/hooks/useUser";
import { useRouter, useRoute } from "vue-router";
import Pattern from "../pattern/index.vue";
import Photo from "../photo/index.vue";
import { useScroll } from "@/hooks/useScroll";

export default {
  name: "visualDesign",
  components: { Photo, Pattern },
  setup() {
    let pageScrollEl = null;
    const a = ref(true);
    const { getUser, logout } = useUser();
    const router = useRouter();
    const allRoutes = router
      .getRoutes()
      .find((item) => item.path == "/walmart/visual/visualDesign");
    const designRoutes = allRoutes.children.filter((item) =>
      item.path.split("/").includes("visualDesign")
    );
    const statisticalRoutes = allRoutes.children.filter((item) =>
      item.path.split("/").includes("statistical")
    );
    console.log(54, designRoutes, statisticalRoutes);
    function handleLogout() {
      logout();
      router.push("/login");
    }
    function handleGo(path) {
      router.push(path);
    }
    function handleGoStatistical() {}

    // function getMatchedComponents() {
    // }
    onActivated(() => {
      // 调用时机为首次挂载
      // 以及每次从缓存中被重新插入时
      console.log("66active");
    });

    onDeactivated(() => {
      // 在从 DOM 上移除、进入缓存
      // 以及组件卸载时调用
      console.log("72deactive");
    });
    return {
      a,
      designRoutes,
      statisticalRoutes,
      handleLogout,
      handleGo,
      handleGoStatistical,
    };
  },
};
</script>
<style scoped>
.card {
  width: 100%;
}
</style>
