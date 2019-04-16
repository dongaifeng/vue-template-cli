<template>
  <div class="login">
    <el-row style="margin-top: 260px;z-index: 1;">
      <el-col :model="user" :offset="9" :span="6">
        <el-card class="login-box" v-loading="$store.state.loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <el-form>
            <h1 class="title">欢迎使用Element Admin</h1>
            <p class="login-box-msg">疾如风，徐如林!</p>
            <el-form-item>
              <el-input type="text" v-model="user.userName" auto-complete="off" placeholder="请输入用户名..." suffix-icon="el-icon-bell"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="password" v-model="user.password" auto-complete="off" placeholder="请输入密码..." suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login" :loading="$store.state.loading" class="pull-right" style="width:100%">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style>
.login {
  background: url(../assets/bg.png) no-repeat scroll center center / cover;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
}

.login-box {
  background: #ffffff;
  border: none;
}

.login-box-msg {
  color: #000000;
  text-align: center;
}

.login-box .title {
  color: #000000;
  text-align: center;
}
</style>
<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$http.post("/passport/signIn", this.user).then(res => {
        if (res.data.token) {
          this.$store.commit("setToken", res.data.token);
          this.$router.push({ path: "/dashboard" });
        }
      });
    }
  }
};
</script>
