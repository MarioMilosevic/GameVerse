<template>
  <FormTextarea v-model="localValue" />
  <div class="w-full flex justify-between">
    <ActionButton @click="saveChanges" color="green">Save Changes</ActionButton>
    <ActionButton @click="emits('cancel-event')">Cancel</ActionButton>
  </div>
</template>

<script setup lang="ts">
import FormTextarea from "src/components/form/FormTextarea.vue";
import ActionButton from "src/components/layout/buttons/ActionButton.vue";
import { ref } from "vue";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

const localValue = ref<string>(props.content);

const emits = defineEmits(["cancel-event"]);

const saveChanges = () => {
  console.log('radi')
  console.log(localValue.value)
}
</script>
