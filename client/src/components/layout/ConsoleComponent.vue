<template>
    <img :src="props.image" :alt="props.image" class="w-[30px] text-white" />
     <!-- <svg :xmlns="props.image" fill="white" view-box="0 0 24 24" stroke-width="1.5" stroke="white">
      <path
      stroke-linecap="round"
      stroke-linejoin="round"
    />

     </svg> -->
</template>

<script setup lang="ts">



const props = defineProps({
  image: {
    type: String,
    required: true,
  },
});

console.log(props.image)
</script>
