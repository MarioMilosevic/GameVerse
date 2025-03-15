<template>
  <form
    class="max-w-[400px] w-full bg-slate-800 mt-40 rounded-xl px-5 py-6 mx-auto flex flex-col gap-5"
  >
    <slot name="title" />
    <slot name="inputs" />
    <slot />
    <slot name="submit" />
    <slot name="text" />
  </form>
</template>
