<template>
  <ul
    class="flex flex-col mt-8 gap-2 list-none bg-slate-700 z-20 w-full rounded-md transition-all duration-300"
  >
    <NavigationLink>
      <v-icon name="md-dashboardcustomize" />
      Dashboard</NavigationLink
    >
    <NavigationLink>
      <v-icon name="md-accountbox" />
      Account
    </NavigationLink>
    <NavigationLink>
      <v-icon name="md-ratereview" />
      My reviews
    </NavigationLink>
    <NavigationLink>
      <v-icon name="co-moon" />
      Dark mode
      <ToggleSwitch :v-model="true"/>
    </NavigationLink>
    <NavigationLink @click="emits('sign-out-event')">
      <v-icon name="gi-exit-door" />
      Log out
    </NavigationLink>
  </ul>
</template>

<script setup lang="ts">
import NavigationLink from "src/components/layout/navigation/NavigationLink.vue";
import ToggleSwitch from "src/components/layout/others/ToggleSwitch.vue";

const emits = defineEmits(["sign-out-event"]);
</script>
