<template>
  <ul
    class="flex flex-col sm:gap-2 list-none bg-slate-300 dark:bg-slate-700 z-20 w-full rounded-md text-xs sm:text-base"
  >
    <NavigationLink v-if="user.role === 'ADMIN'" @click="emits('dashboard-event')">
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

    <NavigationLink>
      <template #default>
        <v-icon name="co-moon" />
      </template>

      <template #text>
        <p class="flex items-center gap-2">
            Dark mode
          <ToggleSwitch
            v-model="darkModeOn"
            @update:model-value="handleDarkMode"
          />
        </p>
      </template>
    </NavigationLink>

    <NavigationLink @click="emits('sign-out-event')">
      <template #default>
        <v-icon name="gi-exit-door" />
      </template>

      <template #text> Log out </template>
    </NavigationLink>
  </ul>
</template>

<script setup lang="ts">
import NavigationLink from "src/components/layout/navigation/NavigationLink.vue";
import ToggleSwitch from "src/components/layout/others/ToggleSwitch.vue";
import useGetUserStore from "src/composables/useGetUserStore";
import { ref, PropType } from "vue";

const emits = defineEmits(["sign-out-event", "toggle-theme-event", 'my-reviews-event', 'account-event', 'dashboard-event']);

const {user} = useGetUserStore()

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
