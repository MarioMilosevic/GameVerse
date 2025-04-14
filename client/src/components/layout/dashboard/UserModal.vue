<template>
  <OverlayComponent>
    <ModalComponent>
      <form class="bg-slate-200 w-full h-full p-16 relative">
        <BaseIcon
          size="very-big"
          class="absolute top-3 right-2 cursor-pointer"
          @click="emits('close-modal-event')"
        >
          <XIcon />
        </BaseIcon>
        <FormBlock>
          <template #label>
            <FormLabel id="name">Name</FormLabel>
          </template>
          <template #input>
            <FormInput />
          </template>
        </FormBlock>
      </form>
    </ModalComponent>
  </OverlayComponent>
</template>

<script setup lang="ts">
import OverlayComponent from "src/components/layout/others/OverlayComponent.vue";
import ModalComponent from "src/components/layout/others/ModalComponent.vue";
import FormLabel from "src/components/form/FormLabel.vue";
import FormInput from "src/components/form/FormInput.vue";
import FormBlock from "src/components/form/FormBlock.vue";
import BaseIcon from "src/icons/BaseIcon.vue";
import XIcon from "src/icons/XIcon.vue";

const emits = defineEmits(["close-modal-event"]);
</script>
