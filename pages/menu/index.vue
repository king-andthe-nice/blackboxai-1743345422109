<template>
  <div class="menu-page">
    <!-- Restaurant Header -->
    <div class="restaurant-header bg-white p-4 sticky top-0 z-10">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold">{{ restaurant.name }}</h2>
        <i class="fas fa-star text-yellow-400">{{ restaurant.rating }}</i>
      </div>
      <div class="flex text-xs text-gray-500">
        <span class="mr-3">¥{{ restaurant.minOrder }}起送</span>
        <span class="mr-3">配送费¥{{ restaurant.deliveryFee }}</span>
        <span>{{ restaurant.deliveryTime }}分钟送达</span>
      </div>
    </div>

    <!-- Menu Content -->
    <div class="menu-content flex">
      <!-- Categories Sidebar -->
      <scroll-view class="category-sidebar w-20 bg-gray-50" scroll-y>
        <div v-for="category in categories" :key="category.id"
             class="category-item p-3 text-center border-b border-gray-100"
             :class="{ 'bg-white text-red-500': activeCategory === category.id }"
             @click="setActiveCategory(category.id)">
          {{ category.name }}
        </div>
      </scroll-view>

      <!-- Food Items -->
      <scroll-view class="food-items flex-1" scroll-y>
        <div v-for="category in categories" :key="category.id">
          <div class="category-title p-2 bg-gray-50 text-gray-500 text-sm">
            {{ category.name }}
          </div>
          <div v-for="item in category.items" :key="item.id" class="food-item p-3 bg-white border-b">
            <div class="flex">
              <image v-if="item.image" :src="item.image" class="w-16 h-16 rounded mr-3" mode="aspectFill" />
              <div class="flex-1">
                <h3 class="font-medium">{{ item.name }}</h3>
                <p class="text-xs text-gray-500 mt-1">{{ item.description }}</p>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-red-500 font-medium">¥{{ item.price }}</span>
                  <div class="quantity-control flex items-center">
                    <button class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                            @click.stop="decreaseQuantity(item)">
                      <i class="fas fa-minus text-xs"></i>
                    </button>
                    <span class="mx-2 text-sm">{{ cartItems[item.id] || 0 }}</span>
                    <button class="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"
                            @click.stop="increaseQuantity(item)">
                      <i class="fas fa-plus text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>

    <!-- Shopping Cart Footer -->
    <div class="cart-footer fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex items-center">
      <div class="cart-icon relative mr-3">
        <i class="fas fa-shopping-cart text-2xl text-gray-500"></i>
        <span v-if="totalQuantity > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {{ totalQuantity }}
        </span>
      </div>
      <div class="flex-1">
        <div class="text-sm font-medium">¥{{ totalPrice }}</div>
        <div class="text-xs text-gray-500">另需¥{{ remainingForFreeDelivery }}元起送</div>
      </div>
      <button class="bg-red-500 text-white px-4 py-2 rounded-full text-sm"
              :class="{ 'opacity-50': !canCheckout }"
              :disabled="!canCheckout"
              @click="goToCheckout">
        {{ canCheckout ? '去结算' : `还差¥${remainingForFreeDelivery}` }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurant: {
        id: 1,
        name: '川味居',
        rating: 4.8,
        minOrder: 20,
        deliveryFee: 5,
        deliveryTime: 30
      },
      activeCategory: 1,
      categories: [
        {
          id: 1,
          name: '招牌推荐',
          items: [
            {
              id: 101,
              name: '水煮鱼',
              description: '麻辣鲜香，鱼肉鲜嫩',
              price: 68,
              image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg'
            },
            {
              id: 102,
              name: '夫妻肺片',
              description: '麻辣爽口，牛杂鲜嫩',
              price: 38,
              image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg'
            }
          ]
        },
        {
          id: 2,
          name: '川味凉菜',
          items: [
            {
              id: 201,
              name: '口水鸡',
              description: '麻辣鲜香，鸡肉嫩滑',
              price: 32,
              image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg'
            }
          ]
        }
      ],
      cartItems: {}
    }
  },
  computed: {
    totalQuantity() {
      return Object.values(this.cartItems).reduce((sum, qty) => sum + qty, 0)
    },
    totalPrice() {
      return Object.entries(this.cartItems).reduce((sum, [id, qty]) => {
        const item = this.findItemById(parseInt(id))
        return sum + (item ? item.price * qty : 0)
      }, 0)
    },
    remainingForFreeDelivery() {
      return Math.max(0, this.restaurant.minOrder - this.totalPrice)
    },
    canCheckout() {
      return this.totalPrice >= this.restaurant.minOrder && this.totalQuantity > 0
    }
  },
  methods: {
    findItemById(id) {
      for (const category of this.categories) {
        const item = category.items.find(item => item.id === id)
        if (item) return item
      }
      return null
    },
    setActiveCategory(categoryId) {
      this.activeCategory = categoryId
    },
    increaseQuantity(item) {
      this.$set(this.cartItems, item.id, (this.cartItems[item.id] || 0) + 1)
    },
    decreaseQuantity(item) {
      if (this.cartItems[item.id] > 0) {
        this.$set(this.cartItems, item.id, this.cartItems[item.id] - 1)
      }
    },
    goToCheckout() {
      if (this.canCheckout) {
        uni.navigateTo({
          url: '/pages/order/confirm'
        })
      }
    }
  },
  onLoad(options) {
    // In a real app, we would fetch restaurant and menu data based on options.id
    console.log('Restaurant ID:', options.id)
  }
}
</script>

<style>
.menu-content {
  height: calc(100vh - 200px);
}
.category-sidebar {
  height: 100%;
}
.food-items {
  height: 100%;
}
.cart-footer {
  height: 60px;
}
</style>