<template>
    <LoadingSpinner v-if="loading"/>
    
</template>

<script setup lang="ts">
import LoadingSpinner from 'src/components/layout/others/LoadingSpinner.vue';
import useGetLoadingStore from "src/composables/useGetLoadingStore";

import { onBeforeMount, ref } from 'vue';
import { ReviewType } from 'src/utils/types';

const myReviews = ref<ReviewType[]>([])

const { loading, setLoading } = useGetLoadingStore();


onBeforeMount(() => {
    try {
        console.log('radi')
    } catch (error) {
        console.error(error)
    }
})

</script>
