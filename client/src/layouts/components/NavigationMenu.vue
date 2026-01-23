<template>
  <ul
    class="hidden lg:flex sm:gap-2 z-20 w-full rounded-xl text-xs sm:text-base"
  >
    <!-- TODO: have only 1 event for NavigationMenu, and in parent control according what is parameter what will be called -->

    <NavigationLink v-for="(link, index) in navLinks" :key="index">
      <template #default>
        <v-icon :name="link.icon" />
      </template>
      <template #text>{{ link.text }}</template>
    </NavigationLink>
  </ul>
</template>

<script setup lang="ts">
import NavigationLink from "@/layouts/components/NavigationLink.vue";
import useGetUserStore from "@/composables/useGetUserStore";
import { createNavLinks } from "@/layouts/constants/navigation";
import { ref } from "vue";
import type { ThemeType } from "@/stores/theme/types";
import type { navLinkType } from "@/layouts/types/index";

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

const navLinks = ref<navLinkType[]>(createNavLinks(props.theme, user.value));
</script>
