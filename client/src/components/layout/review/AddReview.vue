<template>
  <RatingStars
    :stars-array="starsArray"
    @mouse-enter-event="mouseEnterEvent"
    @mouse-leave-event="mouseLeaveEvent"
    @click-event="clickEvent"
  />
  <FormTextarea
    v-model="content"
    placeholder="Your thoughts..."
    :max-characters="300"
  />
  <ActionButton type="submit" class="self-end" :disabled="!allFieldsCompleted">
    SEND REVIEW
  </ActionButton>
</template>

<script setup lang="ts">
import RatingStars from "src/components/layout/review/RatingStars.vue";
import FormTextarea from "src/components/form/FormTextarea.vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
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
  modelValue: {
    type: String,
    required: true,
  },
});

const content = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});

const emits = defineEmits([
  "mouse-leave-event",
  "mouse-enter-event",
  "click-event",
  "update:modelValue",
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
