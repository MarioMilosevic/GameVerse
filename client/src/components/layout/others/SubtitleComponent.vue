<template>
  <h2
    :class="[
      'uppercase text-sky-500 dark:text-white text-lg sm:text-3xl text-left',
      justifyOptions[props.justify],
    ]"
  >
    <slot />
  </h2>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

const justifyOptions = {
  start: "text-start",
  justify: "text-justify",
  center: "text-center",
  end: "text-end",
};

const props = defineProps({
  justify: {
    type: String as PropType<justifyType>,
    default: "center",
  },
});

type justifyType = keyof typeof justifyOptions;
</script>
