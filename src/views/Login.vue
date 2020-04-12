<template>
  <div class="container">
    <div class="frame">
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form ref="form" class="form" :model="form" label-width="0px">
        <el-form-item >
          <el-input   prefix-icon="el-icon-user" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item >
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
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit(){

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
    .form{
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      padding-bottom: 40px;
    }
  }
.btns{
  display: flex;
  justify-content: flex-end;
}
}
</style>