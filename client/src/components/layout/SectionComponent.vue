<template>
  <section class="max-w-[1280px] mx-auto py-8 grid grid-cols-2 gap-12">
    <h1 class="text-5xl text-center col-start-1 col-end-3" v-if="$slots.title">
      <slot name="title" />
    </h1>
    <slot name="main" />
    <slot name="submain" v-if="$slots.footer"/>
  </section>
</template>
