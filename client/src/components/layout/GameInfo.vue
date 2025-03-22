<template>
  <div class="flex items-center gap-2 border-b border-b-dark-dark-red pb-2">
    <h3 class="w-1/4">
      <slot name="title" />
    </h3>
    <slot name="content" />
  </div>
</template>
