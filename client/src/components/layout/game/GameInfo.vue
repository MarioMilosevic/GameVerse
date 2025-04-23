<template>
  <div class="flex items-center border-b border-b-sky-300 dark:border-b-dark-dark-red pb-2">
    <h3 class="w-full max-w-[75px]">
      <slot name="title" />
    </h3>
    <p class="text-sm sm:text-base">
      <slot name="content" />
    </p>
  </div>
</template>
