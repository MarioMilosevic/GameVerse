<template>
  <div
    class="border border-dark-dark-red flex items-center justify-between px-5 py-3  rounded-2xl"
  >
    <p class="text-lg">Want to leave a review ?</p>
    <ActionButton @click="emits('open-modal-event')">
      <template #content> Click here </template>
    </ActionButton>
  </div>
</template>

<script setup lang="ts">
import ActionButton from "src/components/layout/ActionButton.vue";

const emits = defineEmits(["open-modal-event"]);
</script>
