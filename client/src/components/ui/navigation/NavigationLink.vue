<template>
  <li
    class="cursor-pointer rounded-xl p-1 sm:p-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 flex items-center gap-2"
  >
    <slot />
    <slot name="text" />
  </li>
</template>
