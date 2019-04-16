<template>
    <el-card shadow="never" :body-style="{ padding: '20px 20px 20px 20px' }">
        <el-tabs>
            <el-tab-pane label="基本设置">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input placeholder="请输入手机号码" class="input-with-select">
                            <el-select slot="prepend" placeholder="请选择国际码" style="width: 140px">
                                <el-option label="中国 86" value="86"></el-option>
                                <el-option label="英国 44" value="44"></el-option>
                                <el-option label="秘鲁 51" value="51"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="电子邮件">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio v-model="radio" label="1">男</el-radio>
                        <el-radio v-model="radio" label="2">女</el-radio>
                    </el-form-item>
                    <el-form-item label="出生日期">
                        <el-date-picker align="right" type="date" placeholder="选择出生日期" :picker-options="$store.state.datePickerOptions" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">更新</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="原密码">
                        <el-input type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">更新</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="通知管理">
                <el-row type="flex" justify="center">
                    <el-col :span="3">文章推送</el-col>
                    <el-col :span="3">
                        <el-switch></el-switch>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="3">支付推送</el-col>
                    <el-col :span="3">
                        <el-switch></el-switch>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="3">订单推送</el-col>
                    <el-col :span="3">
                        <el-switch></el-switch>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>
export default {
  name: "Profile",
  data() {
    return {
      test: true
    };
  },
  mounted() {}
};
</script>
