<template>
  <div class="order-confirmation">
    <!-- Header -->
    <div class="header p-4 bg-white sticky top-0 z-10 flex items-center">
      <i class="fas fa-arrow-left text-gray-500 mr-2" @click="goBack"></i>
      <h2 class="text-lg font-semibold">订单确认</h2>
    </div>

    <!-- Address Section -->
    <div class="address-section p-4 bg-white mt-2">
      <div class="flex items-center justify-between">
        <div class="text-gray-500">配送地址</div>
        <div class="text-red-500 cursor-pointer" @click="editAddress">编辑</div>
      </div>
      <div class="address-details mt-2">
        <div class="text-sm">{{ selectedAddress.name }}</div>
        <div class="text-gray-500 text-xs">{{ selectedAddress.phone }}</div>
        <div class="text-gray-500 text-xs">{{ selectedAddress.address }}</div>
      </div>
    </div>

    <!-- Order Items -->
    <div class="order-items p-4 bg-white mt-2">
      <div v-for="item in orderItems" :key="item.id" class="item flex p-2 mb-2 bg-white rounded">
        <image :src="item.image" class="w-12 h-12 rounded mr-3" />
        <div class="flex-1">
          <div class="text-sm">{{ item.name }}</div>
          <div class="text-gray-500 text-xs">{{ item.description }}</div>
          <div class="text-red-500 text-sm mt-1">¥{{ item.price * item.quantity }}</div>
        </div>
      </div>
    </div>

    <!-- Payment Method -->
    <div class="payment-method p-4 bg-white mt-2">
      <div class="text-sm mb-2">支付方式</div>
      <div class="flex items-center mb-2">
        <input type="radio" id="wechat" value="wechat" v-model="paymentMethod" />
        <label for="wechat" class="ml-2">微信支付</label>
      </div>
      <div class="flex items-center">
        <input type="radio" id="alipay" value="alipay" v-model="paymentMethod" />
        <label for="alipay" class="ml-2">支付宝</label>
      </div>
    </div>

    <!-- Total & Button -->
    <div class="total-footer fixed bottom-0 left-0 right-0 bg-white p-4">
      <div class="flex justify-between items-center">
        <div class="text-sm">合计:</div>
        <div class="text-red-500 font-medium">¥{{ total }}</div>
      </div>
      <div class="flex justify-end mt-2">
        <button 
          class="bg-red-500 text-white px-6 py-2 rounded-full text-sm"
          @click="confirmOrder"
        >
          立即支付
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedAddress: {
        name: '张三',
        phone: '13800138000',
        address: '北京市海淀区中关村大街1号'
      },
      orderItems: uni.getStorageSync('cart') || [],
      paymentMethod: 'wechat'
    }
  },
  computed: {
    total() {
      return this.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 5) // 5元配送费
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    editAddress() {
      uni.navigateTo({
        url: '/pages/address/list'
      })
    },
    confirmOrder() {
      uni.showLoading({ title: '支付中...' })
      setTimeout(() => {
        uni.hideLoading()
        uni.redirectTo({
          url: '/pages/order/success'
        })
      }, 1500)
    }
  }
}
</script>

<style>
.order-confirmation {
  padding-bottom: 100px;
}
.total-footer {
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
}
</style>