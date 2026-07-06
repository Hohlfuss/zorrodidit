<template>
  <div class="max-w-md mx-auto p-4 pt-20 relative z-10">
    
    <div class="flex items-center justify-between mb-8">
      <router-link to="/catalog" class="text-blue-400 hover:text-blue-300 flex items-center transition-colors font-semibold">
        <span class="mr-2">←</span> Back to Collection
      </router-link>
    </div>

    <div class="text-center mb-8">
      <h1 class="text-3xl font-black text-white tracking-wide">🍄 Mushrooms</h1>
      <p class="text-slate-400 mt-1">Swipe to flip the pages</p>
    </div>

    <swiper
      :effect="'flip'"
      :grabCursor="true"
      :pagination="true"
      :navigation="true"
      :modules="modules"
      class="w-full aspect-3/4 rounded-2xl shadow-2xl shadow-blue-900/20"
    >
      <swiper-slide 
        v-for="item in items" 
        :key="item.id" 
        class="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden flex flex-col"
      >
        <div class="h-2/3 w-full bg-slate-800/50 flex items-center justify-center text-7xl relative shadow-inner">
          
          <img v-if="item.image" :src="item.image" class="w-full h-full object-contain" :alt="item.title" />
          
          <div class="absolute top-4 right-4 bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-slate-700">
            {{ item.date }}
          </div>
        </div>

        <div class="h-1/3 p-6 flex flex-col justify-center border-t border-slate-800">
          <h2 class="text-xl font-bold text-white mb-2">{{ item.title }}</h2>
          <p class="text-slate-400 text-sm mb-3 line-clamp-2">{{ item.description }}</p>
          <div class="text-xs text-blue-400 font-mono tracking-widest uppercase">
            {{ item.material }}
          </div>
        </div>
      </swiper-slide>
    </swiper>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 1. Import Swiper Vue components
import { Swiper, SwiperSlide } from 'swiper/vue';

// 2. Import Swiper styles (Crucial for the 3D math and layout to work)
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 3. Import the specific modules we want to use
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';

// sienet
import sieni1 from "../assets/sienet/sieni1.png";
import sieni2 from "../assets/sienet/sieni2.png";
import sieni3 from "../assets/sienet/sieni3.png";
import sieni4 from "../assets/sienet/sieni4.png";

// Tell the Swiper component to use these modules
const modules = [EffectFlip, Pagination, Navigation];

// 4. Our temporary database
const items = ref([
  {
    id: 1,
    title: "Curly greenhat",
    description: "white base and long green curly hat.",
    material: "cotton and acrylic",
    date: "5.5.2026",
    image: sieni1
  },
  {
    id: 2,
    title: "Keychain redhat",
    description: "A small mushroom attached to a keychain.",
    material: "cotton and acrylic",
    date: "4.5.2026",
    image: sieni2
  },
  {
    id: 3,
    title: "Mushroom 3",
    description: "White cotton base and red acrylic hat.",
    material: "cotton and acrylic",
    date: "18.3.2026",
    image: sieni3
  },
  {
    id: 4,
    title: "self of mushrooms",
    description: "a bunch of mushrooms i made",
    material: "mix",
    image: sieni4
  }
]);
</script>

<style>
/* A tiny bit of custom CSS to make Swiper's default blue dots match your theme */
.swiper-pagination-bullet-active {
  background-color: #3b82f6 !important; /* Tailwind blue-500 */
}
.swiper-button-next,
.swiper-button-prev {
  color: #3b82f6 !important;
  transform: scale(0.7); /* Makes the arrows a bit more elegant */
}
</style>