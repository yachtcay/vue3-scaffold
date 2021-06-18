<template>
  <a-card class="container">
    <a-alert message="用户名和密码均为 admin" type="warning" style="margin: 0 0 20px 0;" />
    <a-form ref="formRef" :model="form" :rules="rules">
      <a-form-item label="用户名" :labelCol="{ span: 6 }" name="username">
        <a-input v-model:value="form.username" style="width: 200px" />
      </a-form-item>
      <a-form-item label="密码" :labelCol="{ span: 6 }" name="password">
        <a-input-password v-model:value="form.password" style="width: 200px" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 6 }">
        <a-button type="primary" @click="handleLogin">登录</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        password: {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.formRef.validate().then(() => {
        // login
        // this.$store
        this.$store.dispatch('auth/login', {
          username: this.form.username,
          password: this.form.password
        })
      })
    }
  }
}
</script>

<style lang="less">
  .container {
    width: 400px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
  }
</style>
