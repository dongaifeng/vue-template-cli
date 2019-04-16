<template>
    <el-container>
        <el-aside class="sidebar" v-bind:class="{'sidebar-collapse':isCollapse}">
            <el-header class="logo">
                <img src="@/assets/logo.png">
                <h1>Element Admin</h1>
            </el-header>
            <el-menu :router="true" :default-active="$route.path" :collapse="isCollapse">
                <el-menu-item v-for="menu in this.$store.state.menuTree" :key="menu.menuId" :index="menu.link" v-if="menu.children.length===0">
                    <i :class="menu.icon"></i>
                    <span slot="title">{{menu.menuName}}</span>
                </el-menu-item>
                <el-submenu :index="menu.link" v-else>
                    <template slot="title">
                        <i :class="menu.icon"></i>
                        <span slot="title">{{menu.menuName}}</span>
                    </template>
                    <el-menu-item :index="child.link" v-for="child in menu.children" :key="child.menuId">
                        <i :class="menu.icon"></i>
                        <span slot="title">{{child.menuName}}</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="header">
                <i @click="isCollapse=!isCollapse" class="el-icon-menu sidebarToggle"></i>
                <div class="float-right">
                    <el-dropdown trigger="click" class="header-action">
                        <span>语言<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>中文</el-dropdown-item>
                            <el-dropdown-item>English</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown trigger="click" @command="handleCommand" class="header-action">
                        <span>Admin<i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="Profile"> <i class="el-icon-setting"></i> 个人设定</el-dropdown-item>
                            <el-dropdown-item command="SignOut"> <i class="el-icon-refresh"></i> 安全退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main>
                <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
                    <el-breadcrumb-item v-for="menuName in _.map($route.matched,'meta.menuName')" :key="menuName">
                        {{ menuName }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "Profile":
          this.$router.push({ path: "/system/profile" });
          break;
        case "SignOut":
          this.signOut();
          break;
      }
    },
    signOut() {
      this.$store.dispatch("signOut").then(() => {
        this.$router.push({ path: "/" });
      });
    }
  }
};
</script>
