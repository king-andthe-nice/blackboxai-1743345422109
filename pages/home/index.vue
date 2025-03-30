<template>
  <div class="home">
    <!-- Search Bar -->
    <div class="search-bar p-4 bg-white sticky top-0 z-10">
      <div class="flex items-center bg-gray-100 rounded-full px-4 py-2">
        <i class="fas fa-search text-gray-500 mr-2"></i>
        <input 
          type="text" 
          placeholder="搜索餐厅或美食..."
          class="bg-transparent w-full outline-none text-sm"
          v-model="searchQuery"
          @focus="showSearchResults = true"
        >
      </div>
      <div v-if="showSearchResults" class="search-results mt-2 bg-white rounded-lg shadow-lg p-2">
        <div class="p-2 border-b" v-for="result in searchResults" :key="result.id">
          {{ result.name }}
        </div>
      </div>
    </div>

    <!-- Banner -->
    <swiper class="banner-swiper" :autoplay="true" :interval="3000">
      <swiper-item v-for="(banner, index) in banners" :key="index">
        <image :src="banner.image" mode="aspectFill" class="w-full h-40" />
      </swiper-item>
    </swiper>

    <!-- Restaurant Categories -->
    <div class="categories p-4 bg-white">
      <h3 class="text-lg font-semibold mb-3">美食分类</h3>
      <div class="grid grid-cols-4 gap-3">
        <div v-for="category in categories" :key="category.id" 
             class="text-center" @click="navigateToCategory(category.id)">
          <div class="w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
            <i :class="category.icon" class="text-xl text-red-500"></i>
          </div>
          <p class="text-xs mt-1">{{ category.name }}</p>
        </div>
      </div>
    </div>

    <!-- Nearby Restaurants -->
    <div class="restaurants p-4">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-lg font-semibold">附近餐厅</h3>
        <span class="text-sm text-red-500" @click="navigateToRestaurants">查看全部</span>
      </div>
      <div class="grid gap-4">
        <div v-for="restaurant in nearbyRestaurants" :key="restaurant.id" 
             class="bg-white rounded-lg overflow-hidden shadow-sm" @click="navigateToMenu(restaurant.id)">
          <image :src="restaurant.image" mode="aspectFill" class="w-full h-32" />
          <div class="p-3">
            <h4 class="font-medium">{{ restaurant.name }}</h4>
            <div class="flex items-center mt-1">
              <span class="text-yellow-400 text-xs">
                <i class="fas fa-star"></i> {{ restaurant.rating }}
              </span>
              <span class="text-gray-500 text-xs ml-2">{{ restaurant.deliveryTime }}分钟</span>
              <span class="text-gray-500 text-xs ml-2">¥{{ restaurant.deliveryFee }}配送费</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      showSearchResults: false,
      banners: [
        { image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' },
        { image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg' }
      ],
      categories: [
        { id: 1, name: '中餐', icon: 'fas fa-utensils' },
        { id: 2, name: '西餐', icon: 'fas fa-hamburger' },
        { id: 3, name: '日料', icon: 'fas fa-fish' },
        { id: 4, name: '甜品', icon: 'fas fa-ice-cream' }
      ],
      nearbyRestaurants: [
        {
          id: 1,
          name: '川味居',
          image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
          rating: 4.8,
          deliveryTime: 30,
          deliveryFee: 5
        },
        {
          id: 2,
          name: '汉堡王',
          image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
          rating: 4.5,
          deliveryTime: 25,
          deliveryFee: 3
        }
      ],
      searchResults: [
        { id: 1, name: '川味居' },
        { id: 2, name: '汉堡王' }
      ]
    }
  },
  methods: {
    navigateToCategory(categoryId) {
      uni.navigateTo({
        url: `/pages/restaurants/index?categoryId=${categoryId}`
      })
    },
    navigateToRestaurants() {
      uni.navigateTo({
        url: '/pages/restaurants/index'
      })
    },
    navigateToMenu(restaurantId) {
      uni.navigateTo({
        url: `/pages/menu/index?id=${restaurantId}`
      })
    }
  }
}
</script>

<style>
.search-results {
  max-height: 200px;
  overflow-y: auto;
}
</style>