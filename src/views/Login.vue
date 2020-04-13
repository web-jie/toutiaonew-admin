<template>
  <div class="container">
    <div class="frame">
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form ref="form" class="form" :model="form" label-width="0px">
        <el-form-item>
          <el-input prefix-icon="el-icon-user" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="el-icon-lock" type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-row class="btns">
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="info">注册</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "13800138000",
        password: "123"
      },
      // 表单的验证规则
      // required: 表示必填
      // message: 错误时候提示
      // trigger 什么时候触发验证
      rules: {
        username: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          {
            min: 11,
            max: 11,
            message: "手机号码格式错误",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 提交表单登录
          this.$axios({
            url: "/login",
            method: "POST",
            data: this.form
          }).then(res => {
            // data是用户的数据，里面包含了token和user的详细信息
            const { data } = res.data;
            // 判断当前用户是否有权限
            if (data.user.role.type !== "admin") {
              this.$message({
                message: "当前用户没有权限,必须是管理员",
                type: "warning"
              });
              return;
            }
            // 转换成字符串
            const userStr = JSON.stringify(data);
            // 保存到本地，可以给其他的组件使用
            localStorage.setItem("userInfo", userStr);
            // 登录成功的提示
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.$router.push("/")
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2b3b4b;
  .frame {
    // border: 1px solid #000;
    border-radius: 12px;
    width: 450px;
    height: 300px;
    background: #fff;
    position: relative;
    .logo {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      height: 130px;
      width: 130px;
      border-radius: 50%;
      border: 1px solid #eee;
      background: #fff;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .form {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      padding-bottom: 40px;
    }
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>