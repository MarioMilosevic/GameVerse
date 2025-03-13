<template>
  <LoadingSpinner v-if="loading" />
  <SingleGame v-else :single-game="singleGame"/>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { getSingleGame } from "src/api/games";
import { onBeforeMount, ref } from "vue";
import { GameType } from "src/utils/types";
import { showToast } from "src/utils/toast";
import { useLoadingStore } from "src/stores/loadingStore";
import { storeToRefs } from "pinia";
import SingleGame from "src/components/layout/SingleGame.vue";
import LoadingSpinner from "src/components/layout/LoadingSpinner.vue";


onBeforeMount(async () => {
  try {
    loadingStore.setLoading(true)
    const { message, data } = await getSingleGame(Number(route.params.id));
    if (message) {
      showToast(message, "error");
    } else {
      console.log(data);
      singleGame.value = data;
    }
  } catch (error) {
    showToast("Unexpected error occured", "error");
    console.error(error);
  } finally {
    loadingStore.setLoading(false);
  }
});

const loadingStore = useLoadingStore();
const { loading } = storeToRefs(loadingStore);

const route = useRoute();

const singleGame = ref<GameType>({} as GameType);


</script>

<!-- 

In a LinkedIn quick apply I came across this question "How many years of work experience do you have with Application Programming Interfaces (API)?" - this as akin to asking how long have you been breathing. If you have done any sort of software development then you have been working with APIs. Maybe they meant with specific types of API like REST, SOAP or GraphQL but it looks like they don't have a clue about what they are asking

-->
