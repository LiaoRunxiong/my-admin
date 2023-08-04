import { post, get } from "@/utils/http/axios/index";
import { servicePrefix } from "@/config/url/prefix";
const API = {
  getMenus: servicePrefix.system + "/system/admin/currentMenus",
};
// 用户账号密码登录
// {
//   module: "walmart";
//   myToken:'yb3Si6cwcEGPzBsCV8tTMNYaAPRJ9iGf'
// }
export const getMenus = (params) => {
  return post(API.getMenus, params);
};
