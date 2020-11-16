<template>
  <div class="login_container">
    <div class="login_box">
      <!--   头像   -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!--   表单   -->
      <el-form label-width="0px" class="form" :model="login_form" :rules="login_rules" ref="loginForm">
        <el-form-item>
          <el-form-item class="input" prop="nickName">
            <el-input prefix-icon="el-icon-user-solid" v-model="login_form.nickName">用户名</el-input>
            <el-input prefix-icon="el-icon-lock" v-model="login_form.password" type="password">密码</el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="loginFunc">登录</el-button>
            <el-button type="primary" @click="signupFunc">注册</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login_form: {
        nickName: 'admin',
        password: 'admin'
      },
      login_rules: {
        nickName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在3-5个字符之间', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    loginFunc() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const {data: response} = await this.axios.post("/user_account/login", this.login_form);
          // console.log(response)
          if (response.code === 1) {
            // this.$message.success(response);
            window.sessionStorage.setItem("token", response.data.token)
            await this.$router.push('/welcome')
          } else {
            this.$message.error(response);
          }
        }
      })
    },
    signupFunc() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const {data: response} = await this.axios.post("/user_account/signup", this.login_form);
          if (response.code === 1) {
            this.$message.success(response);
          } else {
            this.$message.error(response);
          }
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>

.login_container {
  background-color: #2b6b4b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 5px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .btn {
    //align-content: center;
  }

  .form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

}

</style>
