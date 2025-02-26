<template>
  <span class="border border-white flex gap-2 items-center">
    <BaseIcon>
      <slot name="icon" />
    </BaseIcon>
    <h4>
      <slot name="value" />
    </h4>
    <h4>
      <slot name="name" />
    </h4>
  </span>
</template>

<script setup lang="ts">
import BaseIcon from "src/icons/BaseIcon.vue";
</script>
