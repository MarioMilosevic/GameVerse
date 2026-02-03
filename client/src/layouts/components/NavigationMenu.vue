<template>
  <button class="lg:hidden cursor-pointer z-50" @click="toggleOpen">
    <v-icon :name="isOpened ? 'md-close' : 'co-hamburger-menu'" />
  </button>
  <div v-if="isOpened" class="lg:hidden fixed inset-0 bg-black/80 z-30" @click="toggleOpen" />
  <ul
    :class="[
      'z-40 text-xs sm:text-base flex',
      'lg:flex-row lg:gap-2 lg:static lg:w-full lg:rounded-xl lg:bg-transparent lg:translate-x-0',
      'fixed top-0 right-0 h-full w-full flex-col gap-4 p-6 transition-transform duration-300 ease-in-out max-lg:bg-white max-lg:dark:bg-gray-900',
      isOpened ? 'translate-x-0' : 'max-lg:translate-x-full',
    ]"
  >
    <Logo class="lg:hidden" />
    <NavigationLink v-for="(link, index) in navLinks" :key="index" @click="handleNav(link)">
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
import Logo from "@/shared/components/Logo.vue";
import { computed, ref } from "vue";

const isOpened = ref<boolean>(false);

const emits = defineEmits(["navigation"]);

const props = defineProps<{ theme: ThemeType }>();

const { user } = useGetUserStore();

const navLinks = computed<navLinkType[]>(() => createNavLinks(props.theme, user.value));

const handleNav = (link: navLinkType) => {
  isOpened.value = false;
  emits("navigation", link);
};

const toggleOpen = () => {
  isOpened.value = !isOpened.value;
};
</script>
