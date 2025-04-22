<template>
  <section class="max-w-[1280px] mx-auto py-16 grid grid-cols-2 gap-y-16 gap-x-12">
    <h1 class="text-5xl text-center col-start-1 col-end-3" v-if="$slots.title">
      <slot name="title" />
    </h1>
    <slot name="main" />
    <slot name="submain" v-if="$slots.submain"/>
  </section>
</template>
