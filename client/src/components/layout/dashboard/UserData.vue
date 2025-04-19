<template>
  <tr class="grid grid-cols-12 text-center items-center border-b pb-2">
    <td class="col-start-1 col-end-3 flex gap-4 h-[50px] items-center">
      <img
        :src="user.image"
        :alt="user.image"
        class="h-full"
      />
      <p>{{ user.fullName }}</p>
    </td>
    <td class="col-start-3 col-end-6">{{ user.email }}</td>
    <td class="col-start-6 col-end-8">{{ formattedDate(user.createdDate) }}</td>
    <td class="col-start-8 col-end-10">{{ user.role }}</td>
    <v-icon
      name="fc-checkmark"
      fill="green"
      class="col-start-10 col-end-11 justify-self-center"
      v-if="user.active"
    />
    <v-icon
      name="io-close-sharp"
      fill="red"
      class="col-start-10 col-end-11 justify-self-center"
      v-else
    />
    <v-icon
      name="fa-edit"
      fill="green"
      class="col-start-11 col-end-12 cursor-pointer justify-self-center"
      @click="emits('edit-event', user)"
    />
    <v-icon
      name="fa-regular-trash-alt"
      fill="red"
      class="col-start-12 col-end-13 cursor-pointer justify-self-center"
      @click="emits('delete-event', user)"
    />
  </tr>
</template>

<script lang="ts" setup>
import { UserType } from "src/utils/types";
import { PropType } from "vue";
import { formattedDate } from "src/utils/helpers";

defineProps({
  user: {
    type: Object as PropType<UserType>,
    required: true,
  },
});

const emits = defineEmits(["delete-event", "edit-event"]);
</script>
