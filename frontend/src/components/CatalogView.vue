<template>
  <div class="max-w-6xl mx-auto p-6 pt-20 relative z-10">
    
    <div class="text-center mb-16">
      <h1 class="text-4xl font-black text-white tracking-wide mb-3">The Collection</h1>
      <p class="text-slate-400 text-lg">Explore the handmade crochet gallery</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <router-link
        v-for="category in categories"
        :key="category.id"
        :to="`/category/${category.id}`"
        class="group block bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 text-center"
      >
        <div class="w-32 h-32 mx-auto mb-6 bg-slate-800/50 rounded-2xl flex items-center justify-center text-6xl shadow-inner group-hover:scale-110 transition-transform duration-300">
          {{ category.icon }}
        </div>

        <h2 class="text-2xl font-bold text-white mb-2">{{ category.title }}</h2>
        <p class="text-slate-400 text-sm">{{ category.description }}</p>
      </router-link>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// By putting the categories in an array, you can add 50 more folders later 
// without ever having to touch the HTML above!
const categories = ref([
  {
    id: 'mushrooms',
    title: 'Mushrooms',
    icon: '🍄',
    description: 'Handcrafted decorative toadstools.'
  },
  {
    id: 'headwear',
    title: 'Headwear',
    icon: '👒',
    description: 'Cozy beanies and summer hats.'
  },
  {
    id: 'bags',
    title: 'Bags',
    icon: '👜',
    description: 'Tote bags and stylish purses.'
  }
]);
</script>