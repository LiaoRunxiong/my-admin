import { post, get } from "@/utils/http/axios/index";
import { servicePrefix } from "@/config/url/prefix";
const API = {
  loginByPassword: servicePrefix.system + "/system/admin/loginByPassword",
};

// 用户账号密码登录
export const loginByPassword = (params) => {
  return post(API.loginByPassword, params);
};
