<template>
  <table class="bg-slate-100 dark:bg-slate-800 flex flex-col gap-4 p-8">
    <slot name="title" />
    <slot name="header"/>
    <slot name="head" />
    <slot name="data" />
  </table>
</template>
