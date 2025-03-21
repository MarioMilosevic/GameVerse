<template>
  <div
    class="z-10 w-full h-full fixed top-0 left-0"
    :style="{ backdropFilter: 'blur(3px)', backgroundColor: 'rgba(0,0,0,0.6)' }"
  >
    <slot />
  </div>
</template>
