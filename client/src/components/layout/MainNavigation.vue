<template>
  <nav class="flex justify-between px-8">
    <header class="flex items-center gap-4">
      <RouterLink :to="{ name: 'Home' }">
        <img src="/game-controller.png" />
      </RouterLink>
      <h1 class="text-2xl ">GameVerse</h1>
    </header>
    <div class="flex gap-4 items-center">
        <img src="/game-controller.png"/>
        Mario
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>
