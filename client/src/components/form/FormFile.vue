<template>
  <input
    class="py-1 pl-2 w-full dark:text-slate-900 border border-slate-300 rounded-lg cursor-pointer bg-slate-50 text-slate-500 focus:outline-none dark:bg-slate-200 dark:border-slate-200 dark:placeholder-slate-950"
    aria-describedby="file_input_help"
    id="file_input"
    type="file"
    :value="props.file"
    @change="onFileChange"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  file: {
    type: [File, null],
    required: false,
  },
});

const emits = defineEmits(["file-event"]);

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target?.files?.[0];
  if (file) emits("file-event", file);
};
</script>
