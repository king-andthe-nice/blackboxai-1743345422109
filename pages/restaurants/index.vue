<template>
  <div class="restaurants-page">
    <!-- Header with back button -->
    <div class="header p-4 bg-white flex items-center sticky top-0 z-10">
      <i class="fas fa-arrow-left text-gray-500 mr-2" @click="goBack"></i>
      <h2 class="text-lg font-semibold">餐厅列表</h2>
    </div>

    <!-- Filter bar -->
    <div class="filter-bar bg-white p-3 flex overflow-x-auto">
      <div v-for="filter in filters" :key="filter.id" 
           class="filter-item px-3 py-1 mr-2 rounded-full text-sm"
           :class="{ 'bg-red-500 text-white': activeFilter === filter.id }"
           @click="setActiveFilter(filter.id)">
        {{ filter.name }}
      </div>
    </div>

    <!-- Restaurant list -->
    <div class="restaurant-list">
      <div v-for="restaurant in filteredRestaurants" :key="restaurant.id"
           class="restaurant-item bg-white p-4 mb-2 flex"
           @click="navigateToMenu(restaurant.id)">
        <image :src="restaurant.image" class="w-20 h-20 rounded-lg mr-3" mode="aspectFill" />
        <div class="restaurant-info flex-1">
          <div class="flex justify-between">
            <h3 class="font-medium">{{ restaurant.name }}</h3>
            <span class="text-xs text-gray-500">{{ restaurant.distance }}km</span>
          </div>
          <div class="flex items-center mt-1">
            <span class="text-yellow-400 text-xs">
              <i class="fas fa-star"></i> {{ restaurant.rating }}
            </span>
            <span class="text-gray-500 text-xs ml-2">月售{{ restaurant.monthlySales }}</span>
          </div>
          <div class="flex items-center mt-1">
            <span class="text-gray-500 text-xs">起送¥{{ restaurant.minOrder }}</span>
            <span class="text-gray-500 text-xs ml-2">配送费¥{{ restaurant.deliveryFee }}</span>
            <span class="text-gray-500 text-xs ml-2">{{ restaurant.deliveryTime }}分钟</span>
          </div>
          <div class="flex mt-2">
            <span v-for="tag in restaurant.tags" :key="tag"
                  class="text-xs px-1 mr-1 border border-gray-200 rounded text-gray-500">
              {{ tag }}
            </span>
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
      activeFilter: 1,
      filters: [
        { id: 1, name: '综合排序' },
        { id: 2, name: '距离最近' },
        { id: 3, name: '销量最高' },
        { id: 4, name: '评分最高' },
        { id: 5, name: '起送价最低' }
      ],
      restaurants: [
        {
          id: 1,
          name: '川味居',
          image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
          rating: 4.8,
          monthlySales: 1234,
          minOrder: 20,
          deliveryFee: 5,
          deliveryTime: 30,
          distance: 1.2,
          tags: ['川菜', '麻辣', '火锅'],
          categoryId: 1
        },
        {
          id: 2,
          name: '汉堡王',
          image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
          rating: 4.5,
          monthlySales: 856,
          minOrder: 15,
          deliveryFee: 3,
          deliveryTime: 25,
          distance: 0.8,
          tags: ['快餐', '汉堡', '薯条'],
          categoryId: 2
        },
        {
          id: 3,
          name: '寿司屋',
          image: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
          rating: 4.7,
          monthlySales: 765,
          minOrder: 30,
          deliveryFee: 8,
          deliveryTime: 35,
          distance: 1.5,
          tags: ['日料', '刺身', '寿司'],
          categoryId: 3
        }
      ],
      categoryId: null
    }
  },
  computed: {
    filteredRestaurants() {
      let filtered = [...this.restaurants]
      if (this.categoryId) {
        filtered = filtered.filter(r => r.categoryId === this.categoryId)
      }
      
      switch (this.activeFilter) {
        case 2: // 距离最近
          return filtered.sort((a, b) => a.distance - b.distance)
        case 3: // 销量最高
          return filtered.sort((a, b) => b.monthlySales - a.monthlySales)
        case 4: // 评分最高
          return filtered.sort((a, b) => b.rating - a.rating)
        case 5: // 起送价最低
          return filtered.sort((a, b) => a.minOrder - b.minOrder)
        default: // 综合排序
          return filtered
      }
    }
  },
  onLoad(options) {
    this.categoryId = options.categoryId ? parseInt(options.categoryId) : null
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    setActiveFilter(filterId) {
      this.activeFilter = filterId
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
.filter-item {
  white-space: nowrap;
  border: 1px solid #eee;
}
</style>