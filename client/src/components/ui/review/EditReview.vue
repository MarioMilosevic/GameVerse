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
    <ActionButton
      @click="editReviewHandler"
      color="green"
      :disabled="localValue.length === 0 || disabledButton"
      >Save Changes</ActionButton
    >
    <ActionButton @click="emits('cancel-event')">Cancel</ActionButton>
  </div>
</template>

<script setup lang="ts">
import FormTextarea from "@/components/form/FormTextarea.vue";
import ActionButton from "@/components/ui/buttons/ActionButton.vue";
import RatingStars from "@/components/ui/review/RatingStars.vue";
import MainRatingStar from "@/components/ui/review/MainRatingStar.vue";
import { fillStars } from "@/utils/helpers";
import { ref, inject } from "vue";
import { editReview } from "@/api/reviews";
import { showToast } from "@/utils/toast";
import { ReviewType } from "@/utils/types";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: [Number, null],
    required: true,
  },
  reviewId: {
    type: Number,
    required: false,
  },
});

const { rating, content, reviewId } = props;

const editingStarsArray = ref(fillStars((rating ?? 0) - 1));
const editRating = ref<number>(rating ?? 0);
const localValue = ref<string>(content);
const disabledButton = ref<boolean>(false);

const editHandler =
  inject<
    (reviewId: number, updatedReview: ReviewType, avgRating: number) => void
  >("editReview");

const emits = defineEmits([
  "cancel-event",
  "mouse-enter-event",
  "mouse-leave-event",
  "click-event",
  "edit-event",
]);

const editReviewHandler = async () => {
  try {
    if (reviewId) {
      disabledButton.value = true;
      const updatedReview = {
        rating: editRating.value,
        content: localValue.value,
      };

      const { data, message } = await editReview(reviewId, updatedReview);
      if (data) {
        emits("edit-event");
        const { editedReview, avgRating } = data;
        if (editHandler) {
          editHandler(editedReview.id, editedReview, avgRating);
          showToast("Review updated");
        }
      } else {
        showToast(message, "error");
        disabledButton.value = false;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

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
</script>
