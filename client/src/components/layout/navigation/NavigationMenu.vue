<template>
  <ul class="flex flex-col gap-2 list-none bg-slate-700 z-20 w-full rounded-md">
    <NavigationLink>Dashboard</NavigationLink>
    <NavigationLink> Account </NavigationLink>
    <NavigationLink> My reviews </NavigationLink>
    <NavigationLink @click="emits('sign-out-event')"> Log out </NavigationLink>
  </ul>
</template>

<script setup lang="ts">
import NavigationLink from "src/components/layout/navigation/NavigationLink.vue";

const emits = defineEmits(['sign-out-event'])

</script>
