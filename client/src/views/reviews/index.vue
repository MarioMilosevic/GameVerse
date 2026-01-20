<template>
  <LoadingSpinner v-if="loading" />
  <MyReviews :reviews="myReviews" v-else />
</template>

<script setup lang="ts">
import LoadingSpinner from "@/components/ui/others/LoadingSpinner.vue";
import useGetLoadingStore from "@/composables/useGetLoadingStore";
import MyReviews from "@/components/ui/review/MyReviews.vue";
import useGetUserStore from "@/composables/useGetUserStore";
import { getUserReviews } from "@/api/users";

import { onBeforeMount, ref } from "vue";
import { MyReviewType } from "@/utils/types";
import { showToast } from "@/utils/toast";

const myReviews = ref<MyReviewType[]>([]);

const { loading, setLoading } = useGetLoadingStore();
const { user } = useGetUserStore();

onBeforeMount(async () => {
  try {
    setLoading(true);
    if (user.value.id) {
      const { data, message } = await getUserReviews(user.value.id);
      if (data) {
        myReviews.value = data;
      } else {
        showToast(message, "error");
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
});
</script>
