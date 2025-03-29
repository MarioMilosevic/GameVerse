<template>
  <p class="text-justify border p-4 rounded-2xl">{{ content }}</p>
  <p class="pl-4 self-start text-sm">
    Reviewed on {{ formattedDate(createdAt as string) }}
  </p>

  <div class="flex w-full justify-between">
    <ActionButton color="green" @click="emits('edit-event')">Edit Review</ActionButton>
    <ActionButton>Delete Review</ActionButton>
  </div>
</template>

<script setup lang="ts">
import { formattedDate } from "src/utils/helpers";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";

defineProps({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: false,
  },
});

const emits = defineEmits(['edit-event'])
</script>
