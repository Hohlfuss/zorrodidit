<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
    
   <!-- New v4 syntax -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl shadow-blue-900/20 w-full max-w-md border border-slate-800 relative z-10">
      
      <div class="flex flex-col items-center mb-8">
        <div class="w-14 h-14 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/30">
          <span class="text-blue-500 text-2xl font-black">Z</span>
        </div>
        <h2 class="text-2xl text-white font-bold tracking-wide">Zorro did it!</h2>
      </div>
      
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-950/50 border border-red-500/50 text-red-200 rounded-lg text-sm text-center">
        {{ errorMessage }}
      </div>

      <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg">
        <h2 class="text-xl font-bold mb-4">Sign In</h2>

        <input v-model="payload.username" type="text" placeholder="Username" class="w-full p-2 mb-2 border rounded" />
        <input v-model="payload.password" type="password" placeholder="********" class="w-full p-2 mb-4 border rounded" />

        <button
          @click="handleLogin"
          :disabled="isSubmitting"
          class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
        {{ isSubmitting ? "Signing in..." : "Sign In" }}
        </button>

        <p v-if="errorMessage" class="text-red-500 mt-2 text-sm">{{ errorMessage }}</p>
      </div>
      <p class="mt-4 text-center">
        Dont have an account? 
        <router-link to="/register" class="text-blue-500">Sign up here</router-link>
      </p>
    </div>
  </div>
</template>


<template>
  <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg">
    <h2 class="text-xl font-bold mb-4">Sign In</h2>

    <input v-model="payload.username" type="text" placeholder="Username" class="w-full p-2 mb-2 border rounded" />
    <input v-model="payload.password" type="password" placeholder="********" class="w-full p-2 mb-4 border rounded" />

    <button
      @click="handleLogin"
      :disabled="isSubmitting"
      class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
    {{ isSubmitting ? "Signing in..." : "Sign In" }}
    </button>

    <p v-if="errorMessage" class="text-red-500 mt-2 text-sm">{{ errorMessage }}</p>
  </div>
  <p class="mt-4 text-center">
    Dont have an account? 
    <router-link to="/register" class="text-blue-500">Sign up here</router-link>
  </p>
</template>

<script setup>

import { reactive, ref } from "vue";

const payload = reactive({ username: "", password: ""});
const errorMessage = ref("");
const isSubmitting = ref(false);

const handleLogin = async () => {
  errorMessage.value = "";
  isSubmitting.value = true;

  try {
    const response = await fetch("https://zorrodidit-backend.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      errorMessage.value = data.message || "Login failed";
      return;
    }

    console.log("Login Succesfull Token: ", data.token);
  } catch (error) {
    errorMessage.value = "Network error. Please try again later.";
  } finally {
    isSubmitting.value = false;
  }
}

</script>