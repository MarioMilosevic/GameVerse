<template>
  <form
    class="bg-slate-900 relative h-full pt-16 pb-10 px-8 rounded-xl"
    @submit.prevent="submitReviewHandler"
  >
    <BaseIcon
      class="absolute top-2 right-2 cursor-pointer"
      size="big"
      @click="emits('close-modal-event')"
    >
      <XIcon />
    </BaseIcon>

    <div class="absolute -top-10 right-1/2 translate-x-1/2 w-[75px] h-[75px]">
      <v-icon
        class="transform absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transition-all duration-300"
        name="bi-star-fill"
        :scale="scale(5, 0.2)"
      />
      <h1
        class="text-red-500 text-3xl absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transition-all duration-300"
        :style="{ scale: scale(1, 0.02) }"
      >
        {{ gameReview.rating ?? "?" }}
      </h1>
    </div>

    <div class="flex flex-col gap-4 items-center w-[500px] px-20 mx-auto">
      <p class="text-red-500">RATE THIS</p>
      <h2 class="text-xl">{{ props.name }}</h2>
      <div class="flex items-center gap-1" @mouseleave="mouseLeaveHandler">
        <v-icon
          v-for="(star, index) in starsArray"
          class="cursor-pointer"
          :key="index"
          scale="1.3"
          :name="star === 'empty' ? 'bi-star' : 'bi-star-fill'"
          @mouseenter="mouseEnterHandler(index)"
          @click="ratingClickHandler(index)"
        />
      </div>
      <FormTextarea
        v-model="gameReview.content"
        placeholder="Your thoughts..."
        :max-characters="200"
      />
      <ActionButton
        type="submit"
        class="self-end"
        :disabled="!allFieldsCompleted"
      >
        <template #content> SEND REVIEW </template>
      </ActionButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseIcon from "src/icons/BaseIcon.vue";
import XIcon from "src/icons/XIcon.vue";
import FormTextarea from "src/components/form/FormTextarea.vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import useGetUserStore from "src/composables/useGetUserStore";
import { ref, computed } from "vue";
import { emptyStarsArray } from "src/utils/constants";
import { GameReviewType } from "src/utils/types";
import { gameReviewSchema } from "src/schemas/gameReview";
import { createReview } from "src/api/reviews";

const props = defineProps({
  rating: {
    type: Number,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  gameId: {
    type: Number,
    required: true,
  },
});

const { user } = useGetUserStore();

const gameReview = ref<GameReviewType>({
  rating: props.rating ?? null,
  content: props.content ?? "",
});

const allFieldsCompleted = computed(() => {
  return gameReviewSchema.safeParse(gameReview.value).success;
});

const scale = (scale: number, increment: number) => {
  if (gameReview.value.rating) {
    scale += gameReview.value.rating * increment;
  }
  return scale;
};

const starsArray = ref<string[]>([...emptyStarsArray]);

const emits = defineEmits(["close-modal-event", 'submit-event']);

const ratingClickHandler = (rating: number) => {
  fillStars(rating);
  gameReview.value.rating = rating + 1;
};

const mouseEnterHandler = (rating: number) => {
  fillStars(rating);
};

const mouseLeaveHandler = () => {
  if (!gameReview.value.rating) {
    starsArray.value = [...emptyStarsArray];
  } else {
    fillStars(gameReview.value.rating - 1);
  }
};

const fillStars = (index: number) => {
  for (let i = 0; i < starsArray.value.length; i++) {
    starsArray.value[i] = i <= index ? "fill" : "empty";
  }
};

const submitReviewHandler = async () => {
  if (user.value.id) {
    const review = {
      userId: user.value.id,
      gameId: props.gameId,
      rating: gameReview.value.rating,
      content:gameReview.value.content
    }
    const data = await createReview(review)
    console.log(data)
    emits('submit-event', data)
  };
}
</script>
