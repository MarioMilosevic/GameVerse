<template>
  <MainRatingStar :rating="editRating" />
  <RatingStars
    :stars-array="editingStarsArray"
    :cursor-pointer="true"
    @mouse-enter-event="mouseEnterEvent"
    @mouse-leave-event="mouseLeaveEvent"
    @click-event="clickEvent"
  />
  <FormTextarea v-model="localValue" />
  <div class="w-full flex justify-between">
    <ActionButton type="submit" color="green">Save Changes</ActionButton>
    <ActionButton @click="emits('cancel-event')">Cancel</ActionButton>
  </div>
</template>

<script setup lang="ts">
import FormTextarea from "src/components/form/FormTextarea.vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import RatingStars from "src/components/layout/review/RatingStars.vue";
import MainRatingStar from "src/components/layout/review/MainRatingStar.vue";
import { fillStars } from "src/utils/helpers";
import { ref } from "vue";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: [Number, null],
    required: true,
  },
});

const editingStarsArray = ref(fillStars((props.rating ?? 0) - 1));

const editRating = ref<number>(props.rating ?? 0);

const localValue = ref<string>(props.content);

const emits = defineEmits([
  "cancel-event",
  "mouse-enter-event",
  "mouse-leave-event",
  "click-event",
]);

const mouseEnterEvent = (rating: number) => {
  editingStarsArray.value = fillStars(rating);
};

const mouseLeaveEvent = () => {
  editingStarsArray.value = fillStars(editRating.value - 1);
};
const clickEvent = (rating: number) => {
  editingStarsArray.value = fillStars(rating);
  editRating.value = rating + 1;
};

// const mouseEnterEvent = (rating: number) => {
//   emits("mouse-enter-event", rating);
// };
// // const mouseLeaveEvent = (rating: number) => {
// //   emits("mouse-leave-event", rating);
// // };
// const clickEvent = (rating: number) => {
//   emits("click-event", rating);
// };
</script>
