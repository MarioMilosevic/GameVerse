<template>
  <div class="flex items-center gap-2">
    <v-icon name="co-star" />
    <h3>
      Rated
      <span class="font-semibold"> {{ rating }} </span>/10
    </h3>
  </div>
</template>

<script setup lang="ts">
defineProps({
  rating: {
    type: [Number, String],
    required: true,
  },
});
</script>
