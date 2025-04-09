<template>
  <div class="flex flex-col gap-2">
    <label
      class="font-medium text-slate-950 dark:text-slate-50"
      for="file_input"
      >Upload file</label
    >
    <input
      class="block p-2 w-full text-sm dark:text-slate-900 border border-slate-300 rounded-lg cursor-pointer bg-slate-50 text-slate-500 focus:outline-none dark:bg-slate-200 dark:border-slate-200 dark:placeholder-slate-950"
      aria-describedby="file_input_help"
      id="file_input"
      type="file"
    />
    <p
      class="mt-1 text-sm text-slate-500 dark:text-slate-300"
      id="file_input_help"
    >
      SVG, PNG, JPG or GIF
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<!-- <input
      class="block p-2 w-full text-sm text-slate-900 border border-slate-300 rounded-lg cursor-pointer bg-slate-50 dark:text-slate-400 focus:outline-none dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"
      aria-describedby="file_input_help"
      id="file_input"
      type="file"
    /> -->
