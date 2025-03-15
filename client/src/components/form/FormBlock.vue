<template>
  <fieldset
    class="relative border-none flex flex-col gap-2 items-center justify-between"
  >
    <slot name="label" />
    <slot name="input" />
    <slot name="line" />
    <span v-if="$slots.error" class="absolute -bottom-[30%] left-0">
      <slot name="error" />
    </span>
  </fieldset>
</template>
