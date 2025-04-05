<template>
  <EditReview
    v-if="isEditing"
    :content="review.content"
    :rating="review.rating"
    :reviewId="review.id"
    @mouse-enter-event="mouseEnterEvent"
    @mouse-leave-event="mouseLeaveEvent"
    @click-event="clickEvent"
    @cancel-event="isEditing = false"
    @edit-event="emits('edit-event')"
  />

  <PreviewReview
    v-else
    @edit-event="isEditing = true"
    @delete-event="isDeleteOpen = true"
    :rating="review.rating"
    :content="review.content"
    :created-at="review.createdAt"
  />

  <Teleport to="body" v-if="isDeleteOpen">
    <OverlayComponent>
      <ModalComponent
        size="small"
        class="bg-slate-200 dark:bg-slate-900 flex flex-col items-center pb-10 justify-end rounded-2xl"
      >
        <BaseIcon
          :style="{ width: '5rem', height: '5rem' }"
          class="absolute top-[1%] right-1/2 translate-x-1/2"
        >
          <XCircle />
        </BaseIcon>
        <div class="flex flex-col gap-4 items-center w-1/2">
          <h1 class="text-5xl">Are you sure ?</h1>
          <p class="text-lg">
            Do you really want to delete your review? This action cannot be
            undone
          </p>
          <div class="flex justify-between w-full">
            <ActionButton color="green" @click="isDeleteOpen = false"
              >Cancel</ActionButton
            >
            <ActionButton @click="deleteReviewHandler">Confirm</ActionButton>
          </div>
        </div>
      </ModalComponent>
    </OverlayComponent>
  </Teleport>
</template>

<script setup lang="ts">
import PreviewReview from "src/components/layout/review/PreviewReview.vue";
import EditReview from "src/components/layout/review/EditReview.vue";
import OverlayComponent from "src/components/layout/others/OverlayComponent.vue";
import ModalComponent from "src/components/layout/others/ModalComponent.vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import BaseIcon from "src/icons/BaseIcon.vue";
import XCircle from "src/icons/XCircle.vue";
import { deleteReview } from "src/api/reviews";
import { showToast } from "src/utils/toast";
import { ReviewType } from "src/utils/types";
import { PropType, ref, inject } from "vue";
import { fillStars } from "src/utils/helpers";

const isEditing = ref<boolean>(false);

const isDeleteOpen = ref<boolean>(false);

const props = defineProps({
  review: {
    type: Object as PropType<ReviewType>,
    required: true,
  },
});

const { review } = props;

const emits = defineEmits(["delete-event", "edit-event"]);

const deleteReviewUI =
  inject<(reviewId: number, avgRating: string) => void>("deleteReview");

const editingStarsArray = ref(fillStars((props.review.rating ?? 0) - 1));
const editRating = ref<number>(props.review.rating ?? 0);

const mouseEnterEvent = (rating: number) => {
  if (isEditing.value) {
    editingStarsArray.value = fillStars(rating);
  }
};

const mouseLeaveEvent = () => {
  if (isEditing.value) {
    editingStarsArray.value = fillStars(editRating.value - 1);
  }
};
const clickEvent = (rating: number) => {
  if (isEditing.value) {
    editingStarsArray.value = fillStars(rating);
    editRating.value = rating + 1;
  }
};

const deleteReviewHandler = async () => {
  try {
    const { data, message } = await deleteReview(review.id as number);
    if (data) {
      console.log("ovo me zanima", data);
      if (deleteReviewUI) {
        deleteReviewUI(review.id as number, data.avgRating);
      }
      showToast("Review deleted");
      emits("delete-event");
      isDeleteOpen.value = false;
    } else {
      showToast(message, "error");
    }
  } catch (error) {
    console.error(error);
    showToast("Unexpected error occured", "error");
  }

};
</script>
