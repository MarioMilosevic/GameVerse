<template>
  <article class="border border-white relative">
    <h2 class="uppercase text-red-600 text-center text-3xl">Reviews</h2>
    <BaseIcon class="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer">
      <LeftIcon />
    </BaseIcon>
    <BaseIcon class="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer">
      <RightIcon />
    </BaseIcon>
  </article>
</template>

<script setup lang="ts">
import BaseIcon from "src/icons/BaseIcon.vue";
import LeftIcon from "src/icons/LeftIcon.vue";
import RightIcon from "src/icons/RightIcon.vue";
</script>
