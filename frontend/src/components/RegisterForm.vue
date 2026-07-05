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

      <form @submit.prevent="handleRegister" class="space-y-5">
        
        <div>
          <label class="block text-slate-300 text-sm mb-1.5 ml-1" for="username">Username</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-slate-500 text-lg">@</span>
            </div>
            <input
              id="username"
              v-model="payload.username"
              type="text"
              class="w-full pl-10 p-3 bg-slate-950/50 border border-slate-800 text-white rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
              placeholder="Username"
            />
          </div>
        </div>

        <div>
          <label class="block text-slate-300 text-sm mb-1.5 ml-1" for="password">Password</label>
          <div class="relative">
             <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-slate-500 text-lg">🔑</span>
            </div>
            <input 
              id="password"
              v-model="payload.password"
              type="password"
              class="w-full pl-10 p-3 bg-slate-950/50 border border-slate-800 text-white rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
              placeholder="••••••••"
            />              
          </div>
        </div>

        <div>
          <label class="block text-slate-300 text-sm mb-1.5 ml-1" for="confirmPassword">Confirm Password</label>
          <div class="relative">
             <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-slate-500 text-lg">✓</span>
            </div>
            <input 
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              class="w-full pl-10 p-3 bg-slate-950/50 border border-slate-800 text-white rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-slate-600"
              placeholder="••••••••"
            />              
          </div>
          <p v-if="payload.password && confirmPassword" class="text-xs mt-2 ml-1" :class="payload.password === confirmPassword ? 'text-green-400' : 'text-red-400'">
            {{ payload.password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match' }}
          </p>
        </div>

        <!-- New v4 syntax -->
        <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full mt-6 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl transition-all font-bold tracking-wide shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 border border-blue-400/50"
        >
          {{ isSubmitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT" }}
        </button>
      </form>

      <p class="mt-8 text-slate-400 text-sm text-center">
        Already a member?
        <a href="#" class="text-blue-400 hover:text-blue-300 hover:underline transition-colors">Sign In</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { reactive } from "vue";

const payload = reactive({
  username: "",
  password: ""
});
const confirmPassword = ref("");
const errorMessage = ref("");
const isSubmitting = ref(false);
//const payload = { username: username.value, password: password.value };

const handleRegister = async () => {
  errorMessage.value = "";
  isSubmitting.value = true;

  if (!payload.username || !payload.password || !confirmPassword.value) {
    errorMessage.value = "Please fill all fields.";
    isSubmitting.value = false;
    return;
  }

  if (payload.password !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match.";
    isSubmitting.value = false;
    return;
  }

  console.log("Sending payload:", JSON.stringify(payload));
  
  try {
    const response = await fetch("https://zorrodidit-backend.onrender.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      errorMessage.value = data.message  || "Registeration failed";

      payload.username = "";
      payload.password = "";

      return;
    }

    console.log("User created successfully: ", data);

  } catch(error) {
    errorMessage.value = "An network error occured. Please try again later.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>