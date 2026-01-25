<template>
  <Teleport to="body" v-if="isDeleteOpen">
    <BaseOverlay>
      <BaseModal
        class="bg-slate-200 dark:bg-slate-900 flex flex-col items-center pb-10 justify-end rounded-xl"
      >
        <BaseIcon
          :style="{ width: '5rem', height: '5rem' }"
          class="absolute top-[1%] right-1/2 translate-x-1/2"
        >
          <XCircle />
        </BaseIcon>
        <div
          class="flex flex-col gap-4 sm:gap-8 items-center pt-24 px-8 w-[350px]"
        >
          <h1 class="text-2xl sm:text-4xl text-justify">Are you sure ?</h1>
          <p class="text-base sm:text-lg">
            Do you really want to delete {{ content }}? This action cannot be
            undone
          </p>
          <div class="flex justify-between w-full">
            <Button color="green" @click="emits('close-modal-event')"
              >Cancel</Button
            >
            <Button @click="emits('delete-event', user?.id)">Confirm</Button>
          </div>
        </div>
      </BaseModal>
    </BaseOverlay>
  </Teleport>
</template>

<script setup lang="ts">
import BaseOverlay from "@/shared/components/BaseOverlay.vue";
import BaseModal from "@/shared/components/BaseModal.vue";
import Button from "@/shared/components/Button.vue";
import BaseIcon from "@/shared/icons/BaseIcon.vue";
import XCircle from "@/shared/icons/XCircle.vue";
import { PropType, computed } from "vue";
import { UserType } from "@/utils/types";

const props = defineProps({
  isDeleteOpen: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Object as PropType<UserType | null>,
    required: false,
    default: null,
  },
});

const emits = defineEmits(["close-modal-event", "delete-event"]);

const content = computed(() => {
  return props.user?.fullName ?? "your review";
});
</script>
