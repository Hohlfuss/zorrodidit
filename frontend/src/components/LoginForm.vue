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
</template>

<script setup>

import { reactive, ref } from "vue";

const payload = reactive({ username: "", password: ""});
const errorMessage = ref("");
const isSubmitting = ref("");

const handleLogin = async () => {
  errorMessage.value = "";
  isSubmitting.value = true;

  try {
    const response = await fetch("https://zorrodidit-backend.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type" : "application.json" },
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