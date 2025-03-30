<template>
  <div class="login-page h-screen flex items-center justify-center bg-gray-100">
    <div class="login-form w-80 bg-white p-8 rounded shadow-lg">
      <h2 class="text-2xl text-center mb-6">登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">手机号/邮箱</label>
          <input 
            v-model="loginForm.phoneOrEmail" 
            type="text" 
            class="w-full px-3 py-2 border rounded focus:outline-none focus:border-red-500"
            placeholder="请输入手机号或邮箱"
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">密码</label>
          <input 
            v-model="loginForm.password" 
            type="password" 
            class="w-full px-3 py-2 border rounded focus:outline-none focus:border-red-500"
            placeholder="请输入密码"
          >
        </div>
        <div class="text-right mb-4">
          <a href="#" class="text-red-500 text-sm">忘记密码?</a>
        </div>
        <button 
          type="submit" 
          class="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          :disabled="!isFormValid"
        >
          登录
        </button>
      </form>
      <div class="text-center mt-4">
        <span class="text-gray-500">还没有账号?</span>
        <a href="/pages/account/register" class="text-red-500 ml-1">立即注册</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        phoneOrEmail: '',
        password: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.loginForm.phoneOrEmail.length > 0 && 
             this.loginForm.password.length >= 6
    }
  },
  methods: {
    handleLogin() {
      if (!this.isFormValid) return
      
      uni.showLoading({ title: '登录中...' })
      setTimeout(() => {
        uni.hideLoading()
        // 模拟登录成功
        uni.setStorageSync('token', 'mock-token')
        uni.showToast({ title: '登录成功', icon: 'success' })
        uni.navigateBack()
      }, 1500)
    }
  }
}
</script>

<style>
.login-page {
  background-color: #f8f8f8;
}
.login-form {
  max-width: 90%;
}
</style>