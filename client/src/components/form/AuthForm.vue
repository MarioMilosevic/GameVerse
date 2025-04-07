<template>
  <form
    ref="formRef"
    :class="[
      'max-w-[400px] w-full bg-slate-400 dark:bg-slate-800 mt-12 rounded-xl px-8 py-6 mx-auto flex flex-col gap-5 transition-all duration-700 origin-top',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
    ]"
  >
    <slot name="title" />
    <slot name="inputs" />
    <slot />
    <slot name="submit" />
    <slot name="text" />
  </form>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const isVisible = ref(false);
const formRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
    }
  );

  if (formRef.value) {
    observer.observe(formRef.value);
  }
});
</script>
