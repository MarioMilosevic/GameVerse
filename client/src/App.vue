<template>
  <LoadingSpinner v-if="loading" />
  <SharedLayout v-else />
  <RouterView />
</template>

<script lang="ts" setup>
import LoadingSpinner from "src/components/layout/others/LoadingSpinner.vue";
import SharedLayout from "src/components/layout/navigation/SharedLayout.vue";
import useGetLoadingStore from "src/composables/useGetLoadingStore";

const { loading } = useGetLoadingStore();
</script>
