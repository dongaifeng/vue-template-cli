import Vue from "vue";
import _ from "lodash";
import Router from "vue-router";
import SignIn from "@/views/SignIn";
import store from "@/store";

Vue.use(Router);

const BasicLayout = () => import("@/views/layout/BasicLayout.vue");

export const constantRouter = [
  { path: "/", name: "signIn", component: SignIn, meta: { anonymous: true } }
];

export const asyncRouter = [
  {
    path: "/dashboard",
    component: BasicLayout,
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: { menuName: "概览" }
      }
    ]
  },
  {
    path: "/system",
    component: BasicLayout,
    children: [
      {
        path: "/system/profile",
        name: "profile",
        component: () => import("@/views/system/Profile.vue")
      },
      {
        path: "/system/user",
        name: "user",
        component: () => import("@/views/system/User.vue")
      },
      {
        path: "/system/role",
        name: "role",
        component: () => import("@/views/system/Role.vue")
      }
    ]
  }
];

const router = new Router({ routes: constantRouter });

// 是否有权限访问某个路径
const hasPermission = toPath => {
  const links = _.map(store.state.menus, "link");
  return _.indexOf(links, toPath) > 0;
};

// 根据菜单生成路由的菜单元数据
const generateMenuName = route => {
  const menu = _.find(store.state.menus, { link: route.path });
  if (!menu) {
    return;
  }
  const menuName = menu.menuName;
  if (route.meta) {
    route.meta.menuName = menuName;
  } else {
    route.meta = { menuName };
  }
  _.forEach(route.children, child => {
    generateMenuName(child);
  });
};

// 动态生成路由表
const generateRoutes = () =>
  _.filter(asyncRouter, route => {
    const flag = hasPermission(route.path);
    if (flag) {
      generateMenuName(route);
    }
    return flag;
  });

// 导航之前拦截器
router.beforeEach((to, from, next) => {
  if (to.meta.anonymous) {
    next();
    return;
  }

  // 没有Token，尝试从本地存储中重新加载Token
  if (store.state.token == null) {
    const token = localStorage.getItem("token");
    if (token != null && token.toUpperCase() !== "NULL") {
      store.commit("setToken", token);
    }
  }

  // 有Token
  if (store.state.token != null) {
    // 没有菜单信息，重新从服务器加载菜单
    if (store.state.menus.length === 0) {
      store
        .dispatch("reloadUserAuthority")
        .then(() => {
          const routes = generateRoutes();
          router.addRoutes(routes);
          next({ ...to, replace: true });
        })
        .catch(() => {
          next("/");
        });
    } else if (hasPermission(to.path)) {
      next();
    } else {
      // 无权限访问，返回到登陆页面
      next("/");
    }
  } else {
    // 本地没有Token，需要重新登陆
    next("/");
  }
});

export default router;
