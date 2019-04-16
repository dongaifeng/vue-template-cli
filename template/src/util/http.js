import axios from "axios";
import { Notification } from "element-ui";
import store from "../store";

require("../mock");

// axios.defaults.baseURL = 'http://localhost:8080';

const codeMessage = {
  201: "太棒了，保存成功！",
  202: "您的请求已提交，请耐心等待服务器处理！",
  204: "太棒了，删除成功！",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

axios.interceptors.request.use(
  config => {
    const requestConfig = config;
    if (store.state.token) {
      requestConfig.headers.Authorization = `Bearer ${store.state.token}`;
    }
    return requestConfig;
  },
  err => {
    Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    if (response.status > 200 && response.status < 300) {
      let message = codeMessage[response.status];
      if (response.data && response.data.message) {
        message = response.data.message;
      }
      Notification({
        title: "系统提示",
        type: "success",
        message,
        duration: 2000
      });
    }
    return response;
  },
  error => {
    let message = codeMessage[error.response.status];
    if (error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }
    Notification.error({
      title: "系统提示",
      dangerouslyUseHTMLString: true,
      message,
      duration: 2000
    });
    return Promise.reject(error);
  }
);

export default axios;
