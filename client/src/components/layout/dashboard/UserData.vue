<template>
  <div>
    {{ user.fullName }}
  </div>
</template>

<script lang="ts" setup>
import { UserType } from "src/utils/types";
import { PropType } from "vue";

defineProps({
  user: {
    type: Object as PropType<UserType>,
    required: true,
  },
});
</script>
