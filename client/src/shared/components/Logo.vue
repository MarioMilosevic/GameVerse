<template>
  <RouterLink :to="{ name: 'Home' }" class="flex items-center gap-4">
    <img :src="controllerImage" class="max-h-[20px] sm:max-h-[35px]" />
    <h1 class="sm:text-2xl text-lg">GameVerse</h1>
  </RouterLink>
</template>

<script setup lang="ts">
import controllerImage from "../../../public/controller.png";
</script>
