<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="@/assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" />{{ a }} -->
    {{ a }}
    <a-button type="primary" @click="handleLogout">注销</a-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { ref } from "vue";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "vue-router";
import { Button } from "ant-design-vue";
export default {
  name: "HomeView",
  components: {
    HelloWorld,
    "a-button": Button,
  },
  setup() {
    const a = ref(1);
    const { getUser, logout } = useUser();
    const router = useRouter();

    console.log(23, getUser.value);
    function handleLogout() {
      logout();
      router.push("/login");
    }
    return {
      a,
      handleLogout,
    };
  },
};
</script>
