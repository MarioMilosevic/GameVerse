<template>
  <div class="flex flex-col items-center gap-2">
    <p>
      {{ accountText }} have an account?
      <router-link
        :to="{ name: text }"
        class="no-underline cursor-pointer text-sky-100 dark:text-red-600"
      >
        {{ text }}
      </router-link>
    </p>
    <p v-if="text !== 'Login'">
      Or,
      <span
        class="text-sky-100 no-underline cursor-pointer dark:text-red-600"
        @click="emits('guest-event')"
        >log in as guest</span
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["guest-event"]);

const accountText = computed(() => {
  return props.text === "Login" ? "Already" : "Don't";
});
</script>
