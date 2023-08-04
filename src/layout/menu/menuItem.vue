<template>
  <template v-for="route in menu" :key="route.meta.id">
    <template v-if="!route.hidden">
      <a-sub-menu
        v-if="route.meta.resourceType == 2"
        :key="'sub' + route.meta.id"
        :title="route.meta.title"
      >
        <template v-if="route.children.length > 0">
          <MyMenuItem :menu="route.children"
        /></template>
      </a-sub-menu>
      <a-menu-item v-else :key="'item' + route.meta.id">
        <router-link :to="route.path">{{ route.meta.title }}</router-link>
      </a-menu-item>
    </template>
  </template>
</template>
<script>
export default {
  name: "MyMenuItem",
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    return {
      menu: props.menu,
    };
  },
};
</script>
<style scoped lang="less"></style>
