import { useUserStore } from "@/store/modules/user";
import { computed } from "vue";

export function useUser() {
  const userStore = useUserStore();
  const getUser = computed(() => userStore.getUser);
  const isLogin = computed(() => userStore.isLogin);

  async function loginbyPhone(value) {
    return await userStore.loginbyPhone(value);
  }
  function setUserMsg(value) {
    userStore.setUserMsg(value);
  }
  function logout() {
    userStore.logout();
  }
  return { loginbyPhone, getUser, isLogin, setUserMsg, logout };
}
