<template>
  <main class="max-w-[1280px] mx-auto border mt-12">
    <LoadingSpinner v-if="loading"/>
    <AdminDashboard v-else/>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { getUsers } from "src/api/users";
import { showToast } from "src/utils/toast";
import useGetLoadingStore from "src/composables/useGetLoadingStore";
import LoadingSpinner from "src/components/layout/others/LoadingSpinner.vue";
import AdminDashboard from "src/components/layout/dashboard/AdminDashboard.vue";

const { loading, setLoading } = useGetLoadingStore();

onBeforeMount(async () => {
  try {
    setLoading(true)
    const { data, message } = await getUsers();
    if (data) {
      console.log(data);
    } else {
      showToast(message, "error");
    }
  } catch (error) {
    console.error(error);
  }
  finally {
    setLoading(false)
  }
});
</script>
