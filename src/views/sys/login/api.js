import { post, get } from "@/utils/http/axios/index";
import { servicePrefix } from "@/config/url/prefix";

const API = {
  getVerifyCode: servicePrefix.system + "/system/admin/getVerifyCode",
  loginByPassword: servicePrefix.system + "/system/admin/loginByPassword",
};

//获取图形验证码
export const getVerifyCode = (params) => {
  return post(API.getVerifyCode, params);
};

// 用户账号密码登录
export const loginByPassword = (params) => {
  return post(API.loginByPassword, params);
};
