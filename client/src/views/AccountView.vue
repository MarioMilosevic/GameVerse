<template>
  <main class="max-w-[1280px] p-8 mx-auto border mt-8 flex gap-4">
    <section class="w-1/3 flex flex-col gap-8">
      <img :src="user.image" :alt="user.image" class="h-[100px] w-[100px]" />
      <article class="flex flex-col gap-2">
        <SubtitleComponent justify="start">About You</SubtitleComponent>
        <p class="font-semibold">
          Full Name: <span class="font-normal">{{ user.fullName }}</span>
        </p>
        <p class="font-semibold">
          Email: <span class="font-normal">{{ user.email }}</span>
        </p>
        <p class="font-semibold">
          Member since:
          <span class="font-normal">{{ formattedDate(user.createdDate) }}</span>
        </p>
      </article>
    </section>
    <section class="border w-2/3">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ipsa ut
      dolor repellat accusantium quisquam iusto quis atque cupiditate
      perferendis recusandae iste beatae fugit nemo, optio quos id animi sed?
    </section>
  </main>
</template>

<script setup lang="ts">
import useGetUserStore from "src/composables/useGetUserStore";
import SubtitleComponent from "src/components/layout/others/SubtitleComponent.vue";
import { formattedDate } from "src/utils/helpers";

const { user } = useGetUserStore();

console.log(user.value);
</script>
