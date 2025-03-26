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
      <span class="flex items-center gap-1">
        <v-icon name="co-moon" />
        Dark mode
        <ToggleSwitch
          v-model="darkModeOn"
          @update:model-value="handleDarkMode"
        />
      </span>
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
import { ref, PropType } from "vue";

const emits = defineEmits(["sign-out-event", "toggle-theme-event"]);

const props = defineProps({
  theme: {
    type: String as PropType<"light" | "dark">,
    required: true,
  },
});
const darkModeOn = ref<boolean>(props.theme === "dark" ? true : false);

const handleDarkMode = (value: boolean) => {
  darkModeOn.value = value;
  emits("toggle-theme-event", value);
};
</script>
