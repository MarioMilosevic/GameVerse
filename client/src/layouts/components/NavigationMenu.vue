<template>
  <ul
    class="hidden lg:flex sm:gap-2 z-20 w-full rounded-xl text-xs sm:text-base"
  >
    <!-- TODO: have only 1 event for NavigationMenu, and in parent control according what is parameter what will be called -->

    <NavigationLink
      v-for="(link, index) in navLinks"
      :key="index"
      @click="handleNav(link)"
    >
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
import type { ThemeType } from "@/stores/theme/types";
import type { navLinkType } from "@/layouts/types/index";
import { computed } from "vue";

const emits = defineEmits(["navigation"]);

const props = defineProps<{
  theme: ThemeType;
}>();

const { user } = useGetUserStore();

const navLinks = computed<navLinkType[]>(() =>
  createNavLinks(props.theme, user.value),
);

const handleNav = (link: navLinkType) => {
  emits("navigation", link);
};
</script>
