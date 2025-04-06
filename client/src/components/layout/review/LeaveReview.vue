<template>
  <div
    class="border border-sky-500 dark:border-dark-dark-red flex items-center justify-between px-5 py-3 w-[90%] mx-auto rounded-2xl"
  >
    <p class="text-lg">Want to {{ hasReview }} review ?</p>
    <ActionButton @click="emits('open-modal-event')"> Click here </ActionButton>
  </div>
</template>

<script setup lang="ts">
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import { ReviewType } from "src/utils/types";
import { PropType, computed } from "vue";

const emits = defineEmits(["open-modal-event"]);

const props = defineProps({
  userReview: {
    type: Object as PropType<ReviewType | undefined>,
    required: false,
  },
});

const hasReview = computed(() => {
  return props.userReview?.id ? "edit your " : "leave a ";
});
</script>
