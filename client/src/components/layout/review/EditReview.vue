<template>
  <FormTextarea
    :model-value="props.modelValue"
    @update:model-value="updateContent"
  />
  <div class="w-full flex justify-between">
    <ActionButton color="green">Save Changes</ActionButton>
    <ActionButton @click="emits('cancel-event')">Cancel</ActionButton>
  </div>
</template>

<script setup lang="ts">
import FormTextarea from "src/components/form/FormTextarea.vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue", 'cancel-event']);

const updateContent = (value: string) => {
  emits("update:modelValue", value);
};
</script>
