<template>
  <div class="max-w-md mx-auto p-2 pt-5 relative z-10">
    
    <div class="flex items-center justify-between mb-2">
      <router-link to="/catalog" class="text-blue-400 hover:text-blue-300 flex items-center transition-colors font-semibold">
        <span class="mr-2 text-2xl">←</span> Back to Collection
      </router-link>
    </div>

    <div class="text-center mb-2">
      <h1 class="text-3xl font-black text-white tracking-wide">🍄 Mushrooms</h1>
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

        <div class="h-1/5 p-3 flex flex-col justify-center border-t border-slate-800">
          <h2 class="text-xl font-bold text-white mb-1">{{ item.title }}</h2>
          <p class="text-slate-400 text-sm mb-2 line-clamp-2">{{ item.description }}</p>
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
import sieni5 from "../assets/sienet/sieni5.png";
import sieni6 from "../assets/sienet/sieni6.png";
import sieni7 from "../assets/sienet/sieni7.png";

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
    date: "4.4.2026",
    image: sieni4
  },
  {
    id: 5,
    title: "3 hats",
    description: "3 mushrooms under construction",
    material: "mix",
    date: "28.3.2026",
    image: sieni5
  },
  {
    id: 6,
    title: "Cool colors",
    description: "2 mushrooms with different colors",
    material: "mix",
    date: "4.3.2026",
    image: sieni6
  },
  {
    id: 7,
    title: "white one",
    description: "White with a little black on the hat",
    material: "acrylic",
    date: "20.1.2026",
    image: sieni7
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