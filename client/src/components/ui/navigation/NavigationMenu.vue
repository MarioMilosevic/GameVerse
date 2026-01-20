<template>
  <ul
    class="flex sm:gap-2 bg-slate-300 dark:bg-slate-900 z-20 w-full rounded-xl text-xs sm:text-base"
  >
    <!-- <ul
    class="flex flex-col sm:gap-2 list-none bg-slate-300 dark:bg-slate-900 z-20 w-full rounded-b-xl text-xs sm:text-base first:rounded-t-none first:rounded-b-xl"
  > -->
    <!-- TODO: make v-for over array for these elements -->

    <NavigationLink @click="emits('toggle-theme-event')">
      <template #default>
        <ThemeIcon :theme="theme" />
      </template>
      <template #text>{{ text }}</template>
    </NavigationLink>

    <NavigationLink
      v-if="user.role === 'ADMIN'"
      @click="emits('dashboard-event')"
    >
      <template #default>
        <v-icon name="md-dashboardcustomize" />
      </template>
      <template #text> Dashboard </template>
    </NavigationLink>

    <NavigationLink @click="emits('account-event')">
      <template #default>
        <v-icon name="md-accountbox" />
      </template>
      <template #text> Account </template>
    </NavigationLink>

    <NavigationLink @click="emits('my-reviews-event')">
      <template #default>
        <v-icon name="md-ratereview" />
      </template>
      <template #text> My reviews </template>
    </NavigationLink>

    <NavigationLink @click="emits('sign-out-event')" class="hover:rounded-b-xl">
      <template #default>
        <v-icon name="gi-exit-door" />
      </template>

      <template #text> Log out </template>
    </NavigationLink>
  </ul>
</template>

<script setup lang="ts">
import NavigationLink from "@/components/ui/navigation/NavigationLink.vue";
import ThemeIcon from "@/icons/ThemeIcon.vue";
import useGetUserStore from "@/composables/useGetUserStore";
import type { ThemeType } from "@/stores/themeStore";
import { THEME_OPTIONS } from "@/constants/theme";
import { computed } from "vue";

const emits = defineEmits([
  "sign-out-event",
  "toggle-theme-event",
  "my-reviews-event",
  "account-event",
  "dashboard-event",
]);

const props = defineProps<{
  theme: ThemeType;
}>();

const { user } = useGetUserStore();

const isDark = computed(() => props.theme === THEME_OPTIONS.dark);
const text = computed(() => (isDark.value ? "Dark mode" : "Light mode"));
</script>
