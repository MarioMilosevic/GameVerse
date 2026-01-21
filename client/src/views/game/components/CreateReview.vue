<template>
  <MainRatingStar :rating="rating" />
  <RatingStars
    :stars-array="starsArray"
    @mouse-enter-event="mouseEnterEvent"
    @mouse-leave-event="mouseLeaveEvent"
    @click-event="clickEvent"
  />
  <FormTextarea v-model="content" />
  <Button type="submit" class="self-end" :disabled="!allFieldsCompleted">
    SEND REVIEW
  </Button>
</template>

<script setup lang="ts">
import RatingStars from "@/views/game/components/RatingStars.vue";
import FormTextarea from "@/shared/components/form/FormTextarea.vue";
import Button from "@/shared/components/Button.vue";
import MainRatingStar from "@/views/game/components/MainRatingStar.vue";
import { PropType, computed } from "vue";

const props = defineProps({
  allFieldsCompleted: {
    type: Boolean,
    required: true,
  },
  starsArray: {
    type: Array as PropType<String[]>,
    required: true,
  },
  rating: {
    type: [Number, null],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const content = computed({
  get: () => props.content,
  set: (value) => emits("update:content", value),
});

const rating = computed({
  get: () => props.rating,
  set: (value) => emits("update:rating", value),
});

const emits = defineEmits([
  "mouse-leave-event",
  "mouse-enter-event",
  "click-event",
  "update:content",
  "update:rating",
]);

const clickEvent = (index: number) => {
  emits("click-event", index);
};
const mouseEnterEvent = (index: number) => {
  emits("mouse-enter-event", index);
};
const mouseLeaveEvent = () => {
  emits("mouse-leave-event");
};
</script>
