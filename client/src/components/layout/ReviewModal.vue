<template>
  <div class="bg-slate-900 relative h-full flex flex-col gap-4 pt-16 items-center">
    <BaseIcon
    class="absolute top-2 right-2 cursor-pointer"
    size="big"
      @click="emits('close-modal-event')"
    >
      <XIcon/>
    </BaseIcon>
    <v-icon class="absolute -top-18 right-1/2 translate-x-1/2" name="bi-star-fill" :scale="7" />
    <h1 class="text-red-500 text-3xl absolute -top-5 right-1/2 translate-x-1/2 ">10</h1>
    <p class="text-red-500 ">RATE THIS</p>
    <h2 class="text-xl">God of War</h2>
    <div class="flex items-center gap-1">
      <v-icon  v-for="n in 10" :key="n" scale="1.3" name="bi-star" @mouseover="ratingHandler(n);"/>
    </div>
  </div>
</template>

<script setup lang="ts">
// import FormBlock from "src/components/form/FormBlock.vue";
// import FormTextarea from "src/components/form/FormTextarea.vue";
import BaseIcon from "src/icons/BaseIcon.vue";
import XIcon from "src/icons/XIcon.vue";

const emits = defineEmits(["close-modal-event"]);

const ratingHandler = (rating:number) => {
  console.log(rating)

}

</script>
