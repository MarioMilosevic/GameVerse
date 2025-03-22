<template>
  <div class="relative w-[200px] h-[200px] border ">
    <BaseIcon class="absolute top-0 right-0" @click="emits('close-modal-event')">
      <XIcon />
    </BaseIcon>
  </div>
</template>

<script setup lang="ts">
import FormBlock from "src/components/form/FormBlock.vue";
import FormTextarea from "src/components/form/FormTextarea.vue";
import BaseIcon from "src/icons/BaseIcon.vue";
import XIcon from "src/icons/XIcon.vue";

const emits = defineEmits(['close-modal-event'])

</script>
