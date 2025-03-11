<template>
  <nav class="flex justify-between px-8 absolute top-0 right-0 w-full bg-slate-900">
      <RouterLink :to="{ name: 'Home' }" class="flex items-center gap-4">
        <img src="/game-controller.png" />
        <h1 class="text-2xl">GameVerse</h1>
      </RouterLink>
    <div class="flex gap-4 items-center">
      <img src="/game-controller.png" />
      Mario
    </div>
  </nav>
</template>

<script setup lang="ts"></script>
