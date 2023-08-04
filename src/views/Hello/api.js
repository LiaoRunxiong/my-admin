import { post, get } from "@/utils/http/axios/index";
import { servicePrefix } from "@/config/url/prefix";

const API = {
  getList: servicePrefix.system + "/oa/access_control_application/",
  getVerifyCode: servicePrefix.system + "/system/admin/getVerifyCode",
};

// 查询
export const getList = (params) => {
  // return this.request({ ...config, method: 'GET' }, options);
  return get(API.getList, params);
};

//  获取当前的用户信息和菜单信息
export const getMenus = (params) => {
  // return this.request({ ...config, method: 'GET' }, options);
  return post(API.getMenus, params);
};

//获取图形验证码
export const getVerifyCode = (params) => {
  return post(API.getVerifyCode, params);
};
