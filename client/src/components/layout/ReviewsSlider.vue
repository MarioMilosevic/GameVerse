<template>
  <article class="border border-white relative px-12 flex flex-col gap-4">
    <h2 class="uppercase text-red-600 text-center text-3xl">Reviews</h2>

    <div class="border border-white flex items-end gap-2">
      <fieldset class="w-[50px]">
        <img
          :src="profileImg"
          class="w-full"
        />
      </fieldset>
      <p>Joined on 20/03/2025</p>
    </div>
      <div class="border border-red-400 flex items-center justify-between">
        <p>Want to leave a review ?</p>
        <ActionButton>
          <template #content> Click here </template>
        </ActionButton>
      </div>
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
import ActionButton from "src/components/layout/ActionButton.vue";
import { profileImg } from "src/utils/constants";
// import FormBlock from "src/components/form/FormBlock.vue";
// import FormInput from "src/components/form/FormInput.vue";
</script>
