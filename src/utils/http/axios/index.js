import axios from "axios";
import { devUrl } from "@/config/url/index";
import { message } from "ant-design-vue";
import { useUser } from "@/hooks/useUser";
import router from "@/router/index";

console.log(3, devUrl.BASE_URL);

const http = axios.create({
  baseURL: devUrl.BASE_URL, // 设置你的API基本URL
  // 可以在这里添加其他Axios配置选项
  timeout: 1000 * 20, // 两分钟
  headers: {
    "Content-Type": "application/json",
    // 其他请求头
  },
});
// GET请求封装
export function get(url, params) {
  return http
    .get(url, { params })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
}

// POST请求封装
export function post(url, data) {
  return http
    .post(url, data)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
}

http.interceptors.request.use(
  (config) => {
    console.log(9, config);
    // 在发送请求之前做些什么
    const { getUser } = useUser();
    config.headers.Authorization = getUser.value.myToken;

    // config.headers.Authorization = "Bearer " + getToken(); // 设置授权信息
    // 显示加载进度条等
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    console.log(49, response);
    //code 200
    if (
      response.config.url.includes("/getVerifyCode") &&
      response.data.code === 200
    ) {
      return response;
    }
    if (response.data.code === 200) {
      message.success(response.data.msg);
    }
    //code 500
    if (response.data.code >= 500) {
      message.error(response.data.msg);
    }
    return response;
  },
  (error) => {
    const { logout } = useUser();

    // 处理响应错误

    if (error.response) {
      // 请求已发出，但服务器返回错误状态码

      message.error(error.response.status + ":" + error.response.data.msg);
      logout();
      router.push("/login");
    } else {
      // 网络错误等
      console.error("网络错误:", error.message);
    }
    return Promise.reject(error);
  }
);
export { http };
